import { useRouter } from "next/router";
import { memo, VFC } from "react";
import { PurchaseBook } from "../../components/CominaviBook";
import { getAsStringFromArray } from "../../utils/getAsStringFromArray";

const App: VFC = memo(() => {
  const router = useRouter()
  const id = getAsStringFromArray(router.query.id)
  console.log(id)

  return <PurchaseBook id={id} />
})

export default App