import React from "react";
import { AuthLayout } from "./AuthLayout";
import BasicLayout from "./BasicLayout";
export default () => (
  <div
    style={{
      height: "100vh",
    }}
  >
    <AuthLayout>
      <BasicLayout />
    </AuthLayout>
  </div>
);
