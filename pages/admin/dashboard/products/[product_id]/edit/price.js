import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../../../../../../components";
import { ProductAction } from "../../../../../../store";

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
    const selectedProduct = product.list.filter(p => p.product_id === Number(router.query.product_id))[0];

    setValues(v => {
      return {
        ...v,
        current_price: String(selectedProduct.current_price),
        valued_at: String(selectedProduct.valued_at)
      }
    });
    
  }, [router.query.product_id])

  useEffect(() => console.log(values), [values])

  const handleChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    const [oldProduct] = product.list.filter(p => p.product_id === Number(router.query.product_id));

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
  <form
    onSubmit={handleSubmit}
  >
    <Grid
      direction="column wrap"
    >
      <label>Valued At:
        <input
          type="number"
          name="valued_at"
          value={values.valued_at}
          onChange={handleChange}
          />
      </label>
      
      <label>Current Price:
        <input
          type="number"
          name="current_price"
          value={values.current_price}
          onChange={handleChange}
        />
      </label>
    </Grid>

    <Grid>
      <button
        onClick={() => {
          router.push('/admin/dashboard/products');
        }}
      >
        Cancel
      </button>
      <button>
        Done
      </button>
    </Grid>
  </form>
  )
}