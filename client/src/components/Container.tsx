import { Flex, useColorMode } from "@chakra-ui/react";

export const Container = (props) => {
  const { colorMode } = useColorMode();
  const reverseColorMode = colorMode === "light" ? "dark" : "light";

  const bgColor = { light: "white", dark: "gray.900" };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[reverseColorMode]}
      color="red"
      fontFamily="Vujahday Script, cursive"
      minHeight="100vh"
      width="100%"
      {...props}
    />
  );
};
