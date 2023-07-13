import { useRouter } from "next/router";
import { useEffect } from "react";
import { sendHit } from "../api/ym";

export const usePageYM = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sendHit(pathname);
    }
  }, []);
};
