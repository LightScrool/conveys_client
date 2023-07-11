import { useAppSelector } from "../store/hooks";
import { selectUserToken } from "../store/selectors/user";
import { useEffect, useRef, useState } from "react";
import { IConveysBackend } from "../api/types";
import ConveysBackend from "../api/ConveysBackend";

export const useBackend = () => {
  const token = useAppSelector(selectUserToken);
  const [api, setApi] = useState<IConveysBackend>(new ConveysBackend(token));
  const prevToken = useRef<string>(token);

  useEffect(() => {
    if (token !== prevToken.current) {
      setApi(new ConveysBackend(token));
      prevToken.current = token;
    }
  }, [token]);

  return api;
};
