import { useState } from "react"
import { Card, Section } from "../../../components";
import { Inventory } from "../../../data";

export default function Mens() {
  const [mensInventory, setMensInventory] = useState(Inventory.findAll());
  
  return (
  <Section>
    <Card>
      {mensInventory.map(mensInventoryItem => {
        return (
        <div
          key={mensInventoryItem.inventory_id}
        >
          <img
            width={"200px"}
            src={mensInventoryItem.images[0].src}
          />
          {mensInventoryItem.product.name}
          {mensInventoryItem.price}
        </div>
        )
      })}
    </Card>
  </Section>
  )
}