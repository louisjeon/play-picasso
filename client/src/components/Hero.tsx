import { Flex, Heading, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IState, IUser } from "../types";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Hero = ({ title }: any) => {
  const user: any = useSelector<IState>((state) => state.auth.user);

  return (
    <Flex w="90%" mt="4vh" justifyContent="space-between">
      <Heading fontSize="40px" fontFamily="inherit">
        <Link to="/feed">{title}</Link>
      </Heading>

      <Flex alignItems="center">
        <ColorModeSwitcher
          justifySelf="flex-end"
          position="absolute"
          top="1vw"
          right="5vw"
          border="1px solid red"
        />
        <Link
          to={user ? "/mypage" : "/login"}
          style={{
            display: "flex",
            color: "black",
            alignItems: "center",
            fontSize: "16px",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            marginRight: "10px",
          }}
        >
          <Image
            boxSize="2rem"
            borderRadius="full"
            src={
              user.profilePicture ||
              "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
            }
            alt="Fluffybuns the destroyer"
          />
          <span>{user ? user.username : "Register / Login"}</span>
        </Link>
      </Flex>
    </Flex>
  );
};
