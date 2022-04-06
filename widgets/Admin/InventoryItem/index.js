import { Grid } from "../../../components"
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const initialCollapsed = {
  product: true
}

export const InventoryItem = ({ inventoryItem }) => {
  const { product, size, category, sub_category, color, gender, inventory_images } = inventoryItem;
  
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const router = useRouter();
  
  return (
  <Grid
    width="90%"
    direction="column wrap"
    border="1px solid black"
    padding="1rem"
  > 
    <Grid
      gap="1rem"
    >
      <p>ID:</p>
      <p>{inventoryItem.inventory_id}</p>
    </Grid> 


    <Grid
      width="100%"
      direction="column wrap"
    >

      <Grid
        width="100%"
        justify="space-between"
        align="center"
      >
        
        <Grid
          gap="1rem"
        >
          <p>{product.name}</p>
        </Grid>
        
        <Grid
          gap="1rem"
        >
          <button
            onClick={() => {
              router.push(`/admin/dashboard/products/${product.product_id}`)
            }}
          >Edit</button>
          
          <button
            onClick={() => {
              setCollapsed({
                ...collapsed,
                product: !collapsed.product
              })
            }}
          >{collapsed.product ? '+' : '-'}</button>
        </Grid>

      </Grid>
      
      {!collapsed.product && (
      <Grid
        width="100%"
        direction="column wrap"
        padding="1rem"
      >
        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>Id:</p>
          <p>{product.product_id}</p>
        </Grid>

        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>Name:</p>
          <p>{product.name}</p>
        </Grid>
        

        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>Gender:</p>
          <p>{gender.name}</p>
        </Grid>
        
        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>category:</p>
          <p>{category.name}</p>
        </Grid>
        
        
        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>Sub-category:</p>
          <p>{sub_category.name}</p>
        </Grid>
        
        
        
        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>Valued At:</p>
          <p>${product.valued_at}</p>
        </Grid>
        
        <Grid
          width="100%"
          direction="row wrap"
          justify="space-between"
          gap="1rem"
        >
          <p>Current Price:</p>
          <p>${product.current_price}</p>
        </Grid>
      
      </Grid>
      )}
    
      
    
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
              router.push(`/admin/dashboard/inventory/${inventoryItem.inventory_id}/images?product_id=${product.product_id}&tab=remove`);
            }}
          >{'>'}</button>
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


    <Grid
      width="100%"
      justify="space-between"
    >
      <p>Size:</p>
      <p>{size.name}</p>
    </Grid>
    
    <Grid
      width="100%"
      justify="space-between"
    >
      <p>Color:</p>
      <p>{color.name}</p>
    </Grid>

    <Grid
      width="100%"
      justify="space-between"
    >
      <p>Amount in stock:</p>
      <p>{inventoryItem.amount_in_stock}</p>
    </Grid>
    
    <Grid
      width="100%"
      justify="space-between"
    >
      <p>Modified At:</p>
      <p>{`${new Date(inventoryItem.modified_at).getMonth() + 1 < 10 ? '0' : ''}${new Date(inventoryItem.modified_at).getMonth() + 1}-${new Date(inventoryItem.modified_at).getDate() < 10 ? '0' : ''}${new Date(inventoryItem.modified_at).getDate()}-${new Date(inventoryItem.modified_at).getFullYear()}`}</p>
    </Grid>
    
    <Grid
      width="100%"
      justify="space-between"
    >
      <p>Created At:</p>
      <p>{`${new Date(inventoryItem.created_at).getMonth() + 1 < 10 ? '0' : ''}${new Date(inventoryItem.created_at).getMonth() + 1}-${new Date(inventoryItem.created_at).getDate() < 10 ? '0' : ''}${new Date(inventoryItem.created_at).getDate()}-${new Date(inventoryItem.created_at).getFullYear()}`}</p>
    </Grid>
  
  </Grid>
  )
}