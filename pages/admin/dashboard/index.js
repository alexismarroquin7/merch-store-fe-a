import { useRouter } from "next/router"
import { Grid } from "../../../components";

export default function AdminDashboard() {
  const router = useRouter();
  return (
  <Grid>
    <button
      onClick={() => {
        router.push('/admin/dashboard/products');
      }}
      >Products</button>
    <button
      onClick={() => {
        router.push('/admin/dashboard/inventory');
      }}
    >Inventory</button>
  </Grid>
  )
}