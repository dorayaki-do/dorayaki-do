import { Grid, Box, Center, Heading, Stack } from "@chakra-ui/react"
import { BookGrid } from "./BookGrid"

export const BookShelf = () => {
  return (
    <Center>
      <Stack width="80%">
        <Center>
          <Heading>本棚</Heading>
        </Center>
        <BookGrid></BookGrid>
      </Stack>
    </Center>
  )
}
