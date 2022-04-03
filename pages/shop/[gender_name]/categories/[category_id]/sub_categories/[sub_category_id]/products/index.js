import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { InventoryAction } from "../../../../../../../../store";
import Image from "next/image";
import { Grid, Section } from "../../../../../../../../components";

export default function Products() {
  const router = useRouter()
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(InventoryAction.findBySubCategoryId(Number(router.query.sub_category_id)));
    }, [dispatch, router.query.sub_category_id]);
  
    const inventory = useSelector(s => s.inventory);
  return (
    <Section>
    <Grid
      direction="row wrap"
      justify="space-between"
      gap="1rem"
    >
    {
      inventory.list.length > 0 &&
      inventory.list[0].product_id &&
      inventory.list.map(product => {
        return (
        <Grid
          key={product.product_id}
          width="40%"
          direction="column wrap"
          onClick={() => {
            const { 
              gender_name,
              category_id,
              sub_category_id
             } = router.query;
            router.push(`/shop/${gender_name}/categories/${category_id}/sub_categories/${sub_category_id}/products/${product.product_id}`);
          }}
        >
          
          {product.images && product.images.length > 0 && (
            <Grid
              width="100%"
              direction="column wrap"
              align="center"
            >
              <Image 
                src={product.images[0].src}
                alt={product.images[0].alt}
                width={"140px"}
                height={"140px"}
              />
            </Grid>
          )}
          
          <h3>{product.name}</h3>
          
          <p>
            <span
              style={{
                color: 'red'
              }}
            >
              ${product.current_price.toFixed(2)}{' '}
            </span>
            <span 
              style={{
                textDecoration: 'line-through'
              }}
            >${product.valued_at.toFixed(2)}
            </span>
          </p>
          
          <p>{product.colors.length} {`Color${product.colors.length === 1 ? '' : 's'}`}</p>

        </Grid>
        )
      })
    }
    </Grid>
  </Section>
  )
}