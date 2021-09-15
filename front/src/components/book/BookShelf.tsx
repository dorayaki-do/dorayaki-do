import { Box, Input, Center, Heading, Stack, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_ENDPOINT } from "../../utils/apiEndPoint"
import { BookGrid } from "./BookGrid"

type BookShelf = {
  eventId: string
}

export const BookShelf = ({ eventId }) => {
  const [eventName, setEventName] = useState<string>("")
  const [eventDetail, setEventDetail] = useState<string>("")

  useEffect(() => {
    if (eventId != null) {
      axios
        .get(`${API_ENDPOINT}/users/me/event/${eventId}/`)
        .then((res) => {
          setEventName(res.data.Title)
          setEventDetail(res.data.Description)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [eventId, eventName])

  return (
    <Box>
      <Center>
        <Stack width="80%" spacing={20} mt={20} mb={40}>
          <Center>
            <Heading>本棚</Heading>
          </Center>
          <Center>
            <Input width="80%" placeholder="本や作者を検索" />
          </Center>
          {eventId != null && (
            <Box>
              <Center>
                <Heading as="h3" fontSize="md">
                  {eventName}
                </Heading>
              </Center>
              <Center>{eventDetail}</Center>
            </Box>
          )}
          <BookGrid eventId={eventId} />
        </Stack>
      </Center>
    </Box>
  )
}
