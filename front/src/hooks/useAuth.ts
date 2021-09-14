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

    axios.post(`${API_ENDPOINT}/${path}`, {...data})
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.message))
  }

  return {auth}
}