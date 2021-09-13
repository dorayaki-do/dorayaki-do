import { Box, Input, Center, Heading, Stack } from "@chakra-ui/react"
import { BookGrid } from "./BookGrid"

export const BookShelf = () => {
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
          <BookGrid></BookGrid>
        </Stack>
      </Center>
    </Box>
  )
}
