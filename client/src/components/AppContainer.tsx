import { Flex } from "@chakra-ui/react";

export const AppContainer = (props: any) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      color="red"
      fontFamily="Vujahday Script, cursive"
      minHeight="100vh"
      width="100%"
      {...props}
    />
  );
};
