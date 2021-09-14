import React from "react"
import {
  Box,
  Text,
  Link,
  useDisclosure,
  Flex,
  IconButton,
  Spacer,
  Collapse,
  VStack,
  StackDivider,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Flex bgColor="#ffa000" minH="5vh" alignItems="center" px="15%">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Text color="white" fontWeight="bold" fontSize="lg">
            DorayakiDo
          </Text>
        </Link>
        <Spacer />
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          ref={btnRef}
          variant="outline"
          colorScheme="blackAlpha"
          focusable={true}
          color="white"
          onClick={onToggle}
          size="sm"
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity={false}>
        <Box px="15%" py="10px" color="white" bg="#ffa000">
          <VStack
            divider={<StackDivider borderColor="white" />}
            spacing={4}
            align="stretch"
          >
            <Link href="/shelf">
              <Text fontWeight="bold">本棚</Text>
            </Link>
            <Link href="/map">
              <Text fontWeight="bold">地図</Text>
            </Link>
          </VStack>
        </Box>
      </Collapse>
    </>
  )
}
