import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import { Dropdown } from "antd";
import React, { ReactElement } from "react";
import { Link, Outlet, useLocation, useSelector } from "umi";
import defaultSettings from "../../config/defaultSettings";
import routes from "../../config/routes";
import { BodyFooterRender } from "./footer";

const { REACT_APP_ENV } = process.env;

export default function () {
  const { pathname } = useLocation();
  if (pathname === "/login") {
    return <Outlet />;
  }
  const currentUser = useSelector((state: { currentUser: any }) => {
    return state.currentUser;
  });
  const menuItemRender = (
    item: { path: any },
    dom:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  ) => <Link to={{ pathname: item.path }}>{dom}</Link>;
  return (
    <ProLayout
      {...defaultSettings}
      location={{ pathname }}
      layout="mix"
      breadcrumbRender={(routes = []) => {
        return [...routes];
      }}
      menuDataRender={() => routes as MenuDataItem[]}
      menuItemRender={menuItemRender as () => ReactElement}
      menu={{
        collapsedShowGroupTitle: true,
      }}
      avatarProps={{
        size: "small",
        title: currentUser?.user?.username,
        // icon: currentUser?.user?.icon,
        src: currentUser?.user?.icon,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    // icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      footerRender={BodyFooterRender}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
}
