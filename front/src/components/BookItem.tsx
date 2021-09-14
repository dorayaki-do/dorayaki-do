import Image from "next/image"
import {
  Box,
  Center,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react"
import axios from "axios"

import { API_ENDPOINT } from "../utils/apiEndPoint"
import { useState } from "react"

type BookItemProps = {
  imageUrl: string
  title: string
  bookId: string
}
export const BookItem: React.FC<BookItemProps> = ({
  imageUrl,
  title,
  bookId,
}) => {
  const [epubUrl, setEpubUrl] = useState("")

  const handleClickGetEpub = () => {
    axios.get(`${API_ENDPOINT}/${bookId}/epub`)
    .then((res) => {
      setEpubUrl(res.data.epub_url)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Stack>
      <LinkBox>
        {imageUrl != "" ? (
          <Image src={imageUrl} alt={title} width={150} height={240} />
        ) : (
          <Box bg="tomato" width="150px" height="240px"></Box>
        )}
        <Center>
          <LinkOverlay onClick={handleClickGetEpub} href="/read/alice">
            <Text textDecoration="none">{title}</Text>
          </LinkOverlay>
        </Center>
      </LinkBox>
    </Stack>
  )
}
