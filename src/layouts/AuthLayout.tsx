import Cookies from "js-cookie";
import { ReactElement, useEffect, useMemo } from "react";
import { history, useDispatch, useLocation } from "umi";
interface AuthLayoutProps {
  children?: ReactElement;
}
export function AuthLayout(props: AuthLayoutProps): ReactElement | null {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  // 生成链： memo(监听TOKEN cookie) -> 触发effect -> 跳转登录页
  //                                            |-> 调用models的effect获取用户数据存入本地
  const token = useMemo(() => Cookies.get("TOKEN"), [Cookies.get("TOKEN")]);

  useEffect(() => {
    // model逻辑放入effect hook，解决重复渲染问题
    if (token) {
      dispatch({ type: "currentUser/queryUser", payload: undefined });
    }
    if (!token && pathname !== "/login") {
      history.push("/login");
    }
  }, [token]);
  return props?.children as ReactElement;
}
