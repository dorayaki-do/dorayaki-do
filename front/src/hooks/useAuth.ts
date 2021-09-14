import axios from "axios"
import { API_ENDPOINT } from "../utils/apiEndPoint"

type Props = {
  data: {
    nickname: string
    email?: string
    password: string
  }
  path: string
}

export const useAuth = () => {
  const auth = (props: Props) => {
    const { data, path } = props
    const uri = path === "/sign_up" ? "signup" : "login"

    axios.post(`${API_ENDPOINT}/${uri}`, {...data})
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }

  return {auth}
}