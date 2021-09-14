import { memo, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  color: string
  backgroundColor: string
  children: string
  type?: "button" | "submit" | "reset"
  border?: string
}

export const BasicButton: VFC<Props> = memo((props) => {
  const { color, backgroundColor, children, type, border } = props;

  return(
    <Button
      my="4"
      w="170px"
      mx="auto"
      bg={backgroundColor}
      color={color}
      type={type}
      border={border}
      display="block"
      borderRadius="100px"
      _active={{opacity: 0.8}}
    >
      {children}
    </Button>
  )
})