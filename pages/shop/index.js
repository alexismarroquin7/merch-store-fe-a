import { useDispatch } from "react-redux"
import { InventoryAction } from "../../store";

export default function Shop() {
  const dispatch = useDispatch();

  return (
  <div>
    /shop
    <button
      onClick={() => {
        dispatch(InventoryAction.findAll())
      }}
    ></button>
  </div>
  )
}