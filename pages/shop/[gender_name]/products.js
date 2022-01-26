import { useRouter } from "next/router"

export default function MensProducts(){
  const router = useRouter();
  return (
  <div>
    {router.asPath}
  </div>
  )
}