import { defineConfig } from "umi";

import proxy from "./proxy";
import routes from "./routes";

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  define: {
    "process.env": process.env,
    "process.version": require("../package.json").version,
  },
  plugins: ["@umijs/plugins/dist/dva"],
  dva: {},

  // umi routes: https://umijs.org/docs/routing
  routes,
  //   layout: {},
  mfsu: {},
  mock: {},
  proxy: proxy[REACT_APP_ENV || "dev"],
});
