import { useState } from "react"
import { Section } from "../../../components";
import { Inventory } from "../../../data";

export default function Mens() {
  const [mensInventory, setMensInventory] = useState(Inventory.findAll());
  
  return (
  <Section>
    {mensInventory.map(mensInventoryItem => {
      return (
      <div
        key={mensInventoryItem.inventory_id}
      >
        {mensInventoryItem.product.name}
        {mensInventoryItem.price}
      </div>
      )
    })}
  </Section>
  )
}