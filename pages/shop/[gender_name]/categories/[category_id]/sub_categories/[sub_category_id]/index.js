import { useRouter } from "next/router"

export default function SubCategory() {
  const router = useRouter()
  return (
    <div>
      {router.asPath}
    </div>
  )
}