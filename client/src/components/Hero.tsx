import { Flex, Heading, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useUser } from "../hooks/useUser";
import { useUserNavOn } from "../hooks/useUserNavOn";
import { logout } from "../redux/authSlice";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Hero = ({ title }: any) => {
  const dispatch = useDispatch();
  const user = useUser();
  const darkMode = useDarkMode();
  const userNavOn = useUserNavOn();

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace("/feed");
  };

  return (
    <Flex w="90%" mt="4vh" justifyContent="space-between">
      <Heading fontSize="40px" fontFamily="inherit">
        <Link to="/feed">{title}</Link>
      </Heading>
      <Flex alignItems="center">
        <ColorModeSwitcher
          justifySelf="flex-end"
          border="1px solid red"
          mr="10px"
        />
        {user ? (
          <>
            <CustomBtn id="userNavBtn" style={{ paddingLeft: 0 }}>
              <Image
                id="userNavImg"
                boxSize="2rem"
                borderRadius="full"
                src={
                  user?.profilePicture ||
                  "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
                }
                alt="Fluffybuns the destroyer"
              />
              <span id="userNavName">{user.username}</span>
            </CustomBtn>
            {userNavOn && (
              <UserNav
                style={{ backgroundColor: darkMode ? "#1A202C" : "white" }}
              >
                <Link to="/mypage">
                  <CustomBtn>
                    <span className="material-icons">account_circle</span> My
                    Account
                  </CustomBtn>
                </Link>
                <CustomBtn onClick={handleLogout}>
                  <span className="material-icons">vpn_key</span> Logout
                </CustomBtn>
              </UserNav>
            )}
          </>
        ) : (
          <Link to="/login">
            <CustomBtn>
              <span className="material-icons">vpn_key</span>Login
            </CustomBtn>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

const CustomBtn = styled.button`
  display: flex;
  color: red;
  align-items: center;
  font-size: 16px;
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid red;
  border-radius: 5px;
  height: 40px;
  padding: 0 10px;
  background-color: "transparent";
  width: 100%;
`;

const UserNav = styled.ul`
  position: absolute;
  margin-top: 122px;
  right: 20px;
  border-radius: 5px;
  color: white;
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid red;
  overflow: hidden;
`;
