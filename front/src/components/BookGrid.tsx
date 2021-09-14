import { Grid, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_ENDPOINT } from "../utils/apiEndPoint"
import { BookItem } from "./BookItem"

export const BookGrid = () => {
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/books`)
    .then((res) => {
      setBookData(res.data.books)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Grid
      templateColumns="repeat(auto-fill, 150px)"
      justifyContent="center"
      gap={6}
      mx="auto"
    >
      {bookData.length ? (
        <>
          {bookData.map((data) => (
            <BookItem
              bookId={data.id}
              title={data.title}
              // unhandled runtime errorのため一旦コメントアウト
              // imageUrl={data.epub_url}
              imageUrl={"/entertainment_comic.png"}
            />
          ))}
        </>
      ) : (
        <Text>本棚に本がありません</Text>
      )
      }
    </Grid>
  )
}
