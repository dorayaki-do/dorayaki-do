import { Box, Link, Flex, Text, Spacer } from "@chakra-ui/layout"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import Image from "next/image"
import React, { memo, VFC } from "react"
import { BasicButton } from "./BasicButton"
import { PurchaseBook } from "./CominaviBook"

type Props = {
  id: string
}

export const BuyFooter: VFC<Props> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = props
  const onClick = () => {
    onOpen()
    console.log("ok")
  }

  const imageUrl = "/entertainment_comic.png"
  const cominabiUrl =
    "https://mechacomi.jp/titles/832389/volumes/fd2612f1-e214-4a24-b6f9-3392d99ecdde"
  return (
    <>
      <Flex
        bgColor="#ffa000"
        h="8vh"
        alignItems="center"
        px="15%"
        onClick={onOpen}
      >
        <Box position="relative" w="5vh" h="5vh">
          <Image src={imageUrl} layout="fill" objectFit="contain" />
        </Box>
        <Text color="#FFFFFF">葬送のフリーレン</Text>
        <Spacer />
        <BasicButton
          color="#FFFFFF"
          backgroundColor="#FFA000"
          border="1px solid #FFFFFF"
          type="button"
          size="sm"
          width="100px"
          onClick={onClick}
        >
          詳細
        </BasicButton>
        <Link
          href={cominabiUrl}
          ml={2}
          isExternal
          _hover={{ "text-decoration": "none" }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <BasicButton
            color="#FFA000"
            backgroundColor="#FFFFFF"
            type="button"
            size="sm"
            width="100px"
          >
            コミなびへ
          </BasicButton>
        </Link>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>おすすめの作品</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PurchaseBook id={id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
})
