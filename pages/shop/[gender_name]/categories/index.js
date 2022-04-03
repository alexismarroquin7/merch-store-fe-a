import { useRouter } from "next/router"

export default function Categories() {
  const router = useRouter()
  return (
    <div>
      {router.asPath}
    </div>
  )
}