import React, { useState } from "react"
import { Box } from "@chakra-ui/layout"
import { ReactReader } from "react-reader"

type ReaderProps = {
  id: string
}

const Reader: React.FC<ReaderProps> = ({ id }) => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }
  return (
    <Box h="90vh" position="relative">
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url={"/" + id + ".epub"}
      />
    </Box>
  )
}

export default Reader
