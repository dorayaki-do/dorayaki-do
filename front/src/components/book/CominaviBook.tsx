import { Link } from "@chakra-ui/layout"
import { memo, VFC } from "react"
import { BookConfirmation } from "./BookConfirmation"

type Props = {
  id: string
  closeAction: () => void
}

export const PurchaseBook: VFC<Props> = memo((props) => {
  const { id, closeAction } = props
  const imageUrl = "https://sample.com"
  const cominabiUrl =
    "https://mechacomi.jp/titles/832389/volumes/fd2612f1-e214-4a24-b6f9-3392d99ecdde"

  return (
    <BookConfirmation
      bookId={id}
      url={imageUrl}
      confMessage="この作者の他の作品を見ますか？"
      yesButton={
        <Link href={cominabiUrl} isExternal>
          コミなびで見る
        </Link>
      }
      noButton="戻る"
      noButtonAction={closeAction}
    />
  )
})
