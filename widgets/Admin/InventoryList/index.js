import { Grid } from "../../../components";
import { InventoryItem } from "../InventoryItem";

export const InventoryList = ({ inventory }) => {

  
  return (
  <Grid
    width="100%"
  >
    <Grid
      direction="column wrap"
      align="center"
      width="100%"
      gap="1rem"
    >

      {inventory.map(inventoryItem => {
        return <InventoryItem
          key={inventoryItem.inventory_id}
          inventoryItem={inventoryItem}
        />
      })}
    </Grid>
  </Grid>
  )
}