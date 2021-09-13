import { memo, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  color: string
  backgroundColor: string
  children: string
  type?: "button" | "submit" | "reset"
}

export const BasicButton: VFC<Props> = memo((props) => {
  const { color, backgroundColor, children, type } = props;

  return(
    <Button
      my="4"
      w="170px"
      bg={backgroundColor}
      color={color}
      type={type}
      borderRadius="100px"
      _active={{opacity: 0.8}}
    >
      {children}
    </Button>
  )
})