import { useRouter } from "next/router"
import { BookShelf } from "../../components/book/BookShelf"
import { getAsStringFromArray } from "../../utils/getAsStringFromArray"

const App = () => {
  const router = useRouter()
  const eventId = getAsStringFromArray(router.query.event)
  return <BookShelf eventId={eventId} />
}

export default App
