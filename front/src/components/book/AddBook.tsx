import axios from "axios"
import { useRouter } from "next/router"
import { memo, VFC } from "react"
import { useMessage } from "../../hooks/useMessage"
import { API_ENDPOINT } from "../../utils/apiEndPoint"
import { BookConfirmation } from "./BookConfirmation"
import { Center } from "@chakra-ui/react"

type Props = {
  id: string
}

export const AddBook: VFC<Props> = memo((props) => {
  const { id } = props
  const imageUrl = "https://sample.com"
  const router = useRouter()
  const { showMessage } = useMessage()

  const handleClickAddBook = () => {
    axios
      .post(`${API_ENDPOINT}/users/me/books`, { id })
      .then(() => {
        router.push("/shelf")
        showMessage({ title: "本棚に追加しました", status: "success" })
      })
      .catch(() => {
        showMessage({ title: "本棚に追加できませんでした", status: "error" })
      })
  }

  const handleClickNoAddBook = () => {
    router.push("/")
    showMessage({ title: "本棚への追加を中断しました", status: "warning" })
  }

  return (
    <Center h="95vh">
      <BookConfirmation
        bookId={id}
        url={imageUrl}
        confMessage="この本を本棚に追加しますか？"
        yesButton="追加する"
        noButton="追加しない"
        yesButtonAction={handleClickAddBook}
        noButtonAction={handleClickNoAddBook}
      />
    </Center>
  )
})
