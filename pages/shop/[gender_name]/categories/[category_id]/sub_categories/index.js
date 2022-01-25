import { useRouter } from "next/router"

export default function SubCategories() {
  const router = useRouter()
  return (
    <div>
      {router.asPath}
    </div>
  )
}