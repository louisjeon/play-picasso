import { Flex, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

export const Hero = ({ title }) => (
  <Flex w="90%" mt="4vh" justifyContent="space-between">
    <Heading fontSize="40px" fontFamily="inherit">
      <Link href="/feed">{title}</Link>
    </Heading>

    <Flex alignItems="center">
      <Image
        boxSize="2rem"
        borderRadius="full"
        src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
        alt="Fluffybuns the destroyer"
        mr="12px"
      />
      <span>Sign In / Login</span>
    </Flex>
  </Flex>
);
