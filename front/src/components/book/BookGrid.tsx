import { Grid, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_ENDPOINT } from "../../utils/apiEndPoint"
import { BookItem } from "./BookItem"

type BookGridProps = {
  eventId: string
}

export const BookGrid: React.FC<BookGridProps> = ({ eventId }) => {
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    if (eventId != null) {
      axios
        .get(`${API_ENDPOINT}/users/me/event/${eventId}/books`)
        .then((res) => {
          setBookData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .get(`${API_ENDPOINT}/users/me/books`)
        .then((res) => {
          setBookData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [eventId])

  return (
    <Grid
      templateColumns="repeat(auto-fill, 150px)"
      justifyContent="center"
      gap={6}
      mx="auto"
    >
      {bookData && bookData.length ? (
        <>
          {bookData.map((data) => (
            <BookItem
              bookId={data.ID}
              title={data.Title}
              imageUrl={data.Thumbnailurl}
              canAccess={data.CanAccess}
            />
          ))}
        </>
      ) : (
        <Text>本がありません</Text>
      )}
    </Grid>
  )
}
