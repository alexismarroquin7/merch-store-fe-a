import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../../../../../../components";
import { InventoryAction } from "../../../../../../../../../store";
import Image from "next/image";

const initialSelected = {
  color: {
    index: 0,
    name: '',
    color_id: 0
  },
  size: {
    index: 0,
    name: '',
    size_id: 0
  }
}

export default function Product() {
  
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { product } = useSelector(s => {
    return s.inventory;
  });
  
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    dispatch(InventoryAction.findByProductId(router.query.product_id));
  }, [dispatch, router.query.product_id]);

  useEffect(() => {
    if(!product.product_id) return;

    if(!router.query.inventory_id){
      setSelected(s => {
        return {
          ...s,
          color: {
            ...s.color,
            index: 0,
            name: product.colors[0].name,
            color_id: product.colors[0].color_id
          },
          size: {
            ...s.size,
            index: 0,
            name: product.colors[0].sizes[0].name,
            size_id: product.colors[0].sizes[0].size_id
          }
        } 
      });
      
      
    } else {
      let match = false;
      
      product.colors.forEach((color, i) => {
        color.sizes.forEach((size, j) => {
          if(size.inventory_id === Number(router.query.inventory_id)){
            match = true;
            setSelected(s => {
              return {
                ...s,
                color: {
                  ...s.color,
                  index: i,
                  name: product.colors[i].name,
                  color_id: product.colors[i].color_id
                },
                size: {
                  ...s.size,
                  index: j,
                  name: product.colors[i].sizes[j].name,
                  size_id: product.colors[i].sizes[j].size_id

                }
              } 
            });
          }
        });
      });

      if(!match){
        setSelected(s => {
          return {
            ...s,
            color: {
              ...s.color,
              index: 0,
              name: product.colors[0].name,
              color_id: product.colors[0].color_id
            },
            size: {
              ...s.size,
              index: 0,
              name: product.colors[0].sizes[0].name,
              size_id: product.colors[0].sizes[0].size_id
            }
          } 
        });

      }
    
    }

  }, [product.product_id, router.query.inventory_id])

  useEffect(() => {
    if(!product.product_id) return;

    const BASE_URL = `/shop/${router.query.gender_name}/categories/${router.query.category_id}/sub_categories/${router.query.sub_category_id}/products/${router.query.product_id}`;
    const inventory_id = product.colors[selected.color.index].sizes[selected.size.index].inventory_id;
    router.push(`${BASE_URL}?inventory_id=${inventory_id}`);

  }, [selected])
  
  
  const handleChange = e => {
    const { name, value } = e.target;
    
    const valueToUse = JSON.parse(value);
    
    if(name === 'color'){
      // check if product in different color has the same size available
      let match = false;
      let sizeToUse = {};

      product.colors.forEach(color => {
        color.sizes.forEach((size, j) => {
          if(size.size_id === selected.size.size_id){
            match = true;
            sizeToUse = {
              index: j,
              size_id: size.size_id,
              name: size.name
            }
          }
        })
      })

      
      setSelected({
        ...selected,      
        [name]: {
          ...selected[name],
          name: product.colors[valueToUse.index].name,
          index: Number(valueToUse.index),
          color_id: Number(valueToUse.color_id)
        },
        size: {
          ...selected.size,
          index: match ? sizeToUse.index : 0,
          name: match ? sizeToUse.name : product.colors[valueToUse.index].sizes[0].name,
          size_id: match ? sizeToUse.size_id : product.colors[valueToUse.index].sizes[0].size_id
        }
      })

      

    } else {

      setSelected({
        ...selected,      
        [name]: {
          ...selected[name],
          name: product.colors[selected.color.index].sizes[valueToUse.index].name,
          index: Number(valueToUse.index),
          [`${name}_id`]: Number(valueToUse[`${name}_id`])
        }
      })

    }
  }

  return (
  <Section
    
  >
    {product.product_id ? (
      <Grid
        direction="column wrap"
        alignItems="center"
        width="90%"
      
        gap="1rem"
      >
        <Grid
          direction="column wrap"
        >
          <h3>{product.name}</h3>
          <p>Category: {product.category.name}</p>
          <p>Sub-category: {product.sub_category.name}</p>
        </Grid>
        

        <Grid
          gap="1rem"
        >
          {product.colors[selected.color.index].sizes[selected.size.index].inventory_images.map(inv_img => {
            return (
              <Grid
                key={inv_img.inventory_image_id}
                border="1px solid black"
              >
                <Image
                  width="100px"
                  height="100px"
                  alt={inv_img.image.alt}
                  src={inv_img.image.src}
                />
              </Grid>
            )
          })}
        </Grid>

        

        <Grid
          gap="1rem"
        >
          <p>${product.current_price}</p>
          <p style={{textDecoration: 'line-through'}}>${product.valued_at}</p>
        </Grid>

        <Grid
          gap="1rem"
        >
          <Grid
            direction="column wrap"
          >
            <h3>Color</h3>
            {product.colors.map((color, i) => {
              return (
              <label
                key={color.color_id}
              >
                <input
                  type="radio"
                  name="color"
                  checked={selected.color.index === i}
                  value={JSON.stringify({name: color.name, index: i, color_id: color.color_id})}
                  onChange={handleChange}
                />
                {color.name}
              </label>
            
              )
            })}
          </Grid>

          <Grid
            direction="column wrap"
          >
            <h3>Size</h3>
            {product.colors[selected.color.index].sizes.map((size, i) => {
              return (
              <label
                key={size.size_id}
              >
                <input
                  name="size"
                  type="radio"
                  onChange={handleChange}
                  checked={selected.size.index === i}
                  value={JSON.stringify({ name: size.name, index: i, size_id: size.size_id})}
                />
                {size.name}
              </label>
              )
            })}
          </Grid>
        </Grid>
        
        
        {product.colors[selected.color.index].sizes[selected.size.index].amount_in_stock <= 10 && <p>only {product.colors[selected.color.index].sizes[selected.size.index].amount_in_stock} left</p>}

        <button>Add to Bag</button>
        
        
      </Grid>
    ) : (
      ''
    )}
  </Section>
  )
}