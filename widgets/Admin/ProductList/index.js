import { AdminProductItem } from "../ProductItem";
import { Grid } from "../../../components";

export const AdminProductList = ({ products }) => {
  return (
    <Grid
      width="100%"
      direction="column wrap"
      align="center"
      gap="1rem"
    >
      {products.map(product => {
        return <AdminProductItem
          key={product.product_id}
          product={product}
        />
      })}
    </Grid>
  )
}