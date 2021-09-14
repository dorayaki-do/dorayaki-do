import { memo, VFC } from "react";
import { BookConfirmation } from "./BookConfirmation";

type Props = {
  id: string
}

export const AddBook: VFC<Props> = memo((props) => {
  const { id } = props
  const imageUrl = "https://sample.com"
  return (
    <BookConfirmation
      bookId={id}
      url={imageUrl}
      confMessage="この本を本棚に追加しますか？"
      yesButton="追加する"
      noButton="追加しない"
    />
  )
})