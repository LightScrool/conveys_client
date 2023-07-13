import { useIsFirstRender } from "./useIsFirstRender";
import { initYm } from "../api/ym";

export const useInitYM = () => {
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) {
    initYm();
  }
};
