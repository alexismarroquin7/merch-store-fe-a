import { useRouter } from "next/router"

export default function Category() {
  const router = useRouter()
  return (
    <div>
      {router.asPath}
    </div>
  )
}