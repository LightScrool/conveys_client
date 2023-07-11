import { useEffect } from "react";
import { useRouter } from "next/router";
import { useActions } from "../store/hooks";

export const useAuth = () => {
  const router = useRouter();

  const actions = useActions();
  const setToken = actions.user.setToken;

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    const parseToken = /access_token=([^&]+)/.exec(hash);
    const token = parseToken ? parseToken[1] : null;

    if (token) {
      setToken(token);
      router.replace({ ...router, hash: "" });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
