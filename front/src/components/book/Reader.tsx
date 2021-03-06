import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/layout"
import { ReactReader } from "react-reader"
import axios from "axios"

import { API_ENDPOINT } from "../../utils/apiEndPoint"
import { BuyFooter } from "../BuyFooter"

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
      .get(`${API_ENDPOINT}/users/me/books/${id}/epub`)
      .then((res) => {
        // const replaceUrl = res.data.epub_url.replaceAll('\u0026', '&')
        console.log(res.data.epub_url)
        // console.log(replaceUrl)
        // setEpubUrl(replaceUrl)
      })
      .catch((err) => {
        console.log(err)
      })
    const url = "https://dorayaki-do-epub.s3.ap-northeast-1.amazonaws.com/techdo-book-3.epub"
    setEpubUrl(url)
  }, [])

  return (
    <>
      <Box h="87vh" position="relative">
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={epubUrl}
          swipeable
        />
      </Box>
      <BuyFooter id={id} />
    </>
  )
}

export default Reader
