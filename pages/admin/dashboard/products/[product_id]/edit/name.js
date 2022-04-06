import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../../../components";
import { ProductAction } from "../../../../../../store";
import Spinner from "react-svg-spinner";

const initialName = {
  old: '',
  new: '',
}

export default function EditProductNameForm() {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const product = useSelector(s => s.product);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!router.query.product_id) return;
    
    dispatch(ProductAction.findByProductId(router.query.product_id))
    
    const nameToUse = product.item.name;

    setName(s => {
      return {
        ...s,
        old: nameToUse,
        new: nameToUse
      }
    });
  
  }, [dispatch, product.item.name, router.query.product_id ]);

  const handleChange = e => {
    const {value} = e.target;
    setName({
      ...name,
      new: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    const oldProduct = product.item;

    dispatch(ProductAction.updateByProductId(
      Number(router.query.product_id), 
      {
        name: name.new.trim()
      },
      oldProduct
    ));

  }

  return (
  <Section>
    <Grid
      direction="column wrap"
      border=".2rem solid black"
      borderRadius="5px"
      padding="1rem"
      width="100%"
    >
      <form
        style={{width: "100%"}}
        onSubmit={handleSubmit}
      >

        <Grid
          direction="column wrap"
          gap="1rem"
        >
          <p>Current Name:</p>
          
          <Grid
            width="100%"
            justify="space-between"
            align="center"
          >
            <h3>{name.old}</h3>
          </Grid>
          
          <p>New Name:</p>
          
          <Grid
            width="100%"
            justify="space-between"
            align="center"
          >
            <input
              value={name.new}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            gap="1rem"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setName(initialName);
                router.push(`/admin/dashboard/products/${product.item.product_id}`);
              }}
            >Back</button>
            
            <button
              type="submit"
            >Submit</button>
            
            {product.status.loading && <Spinner />}
          
          </Grid>

          {product.status.error.message && (
            <p
              style={{color: "red"}}
            >{product.status.error.message}</p>
          )}

        </Grid>

      </form>
    
    </Grid>
  
  </Section>
  )
}