import { useState } from "react"
import { Container, Grid, Section } from "../../../components";
import { Inventory } from "../../../data";
// import Image from "next/image";
export default function Mens() {
  const [mensInventory, setMensInventory] = useState(() => {
    const inventory = Inventory.findAll();

    const uniqueProductIdsSet = new Set();
    
    const filteredByMens = inventory.filter(inventory_item => {
      if(!uniqueProductIdsSet.has(inventory_item.product.product_id)){
        uniqueProductIdsSet.add(inventory_item.product.product_id)
      }
      return inventory_item.product.gender.name === 'mens';
    })

    let result = [];
    
    uniqueProductIdsSet.forEach(uniqueProductId => {
      const uniqueProductList = filteredByMens.filter(mensInventoryItem => mensInventoryItem.product.product_id === uniqueProductId);
      
      let product = {};

      uniqueProductList.forEach(row => {
        if(!product.product_id){
          product = {
            ...row.product,
            versions: []
          }
        }

        product.versions.push(row)
      });
      
      result.push(product);
    });
    
    return result;
  });
  
  return (
  <Section>
    <Container>
      <Grid
        direction="row wrap"
        align="center"
        justify="space-between"
        gap="1rem"
      >
        {/* {mensInventory.map(mensInventoryItem => {
          
          return (
          <Grid
            key={mensInventoryItem.inventory_id}
            width="47%"
            direction="column wrap"
            align="center"
            justify="space-between"
            border="1px solid green"
            padding="1rem"
          >
            <Image
              width={"200px"}
              height={"200px"}
              src={mensInventoryItem.images[0].src}
              alt={mensInventoryItem.images[0].alt}
            />
          
            <Grid
              width="100%"
              direction="row wrap"
              justify="space-between"
            >
              <h3>{mensInventoryItem.product.name}</h3>
              <p>{mensInventoryItem.product.category.name}</p>
              <p>{mensInventoryItem.product.sub_category.name}</p>
            </Grid>
            
            <Grid
              width="100%"
              direction="column wrap"
            >
              <p>{mensInventoryItem.price}</p>
            </Grid>
          
          </Grid>
          )
        })} */}
      </Grid>
    </Container>
  </Section>
  )
}