import { useRouter } from "next/router";
import { memo, VFC } from "react";
import { AddBook } from "../../components/AddBook";
import { getAsStringFromArray } from "../../utils/getAsStringFromArray";

const App: VFC = memo(() => {
  const router = useRouter()
  const id = getAsStringFromArray(router.query.id)

  return <AddBook id={id} />
})

export default App