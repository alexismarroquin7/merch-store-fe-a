import { useState } from "react"
import { Container, Grid, Section } from "../../../components";
import { Inventory } from "../../../data";
import Image from "next/image";
export default function Mens() {
  const [mensInventory, setMensInventory] = useState(Inventory.findAll());
  
  return (
  <Section>
    <Container>
      <Grid
        direction="column wrap"
        align="center"
        gap="2rem"
      >
        {mensInventory.map(mensInventoryItem => {
          
          return (
          <Grid
            key={mensInventoryItem.inventory_id}
            width="100%"
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
              <p>{mensInventoryItem.product.name}</p>
              <p>{mensInventoryItem.price}</p>
            </Grid>
            
            <Grid
              width="100%"
              direction="column wrap"
            >
              <p>{mensInventoryItem.product.category.name}</p>
              <p>{mensInventoryItem.product.sub_category.name}</p>
            </Grid>
          
          </Grid>
          )
        })}
      </Grid>
    </Container>
  </Section>
  )
}