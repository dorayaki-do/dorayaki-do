import React from "react"
import dynamic from "next/dynamic"

const Reader = dynamic(() => import("../../components/Reader"), { ssr: false })

function App() {
  return <Reader />
}

export default App
