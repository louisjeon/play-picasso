import { useSelector } from "react-redux";
import { IState } from "../types";

export const useUser = () => {
  return useSelector<IState>((state) => state.auth.user) as any;
};
