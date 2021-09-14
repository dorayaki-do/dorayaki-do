import { Flex, Text, Spacer } from "@chakra-ui/layout"
import Image from "next/image"
import { memo, VFC } from "react"
import { BasicButton } from "./BasicButton"

type Props = {
  id: string
}

export const BuyFooter: VFC<Props> = memo((props) => {
  const { id } = props
  const onClick = () => {
    console.log("ok")
  }
  const imageUrl = "/entertainment_comic.png"
  return (
    <Flex bgColor="#ffa000" h="5vh" alignItems="center" px="15%">
      <Image src={imageUrl} width={50} height={50} />
      <Text color="#FFFFFF" fontSize="sm">
        葬送のフリーレン
      </Text>
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
      <BasicButton
        color="#FFA000"
        backgroundColor="#FFFFFF"
        type="button"
        size="sm"
        width="100px"
      >
        コミなびへ
      </BasicButton>
    </Flex>
  )
})
