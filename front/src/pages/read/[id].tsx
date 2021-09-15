import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { getAsStringFromArray } from "../../utils/getAsStringFromArray"

const Reader = dynamic(() => import("../../components/book/Reader"), {
  ssr: false,
})

const App = () => {
  const router = useRouter()
  const id = getAsStringFromArray(router.query.id)

  return <Reader id={id} />
}

export default App
