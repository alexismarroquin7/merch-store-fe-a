import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../../../../../../components";
import { ProductAction } from "../../../../../../store";

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
    const nameToUse = product.list.filter(p => p.product_id === Number(router.query.product_id))[0].name;

    setName(s => {
      return {
        ...s,
        old: nameToUse,
        new: nameToUse
      }
    });
  }, [router.query.product_id, product.list]);

  const handleChange = e => {
    const {value} = e.target;
    setName({
      ...name,
      new: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    const [ oldProduct ] = product.list.filter(p => p.product_id === Number(router.query.product_id));
    dispatch(ProductAction.updateByProductId(
      Number(router.query.product_id), 
      {
        name: name.new
      },
      oldProduct
    ));
  }

  return (
  <form
    onSubmit={handleSubmit}
  >
    <p>Current Name:</p>
    <h3>{name.old}</h3>
    
    <p>New Name:</p>
    <input
      value={name.new}
      onChange={handleChange}
    />
    
    <Grid>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setName(initialName);
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