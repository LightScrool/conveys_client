import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus, TUserInfo } from "../../types/general";
import { AppDispatch } from "../index";
import longTermStorage from "../../longTermStorage";

export type TUserSliceState = TUserInfo & {
  token: string;
  status: TStatus;
};

const clearState: TUserSliceState = {
  token: "",
  id: "",
  name: "",
  score: 0,
  status: "OK",
};

export const initialState: TUserSliceState =
  JSON.parse(longTermStorage.getItem("user") || "{}") || clearState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      longTermStorage.setItem("user", JSON.stringify(state));

      return state;
    },
    setStatus: (state, action: PayloadAction<TStatus>) => {
      state.status = action.payload;

      longTermStorage.setItem("user", JSON.stringify(state));

      return state;
    },
    setInfo: (state, action: PayloadAction<TUserInfo>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.score = action.payload.score;

      longTermStorage.setItem("user", JSON.stringify(state));

      return state;
    },
    clear: () => {
      longTermStorage.removeItem("user");

      return clearState;
    },
  },
});

const loadUserInfo =
  (getUserInfo: () => Promise<TUserInfo>) => (dispatch: AppDispatch) => {
    const setStatus = (status: TStatus) =>
      dispatch(userSlice.actions.setStatus(status));
    const setInfo = (info: TUserInfo) =>
      dispatch(userSlice.actions.setInfo(info));

    setStatus("LOADING");

    getUserInfo()
      .then((info) => {
        setInfo(info);

        setStatus("OK");
      })
      .catch(() => {
        setStatus("ERROR");
      });
  };

export const userActions = { ...userSlice.actions, loadUserInfo };
