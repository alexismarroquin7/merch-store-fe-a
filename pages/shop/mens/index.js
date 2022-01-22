import { useState } from "react"
import { Card, Grid, Section } from "../../../components";
import { Inventory } from "../../../data";
import Image from "next/image";
export default function Mens() {
  const [mensInventory, setMensInventory] = useState(Inventory.findAll());
  
  return (
  <Section>
    <Card>
      {mensInventory.map(mensInventoryItem => {
        return (
        <Grid
          key={mensInventoryItem.inventory_id}
          direction="column wrap"
          gap="2rem"
          style={{border: "1px solid red"}}
        >
          <Image
            width={"200px"}
            height={"200px"}
            src={mensInventoryItem.images[0].src}
            alt={mensInventoryItem.images[0].alt}
          />
          <p>{mensInventoryItem.product.name}</p>
          <p>{mensInventoryItem.price}</p>
        </Grid>
        )
      })}
    </Card>
  </Section>
  )
}