import { useSelector } from "react-redux";
import { IState } from "../types";

export const useUserNavOn = () => {
  return useSelector<IState>((state) => state.userNav);
};
