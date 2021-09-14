import { memo, VFC } from "react"

import { Auth } from "../components/form/Auth"

const SignUp: VFC = memo(() => {
  return (
    <Auth
      title="新規登録"
    />
  )
})

export default SignUp