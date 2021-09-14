import { memo, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  color: string
  backgroundColor: string
  children: string
  type?: "button" | "submit" | "reset"
  border?: string
  onClick?: () => void
}

export const BasicButton: VFC<Props> = memo((props) => {
  const { color, backgroundColor, children, type, border, onClick } = props;

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
      onClick={onClick}
      _active={{opacity: 0.8}}
    >
      {children}
    </Button>
  )
})