import { memo, VFC } from "react";
import {
  Box,
  Center,
  Heading,
  Text
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { LabelInput } from "./LabelInput";
import { BasicButton } from "../BasicButton";

type Props = {
  title: string
}

export const Auth: VFC<Props> = memo((props) => {
  const { title } = props;

  return (
    <Formik
      initialValues={{name: "", email: "", password: "", passwordConf: ""}}
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
                <Heading as="h1" fontSize="md">{title}</Heading>
                <LabelInput
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                >
                  メールアドレス
                </LabelInput>
                <LabelInput
                  type="password"
                  name="password"
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
                    {title}
                  </BasicButton>
                  <Text fontSize="sm">
                    {title === "ログイン" ? "新規登録" : "ログイン"}
                  </Text>
                </Box>
              </Box>
            </Center>
          </Form>
      )}
    </Formik>
  )
})