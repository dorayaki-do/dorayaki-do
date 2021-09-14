import { Link, Text, Center, VStack, Heading } from "@chakra-ui/react"
import { Container } from "../components/Container"
import { BasicButton } from "../components/BasicButton"

const Index = () => (
  <Container height="95vh">
    <Center>
      <VStack>
        <Heading mt={50}>DorayakiDo</Heading>
        <Text mt={50}>旅して漫画を集めよう</Text>
        <Link href="/sign_in">
          <BasicButton color="#ffffff" backgroundColor="#FFA000">
            ログイン
          </BasicButton>
        </Link>
      </VStack>
    </Center>
  </Container>
)

export default Index
