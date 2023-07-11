import { userActions } from "./slices/user";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./index";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useActions = () => {
  const dispatch = useAppDispatch();

  return {
    user: bindActionCreators(userActions, dispatch),
  };
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
