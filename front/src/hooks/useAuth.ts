import axios from "axios"
import { NextRouter } from "next/router"
import { API_ENDPOINT } from "../utils/apiEndPoint"
import { UserContext } from "../../context/User"
import { useContext } from "react"

type Message = {
  title: string
  status: "info" | "warning" | "success" | "error"
}

type Props = {
  data: {
    nickname: string
    email?: string
    password: string
  }
  path: string
  router: NextRouter
  showMessage: (props: Message) => void
}

export const useAuth = () => {
  const { user, userLoggedIn, userLoggedOut } = useContext(UserContext)

  const auth = (props: Props) => {
    const { data, path, router, showMessage } = props
    const uri = path === "/sign_up" ? "signup" : "login"
    const title = path === "/sign_up" ? "新規登録" : "ログイン"
    const id = 1

    axios
      .post(`${API_ENDPOINT}/${uri}`, { ...data })
      .then(() => {
        userLoggedIn(data.nickname)
        router.push(`/book/${id}`)
        showMessage({ title: `${title}しました`, status: "success" })
      })
      .catch((e) => {
        showMessage({
          title: `${title}に失敗しました。もう一度お試しください。`,
          status: "error",
        })
      })
  }

  return { auth }
}
