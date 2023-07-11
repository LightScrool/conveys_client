import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const selectUserModule = (state: RootState) => state.user;

export const selectUserToken = createSelector(
  [selectUserModule],
  (userModule) => userModule.token
);

export const selectIsAuth = createSelector(
  [selectUserModule],
  (userModule) => Boolean(userModule.token)
);

export const selectUserName = createSelector(
  [selectUserModule],
  (userData) => userData.name
);
export const selectUserId = createSelector(
  [selectUserModule],
  (userData) => userData.id
);
export const selectUserScore = createSelector(
  [selectUserModule],
  (userData) => userData.score
);

export const selectUserStatus = createSelector(
  [selectUserModule],
  (userData) => userData.score
);
