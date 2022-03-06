import { Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { userNavOff, userNavSwitch } from "../redux/userNavSlice";

export const AppContainer = (props: any) => {
  const dispatch = useDispatch();

  const isUserNavBtn = (target: EventTarget) => {
    return ["userNavBtn", "userNavImg", "userNavName"].includes(
      Object.values(target)[1].id
    );
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      color="red"
      fontFamily="Vujahday Script, cursive"
      minHeight="100vh"
      width="100%"
      overflow="hidden"
      onClick={(e: MouseEvent) => {
        if (isUserNavBtn(e.target!)) {
          dispatch(userNavSwitch());
        } else {
          dispatch(userNavOff());
        }
      }}
      {...props}
    />
  );
};
