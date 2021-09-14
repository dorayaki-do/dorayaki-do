import axios from "axios"
import { NextRouter } from "next/router"
import { API_ENDPOINT } from "../utils/apiEndPoint"

type Props = {
  data: {
    nickname: string
    email?: string
    password: string
  }
  path: string
  router: NextRouter
}

export const useAuth = () => {
  const auth = (props: Props) => {
    const { data, path, router } = props
    const uri = path === "/sign_up" ? "signup" : "login"
    const id = 1

    axios.post(`${API_ENDPOINT}/${uri}`, {...data})
    .then(() => {
      router.push(`/book/${id}`)
    })
    .catch((err) => console.log(err))
  }

  return {auth}
}