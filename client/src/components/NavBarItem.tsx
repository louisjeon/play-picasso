import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";

interface NavBarItemProps {
  href: string;
  id: number;
}

export const NavBarItem: React.FC<NavBarItemProps> = ({ href, id }) => {
  const iconNames = ["home", "dashboard", "trending_up", "explore", "gesture"];

  return (
    <Link href={href}>
      <Flex
        flex="1"
        _hover={{ cursor: "pointer" }}
        border="1px solid red"
        margin="0 1px"
        borderRadius="10px"
        h="50px"
        fontSize="23px"
        justifyContent="space-around"
        alignItems="center"
      >
        <span className="material-icons">{iconNames[id]}</span>
      </Flex>
    </Link>
  );
};
