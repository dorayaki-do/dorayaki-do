import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FormikHandlers } from "formik";
import { ChangeEvent, memo, VFC } from "react";

type Props = {
  type: string
  value: string
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
};
  children: string
}

export const LabelInput: VFC<Props> = memo((props) => {
  const { type, value, onChange, children } = props;
  return (
    <FormControl isRequired my="4">
      <FormLabel fontSize="sm">{children}</FormLabel>
      <Input
        type={type}
        name={type}
        value={value}
        placeholder={`${children}を入れてください`}
        fontSize="xs"
        borderRadius="3px"
        onChange={onChange}
      />
    </FormControl>
  )
})