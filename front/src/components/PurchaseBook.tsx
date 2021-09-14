import { memo, VFC } from "react";
import { BookConfirmation } from "./BookConfirmation";

type Props = {
  id: string
}

export const PurchaseBook: VFC<Props> = memo((props) => {
  const { id } = props
  const imageUrl = "https://sample.com"
  return (
    <BookConfirmation
      bookId={id}
      url={imageUrl}
      confMessage="この本を購入しますか？"
      yesButton="購入する"
      noButton="購入しない"
    />
  )
})