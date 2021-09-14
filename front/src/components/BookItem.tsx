import {
  Box,
  Center,
  LinkBox,
  LinkOverlay,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"

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
  return (
    <Stack>
      <LinkBox>
        {imageUrl != "" ? (
          <Image src={imageUrl} alt={title} width={150} height={240} />
        ) : (
          <Box bg="tomato" width="150px" height="240px"></Box>
        )}
        <Center>
          <LinkOverlay href={`/read/${bookId}`}>
            <Text textDecoration="none">{title}</Text>
          </LinkOverlay>
        </Center>
      </LinkBox>
    </Stack>
  )
}
