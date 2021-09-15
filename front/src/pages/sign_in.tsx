import { useRouter } from "next/router"
import { memo, VFC } from "react"

import { Auth } from "../components/form/Auth"
import { getAsStringFromArray } from "../utils/getAsStringFromArray"

const SignIn: VFC = memo(() => {
  const router = useRouter()
  const redirectUrl = getAsStringFromArray(router.query.redirect_url)

  return <Auth title="ログイン" redirectUrl={redirectUrl} />
})

export default SignIn
