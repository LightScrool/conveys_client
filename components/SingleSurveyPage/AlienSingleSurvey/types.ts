import {ChangeEvent} from "react";

export type TValues = { [questionId: number]: Array<string | number> };

export type THandleChange = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
};
