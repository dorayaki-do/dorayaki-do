import { memo, VFC } from "react"

import { Auth } from "../components/form/Auth"

const SignIn: VFC = memo(() => {
  return (
    <Auth
      title="ログイン"
    />
  )
})

export default SignIn