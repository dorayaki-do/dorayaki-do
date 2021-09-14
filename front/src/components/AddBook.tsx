import axios from "axios";
import { useRouter } from "next/router";
import { memo, VFC } from "react";
import { API_ENDPOINT } from "../utils/apiEndPoint";
import { BookConfirmation } from "./BookConfirmation";

type Props = {
  id: string
}

export const AddBook: VFC<Props> = memo((props) => {
  const { id } = props
  const imageUrl = "https://sample.com"
  const router = useRouter()

  const handleClickAddBook = () => {
    axios.post(`${API_ENDPOINT}/books`, {id})
    .then(() => {
      router.push('/shelf')
    })
    .catch((err) => console.log(err))
  }

  return (
    <BookConfirmation
      bookId={id}
      url={imageUrl}
      confMessage="この本を本棚に追加しますか？"
      yesButton="追加する"
      noButton="追加しない"
      clickAddButton={handleClickAddBook}
    />
  )
})