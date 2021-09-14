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
      confMessage="この作者の他の作品を見ますか？"
      yesButton="コミなびで見る"
      noButton="本棚に戻る"
    />
  )
})