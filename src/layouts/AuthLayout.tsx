import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";
import { history, useDispatch, useLocation } from "umi";

import { ReactElement } from "react";
interface AuthLayoutProps {
  children?: ReactElement;
}
export function AuthLayout(props: AuthLayoutProps): ReactElement | null {
  const token = useMemo(() => Cookies.get("TOKEN"), []);
  const { pathname } = useLocation();
  if (!token && pathname !== "/login") {
    history.push("/login");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch({ type: "currentUser/queryUser", payload: undefined });
    }
  }, [token]);
  if (token) {
    return props?.children as ReactElement;
  }
  return null;
}
