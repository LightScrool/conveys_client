import {useAppSelector} from "../store/hooks";
import {selectIsAuth} from "../store/selectors/user";
import {login} from "../utils/login";

export const useOnlyAuth = () => {
  if (!useAppSelector(selectIsAuth)) {
    login();
  }
}