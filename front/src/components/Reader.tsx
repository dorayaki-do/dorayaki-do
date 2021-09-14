import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/layout"
import { ReactReader } from "react-reader"
import axios from "axios"
import { API_ENDPOINT } from "../utils/apiEndPoint"
import { BuyFooter } from "./BuyFooter"

type ReaderProps = {
  id: string
}

const Reader: React.FC<ReaderProps> = ({ id }) => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const [epubUrl, setEpubUrl] = useState("")
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/books/${id}/epub`)
      .then((res) => {
        setEpubUrl(res.data.epub_url)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Box h="87vh" position="relative">
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={epubUrl}
        />
      </Box>
      <BuyFooter id={id} />
    </>
  )
}

export default Reader
