import { useActions } from "../store/hooks";

export const useLogout = () => {
  const actions = useActions();
  return actions.user.clear;
};
