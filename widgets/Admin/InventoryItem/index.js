import { Grid } from "../../../components"
import Image from "next/image";
import { useRouter } from "next/router";

export const InventoryItem = ({ inventoryItem }) => {
  const { product, size, category, sub_category, color, gender, inventory_images } = inventoryItem;
  
  const router = useRouter();
  
  return (
  <Grid
    width="90%"
    direction="column wrap"
    border="1px solid black"
    padding="1rem"
  >  
    <p>Inventory:</p>

    <Grid
      width="100%"
      direction="column wrap"
      padding="1rem"
    >
      <Grid
        width="100%"
        justify="space-between"
        align="center"
      >
        <p>Product:</p>
        <button
          onClick={() => {
            router.push(`/admin/dashboard/products/${product.product_id}`)
          }}
        >Edit</button>
      </Grid>
      
      <Grid
        direction="column wrap"
        padding="1rem"
      >
        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>Id:</p>
          <p>{product.product_id}</p>
        </Grid>

        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>Name:</p>
          <p>{product.name}</p>
        </Grid>
        

        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>Gender:</p>
          <p>{gender.name}</p>
        </Grid>
        
        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>category:</p>
          <p>{category.name}</p>
        </Grid>
        
        
        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>Sub-category:</p>
          <p>{sub_category.name}</p>
        </Grid>
        
        
        
        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>Valued At:</p>
          <p>${product.valued_at}</p>
        </Grid>
        
        <Grid
          direction="row wrap"
          gap="1rem"
        >
          <p>Current Price:</p>
          <p>${product.current_price}</p>
        </Grid>
      
      </Grid>
    
      <p>Size: {size.name}</p>
      
      <p>Color: {color.name}</p>

      <p>Amount in stock: {inventoryItem.amount_in_stock}</p>
      
      <p>Modified At: {`${new Date(inventoryItem.modified_at).getMonth() + 1 < 10 ? '0' : ''}${new Date(inventoryItem.modified_at).getMonth() + 1}-${new Date(inventoryItem.modified_at).getDate() < 10 ? '0' : ''}${new Date(inventoryItem.modified_at).getDate()}-${new Date(inventoryItem.modified_at).getFullYear()}`}</p>
      <p>Created At: {`${new Date(inventoryItem.created_at).getMonth() + 1 < 10 ? '0' : ''}${new Date(inventoryItem.created_at).getMonth() + 1}-${new Date(inventoryItem.created_at).getDate() < 10 ? '0' : ''}${new Date(inventoryItem.created_at).getDate()}-${new Date(inventoryItem.created_at).getFullYear()}`}</p>
    
      <Grid
        width="100%"
        direction="column wrap"  
      >
        <Grid
          width="100%"
          justify="space-between"
          align="center"
        >
          <p>Images:</p>
          <button
            onClick={() => {
              router.push(`/admin/dashboard/inventory/${inventoryItem.inventory_id}/images`);
            }}
          >{'+'}</button>
        </Grid>

        <Grid
          padding="1rem"
          gap="1rem"
        >

          {inventory_images.map(invImage => {
            return (
            <Grid
              key={invImage.inventory_image_id}
            >
              <Image 
                width="100px"
                height="100px"
                src={invImage.image.src}
                alt={invImage.image.alt}
              />
            </Grid>
            )
          })}
        </Grid>
  
      </Grid>

    </Grid>
    
    
  
  </Grid>
  )
}