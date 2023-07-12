import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import { Dropdown } from "antd";
import React, { ReactElement } from "react";
import { Link, Outlet, useLocation, useSelector } from "umi";
import routes from "../../config/routes";
export default function () {
  const { pathname } = useLocation();
  if (pathname === "/login") {
    return <Outlet />;
  }
  const currentUser = useSelector((state: { user: any }) => {
    return state.user;
  });
  console.log(currentUser);
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
        title: currentUser?.username,
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
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
}
