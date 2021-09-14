import { memo, ReactNode, VFC } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { BasicButton } from "../BasicButton"

type Props = {
  bookId: string
  url: string
  confMessage: string
  yesButton: ReactNode
  noButton: ReactNode
  yesButtonAction?: () => void
  noButtonAction?: () => void
}

export const BookConfirmation: VFC<Props> = memo((props) => {
  const {
    bookId,
    url,
    confMessage,
    yesButton,
    noButton,
    yesButtonAction,
    noButtonAction,
  } = props

  return (
    <Flex align="center" justify="center">
      <Box>
        {/* <Image
          src={url}
          htmlWidth="180px"
        /> */}
        <Box w="180px" h="288px" bg="red.500" mx="auto" />
        <Box>
          <Text mt="4">{confMessage}</Text>
        </Box>
        <Flex display="inline">
          <BasicButton
            color="#FFFFFF"
            backgroundColor="#FFA000"
            type="button"
            onClick={yesButtonAction}
          >
            {yesButton}
          </BasicButton>
          <BasicButton
            color="#333"
            backgroundColor="#FFFFFF"
            type="button"
            border="1px solid #333333"
            onClick={noButtonAction}
          >
            {noButton}
          </BasicButton>
        </Flex>
      </Box>
    </Flex>
  )
})
