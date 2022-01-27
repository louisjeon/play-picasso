import { Flex, Heading, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { IState } from "../types";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Hero = ({ title }: any) => {
  const dispatch = useDispatch();
  const user: any = useSelector<IState>((state) => state.auth.user);
  const [userNavOn, setUserNavOn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
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
            <CustomBtn
              onClick={() => setUserNavOn((state) => !state)}
              style={{ paddingLeft: 0 }}
            >
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={
                  user?.profilePicture ||
                  "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
                }
                alt="Fluffybuns the destroyer"
              />
              <span>{user.username}</span>
            </CustomBtn>
            {userNavOn && (
              <UserNav>
                <Link to="/mypage" onClick={() => setUserNavOn(false)}>
                  <CustomBtn>
                    <span className="material-icons">account_circle</span>My
                    Account
                  </CustomBtn>
                </Link>
                <CustomBtn onClick={handleLogout}>
                  <span className="material-icons">vpn_key</span>Logout
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
  background-color: ${(props) => {
    console.log(props);
    return "white";
  }}; ;
`;
