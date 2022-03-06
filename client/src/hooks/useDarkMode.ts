import { useColorModeValue } from "@chakra-ui/react";

export const useDarkMode = () => {
  return useColorModeValue("light", "dark") === "dark";
};
