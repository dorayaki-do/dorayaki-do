import { memo, VFC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { BasicButton } from "./BasicButton";

type Props = {
  bookId: string
  url: string
  confMessage: string
  yesButton: string
  noButton: string
  clickAddButton: () => void
}

export const BookConfirmation: VFC<Props> = memo((props) => {
  const { bookId, url, confMessage, yesButton, noButton, clickAddButton } = props

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box>
        {/* <Image
          src={url}
          htmlWidth="180px"
        /> */}
        <Box
          w="180px"
          h="288px"
          bg="red.500"
          mx="auto"
        />
        <Box>
          <Text mt="4">{confMessage}</Text>
        </Box>
        <Flex display="inline">
          <BasicButton
            color="#FFFFFF"
            backgroundColor="#FFA000"
            type="button"
            onClick={clickAddButton}
          >
            {yesButton}
          </BasicButton>
          <BasicButton
            color="#333"
            backgroundColor="#FFFFFF"
            type="button"
            border="1px solid #333333"
          >
            {noButton}
          </BasicButton>
        </Flex>
      </Box>
    </Flex>
  )
})