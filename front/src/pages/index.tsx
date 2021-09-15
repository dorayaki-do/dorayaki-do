import { Link, Text, Center, VStack, Heading } from "@chakra-ui/react"
import { Container } from "../components/Container"
import { BasicButton } from "../components/BasicButton"
import { UserContext } from "../../context/User"
import { useContext } from "react"
import { useRouter } from "next/router"

const Index = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  if (user && user !== null) {
    if (typeof window !== "undefined") {
      router.push("/shelf")
    }
  }
  return (
    <Container height="95vh">
      <Center>
        <VStack>
          <Heading mt={50}>DorayakiDo</Heading>
          <Text mt={50}>旅して漫画を集めよう</Text>
          <Link href="/sign_in" _hover={{ textDecoration: "none" }}>
            <BasicButton color="#ffffff" backgroundColor="#FFA000">
              ログイン
            </BasicButton>
          </Link>
        </VStack>
      </Center>
    </Container>
  )
}

export default Index
