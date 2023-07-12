import Cookies from "js-cookie";
import { history } from 'umi';
import {useDispatch} from 'umi'

import { ReactElement, useEffect } from "react";
interface AuthLayoutProps {
    children?: ReactElement
}
export function AuthLayout (props: AuthLayoutProps): ReactElement {
    const token = Cookies.get("TOKEN")
    if (! token) {
        history.push("/login")
    }
    const dispatch = useDispatch()
    useEffect(() => {
        if(token) {
            dispatch({type: "currentUser/queryUser", payload: undefined})
        }
    }, [token])
    
    return props?.children as ReactElement
}