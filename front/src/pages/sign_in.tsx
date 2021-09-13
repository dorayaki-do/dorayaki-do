import { memo, VFC } from "react"
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from "@chakra-ui/react"
import { Form, Formik } from "formik"

import { BasicButton } from "../components/BasicButton"
import { LabelInput } from "../components/form/LabelInput"

const SignIn: VFC = memo(() => {
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Center align="center" h="100vh">
            <Box w="335px">
              <Heading as="h1" fontSize="md">ログイン</Heading>
              <LabelInput
                type="email"
                value={values.email}
                onChange={handleChange}
              >
                メールアドレス
              </LabelInput>
              <LabelInput
                type="password"
                value={values.password}
                onChange={handleChange}
              >
                パスワード
              </LabelInput>
              <Box>
                <BasicButton
                  backgroundColor="#FFA000"
                  color="#FFFFFF"
                  type="submit"
                >
                  ログイン
                </BasicButton>
                <Text fontSize="sm">新規登録</Text>
              </Box>
            </Box>
          </Center>
        </Form>
      )}
    </Formik>
  )
})

export default SignIn