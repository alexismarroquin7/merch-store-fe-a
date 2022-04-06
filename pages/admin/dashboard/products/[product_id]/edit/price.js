import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../../../components";
import { ProductAction } from "../../../../../../store";
import Spinner from "react-svg-spinner";

const initialValues = {
  valued_at: '',
  current_price: ''
}

export default function EditProductPriceForm () {
  const router = useRouter();
  
  const [values, setValues] = useState(initialValues);
  const product = useSelector(s => s.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!router.query.product_id) return;
    
    dispatch(ProductAction.findByProductId(router.query.product_id));
    
    const selectedProduct = product.item;

    setValues(v => {
      return {
        ...v,
        current_price: String(selectedProduct.current_price),
        valued_at: String(selectedProduct.valued_at)
      }
    });
    
  }, [dispatch, router.query.product_id])

  const handleChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    const oldProduct = product.item;

    dispatch(
      ProductAction.updateByProductId(
        Number(router.query.product_id),
        {
          valued_at: Number(values.valued_at),
          current_price: Number(values.current_price)
        },
        oldProduct
      )
    )
  }

  return (
  <Section>
    <form
      style={{width: "100%"}}
      onSubmit={handleSubmit}
    >

      <Grid
        border=".2rem solid black"
        borderRadius="5px"
        padding="1rem"
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        <Grid
          width="100%"
          justify="space-between"
        >
          <label>Valued At:</label>
          <input
            type="number"
            name="valued_at"
            value={values.valued_at}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid
          width="100%"
          justify="space-between"
        >
          <label>Current Price:</label>
          <input
            type="number"
            name="current_price"
            value={values.current_price}
            onChange={handleChange}
          />
        </Grid>  
        
        <Grid
          gap="1rem"
        >
          <button
            onClick={() => {
              router.push(`/admin/dashboard/products/${product.item.product_id}`);
            }}
          >Back</button>
          
          <button type="submit">Done</button>

          {product.status.loading && <Spinner/>}
        </Grid>
      
      </Grid>

    </form>
  </Section>
  )
}