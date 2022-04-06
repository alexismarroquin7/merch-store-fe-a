import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../components";
import { ProductAction } from "../../../../store";
import { AdminProductList } from "../../../../widgets";
import Link from "next/link";

export default function AdminProducts () {
  
  const dispatch = useDispatch();
  const product = useSelector(s => s.product);

  useEffect(() => {
    dispatch(ProductAction.findAll());
  }, [dispatch]);

  return (
  <Section>
    <Grid
      width="90%"
      padding="1rem 0"
      gap=".2rem"
    >
      <Link
        href="/admin/dashboard"
        passHref
      >
        <a>/ dashboard</a>
      </Link>

      <Link
        href="/admin/dashboard/products"
        passHref
      >
        <a>/ products</a>
      </Link>
      
    </Grid>

    {product.list.length > 0 && (
      <AdminProductList 
        products={product.list}
      />
    )}

  </Section>
  )
}