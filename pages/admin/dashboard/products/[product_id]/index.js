import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductAction } from "../../../../../store";
import { AdminProductItem } from "../../../../../widgets";
import { Grid, Section } from "../../../../../components";
import Link from "next/link";


export default function AdminProduct(){
  const router = useRouter();
  const dispatch = useDispatch();
  const product = useSelector(s => s.product);

  useEffect(() => {
    if(!router.query.product_id) return;
    dispatch(ProductAction.findByProductId(router.query.product_id));
  }, [dispatch, router.query.product_id]);
  
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
      
      <Link
        href={`/admin/dashboard/products/${router.query.product_id}`}
        passHref
      >
        <a>/ {router.query.product_id}</a>
      </Link>
      
    </Grid>

    {product.item.product_id && (
      <AdminProductItem
        product={product.item}
      />
    )}
  </Section>
  )
}