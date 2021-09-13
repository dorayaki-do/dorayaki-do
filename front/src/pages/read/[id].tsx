import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

const Reader = dynamic(() => import("../../components/Reader"), { ssr: false })

const App = () => {
  const router = useRouter()
  const { id } = router.query

  return <Reader id={id} />
}

export default App
