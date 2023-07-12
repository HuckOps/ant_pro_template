import { defineConfig } from 'umi';

import routes from './routes';


export default defineConfig({
  dva: {
  },

  // umi routes: https://umijs.org/docs/routing
  routes,
//   layout: {},
  mfsu: {},
  mock: {}
});
