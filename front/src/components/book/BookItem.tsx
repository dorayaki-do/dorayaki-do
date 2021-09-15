import {
  Box,
  Center,
  LinkBox,
  LinkOverlay,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"
import { FavStar } from "./FavStar"
import { Container } from "../Container"
import { useState } from "react"

type BookItemProps = {
  imageUrl: string
  title: string
  bookId: string
  canAccess: boolean
}
export const BookItem: React.FC<BookItemProps> = ({
  imageUrl,
  title,
  bookId,
  canAccess,
}) => {
  const [isFav, setIsFav] = useState<boolean>(false)

  const onClickFav = () => {
    setIsFav((prev) => !prev)
  }

  return (
    <Stack>
      <LinkBox>
        <Container p="0" position="relative" maxW="100%" height="auto">
          {imageUrl != "" ? (
            <Image src={imageUrl} alt={title} width={150} height={240} />
          ) : (
            <Box bg="tomato" width="150px" height="240px"></Box>
          )}
          <Box position="absolute" zIndex="1" top={0} right={2}>
            <FavStar isFav={isFav} onClick={onClickFav} />
          </Box>
        </Container>
        <Center>
          {canAccess ? (
            <LinkOverlay href={`/read/${bookId}`}>
              <Text textDecoration="none">{title}</Text>
            </LinkOverlay>
          ) : (
            <Text textDecoration="none">{title}</Text>
          )}
        </Center>
      </LinkBox>
    </Stack>
  )
}
