import {axiosInstance as axios} from "../../../../../../utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Grid } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { ProductAction } from "../../../../../../store";

const initialOptions = {
  genders: [
    {
      gender_id: 0,
      name: '--select--'
    }
  ],
  categories: [
    {
      category_id: 0,
      name: '--select--'
    }
  ],
  sub_categories: [
    {
      sub_category_id: 0,
      name: '--select--'
    }
  ]
}

const initialSelected = {
  gender: {
    gender_id: 0,
    name: ''
  },
  category: {
    category_id: 0,
    name: ''
  },
  sub_category: {
    sub_category_id: 0,
    name: ''
  },
}

export default function EditProductGroupingsForm () {
  const [options, setOptions] = useState(initialOptions);
  const [selected, setSelected] = useState(initialSelected);
  
  const product = useSelector(s => s.product);
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(!router.query.product_id) return;

    const [productToUse] = product.list.filter(p => p.product_id === Number(router.query.product_id));
    
    setSelected({
      ...selected,
      gender: {
        ...selected.gender,
        gender_id: productToUse.gender.gender_id,
        name: productToUse.gender.name
      },
      category: {
        ...selected.category,
        category_id: productToUse.category.category_id,
        name: productToUse.category.name
      },
      sub_category: {
        ...selected.sub_category,
        sub_category_id: productToUse.sub_category.sub_category_id,
        name: productToUse.sub_category.name
      }
    });
    

  }, [router.query.product_id]);

  useEffect(() => {
    if(!router.query.product_id) return;
    const fetchOptions = async () => {
      

      let res = await axios().get('/genders');

      setOptions(o => {
        return {
          ...o,
          genders: [
            {
              gender_id: 0,
              name: '--select--'
            },
            ...res.data
          ]
        }
      });

      res = await axios().get('/categories');
      
      setOptions(o => {
        return {
          ...o,
          categories: [
            {
              category_id: 0,
              name: '--select--'
            },
            ...res.data.filter(category => category.gender.gender_id === selected.gender.gender_id)
          ]

        }
      });
      
      res = await axios().get('/sub_categories');
      
      setOptions(o => {
        return {
          ...o,
          sub_categories: [
            {
              sub_category_id: 0,
              name: '--select--'
            },
            ...res.data.filter(sub_category => sub_category.category.category_id === selected.category.category_id && sub_category.gender.gender_id === selected.gender.gender_id)
          ]
        }
      });
      
      
    }
    
    fetchOptions();

  }, [router.query.product_id, selected]);

  const handleChange = e => {
    const {name, value} = e.target;
    if(name === 'gender'){
      
      setSelected({
        ...selected,
        gender: {
          ...selected.gender,
          gender_id: value === '--select--' ? 0 : options.genders.filter(gender => gender.name === value)[0].gender_id,
          name: value
        },
        category: {
          ...selected.category,
          category_id: 0,
          name: '--select--'
        }
      });
      
    } else if(name === 'category'){
      setSelected({
        ...selected,
        category: {
          ...selected.category,
          category_id: value === '--select--' ? 0 : options.categories.filter(category => category.name === value)[0].category_id,
          name: value
        }
      });

    } else if(name === 'sub_category'){
      setSelected({
        ...selected,
        sub_category: {
          ...selected.sub_category,
          sub_category_id: value === '--select--' ? 0 : options.sub_categories.filter(sub_category => sub_category.name === value)[0].sub_category_id,
          name: value
        }
      });

    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const [oldProduct] = product.list.filter(p => p.product_id === Number(router.query.product_id));

    dispatch(ProductAction.updateByProductId(
      Number(router.query.product_id),
      {
        gender: {
          name: selected.gender.name
        },
        category: {
          name: selected.category.name
        },
        sub_category: {
          name: selected.sub_category.name
        }
      },
      oldProduct
    ));
  }

  return (
  <form
    onSubmit={handleSubmit}
  >

    <Grid
      direction="column wrap"
    >
      <label>Gender:
        <select
          name="gender"
          value={selected.gender.name}
          onChange={handleChange}
        >
          {options.genders.map(gender => {
            return (
            <option
              key={gender.gender_id}
              value={gender.name}
            >{gender.name}
            </option>
            )
          })}
        </select>
      </label>
      
      <label>Category:
        <select
          name="category"
          value={selected.category.name}
          onChange={handleChange}
        >
          {options.categories.map(category => {
            return (
            <option
              key={category.category_id}
              value={category.name}
            >{category.name}
            </option>
            )
          })}
        </select>
      </label>
      
      <label>Sub-category:
        <select
          name="sub_category"
          value={selected.sub_category.name}
          onChange={handleChange}
        >
          {options.sub_categories.map(sub_category => {
            return (
            <option
              key={sub_category.sub_category_id}
              value={sub_category.name}
            >{sub_category.name}
            </option>
            )
          })}
        </select>
      </label>
    </Grid>

    <Grid>
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push('/admin/dashboard/products');
        }}
        >Cancel</button>
      <button
        type="submit"
      >Done</button>
    </Grid>
  </form>
  )
}