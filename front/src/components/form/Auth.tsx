import { memo, useState, VFC } from "react"
import { Box, Center, Heading, Link, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"

import { LabelInput } from "./LabelInput"
import { BasicButton } from "../BasicButton"
import { useRouter } from "next/router"
import { useAuth } from "../../hooks/useAuth"
import { useMessage } from "../../hooks/useMessage"

type Props = {
  title: string
  redirectUrl?: string
}

export const Auth: VFC<Props> = memo((props) => {
  const { title, redirectUrl } = props
  const [error, setError] = useState("")
  const path = useRouter()
  const pathname = path.pathname
  const { auth } = useAuth()
  const router = useRouter()
  const { showMessage } = useMessage()

  const passwordConValidation = (values) => {
    if (values.password !== values.passwordConf) {
      setError("パスワードとパスワード（確認用）が異なります")
    } else {
      const data = {
        email: values.email,
        password: values.password,
        nickname: values.name,
      }
      auth({ data, path: pathname, router, showMessage, redirectUrl })
    }
  }

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", passwordConf: "" }}
      onSubmit={(values) => {
        if (title === "新規登録") {
          passwordConValidation(values)
        } else {
          const data = { nickname: values.name, password: values.password }
          auth({ data, path: pathname, router, showMessage, redirectUrl })
        }
        console.log(values)
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Center align="center" h="100vh">
            <Box w="335px">
              <Heading as="h1" fontSize="md">
                {title}
              </Heading>
              <LabelInput
                name="name"
                value={values.name}
                onChange={handleChange}
              >
                ニックネーム
              </LabelInput>
              {title === "新規登録" && (
                <LabelInput
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                >
                  メールアドレス
                </LabelInput>
              )}
              <LabelInput
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              >
                パスワード
              </LabelInput>
              {title === "新規登録" && (
                <>
                  <LabelInput
                    type="password"
                    name="passwordConf"
                    value={values.passwordConf}
                    onChange={handleChange}
                  >
                    パスワード（確認用）
                  </LabelInput>
                  <Text fontSize="xs" color="red.500">
                    {error}
                  </Text>
                </>
              )}
              <Box>
                <BasicButton
                  backgroundColor="#FFA000"
                  color="#FFFFFF"
                  type="submit"
                >
                  {title}
                </BasicButton>
                {title === "ログイン" ? (
                  <Link href="/sign_up">
                    <Text fontSize="sm">新規登録</Text>
                  </Link>
                ) : (
                  <Link href="/sign_in">
                    <Text fontSize="sm">ログイン</Text>
                  </Link>
                )}
              </Box>
            </Box>
          </Center>
        </Form>
      )}
    </Formik>
  )
})
