import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section } from "../../../../components";
import { InventoryAction } from "../../../../store/actions";
import { InventoryList } from "../../../../widgets/Admin/InventoryList";

export default function AdminInventoryList(){
  
  const router = useRouter();
  const dispatch = useDispatch();
  const inventory = useSelector(s => s.inventory);

  useEffect(() => {
    dispatch(InventoryAction.findAll());
  }, [dispatch]);
  
  return (
  <Section>
    {inventory.list.length > 0 && <InventoryList inventory={inventory.list}/>}
  </Section>
  )
}