import { useRouter } from "next/router"

export default function Gender() {
  const router = useRouter()
  return (
    <div>
      {router.asPath}
    </div>
  )
}