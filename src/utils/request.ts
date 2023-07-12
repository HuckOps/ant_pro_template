/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import type { RequestMethod, RequestResponse, ResponseError } from 'umi-request';
import { extend } from 'umi-request';
import lodash from 'lodash';
import qs from 'qs';
import { message } from 'antd/lib/index';
import type { Options } from '@/utils/typings';

import Cookies from 'js-cookie';

function errorHandler(
  err: ResponseError,
  afterError?: (res: RequestResponse) => any,
  defaultMsg?: string,
): boolean {
  console.log(err);
  console.log(afterError);
  if (lodash.isFunction(afterError)) {
    afterError(err);
  } else if (afterError !== false) {
    // afterError 设置为 false 表示忽略提醒消息
    const msg = lodash.isString(afterError) ? afterError : defaultMsg;
    console.log(err);
    const errData = `${err.data.msg}`;
    message.error(`${msg}! ${errData}`, 5).then(() => {});
  }
  return false;
}

function successHandler<T>(
  res: RequestResponse,
  afterSuccess?: (res: RequestResponse) => any,
  defaultMsg?: string,
) {
  if (!lodash.isBoolean(res) && res) {
    // 有提供 after success 且值为真
    if (lodash.isFunction(afterSuccess)) {
      afterSuccess(res);
      // 提供 after success 则需要弹出提示
    } else if (!lodash.isNil(afterSuccess)) {
      // 优秀使用 afterSuccess 设置的字符串内容，否则使用默认忽略提醒消息
      const msg = lodash.isString(afterSuccess) ? afterSuccess : defaultMsg;
      message.success(msg).then(() => {});
    }
  }
  return res.data as T;
}

const createAuthHeaders = () => {
  return {
    TOKEN: Cookies.get('TOKEN'),
    TENANT: 'test',
  };
};

const createGetRequest =
  (request: RequestMethod<true>) =>
  async <T>(url: string, params?: any, options?: Options): Promise<T | boolean> => {
    const { afterError, afterSuccess, headers, ...restOptions } = options || {};
    try {
      const result: RequestResponse<T> = await request.get(url, {
        ...restOptions,
        params: params,
        headers: {
          // 'X-Auth-Project': project ? project : currentProject,
          ...createAuthHeaders(),
          ...headers,
        },
        // eslint-disable-next-line @typescript-eslint/no-shadow
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      });
      return successHandler<T>(result, afterSuccess, '查询成功！');
    } catch (err) {
      return errorHandler(err as ResponseError, afterError, '查询失败');
    }
  };

const createPostRequest =
  (request: RequestMethod<true>) =>
  async <T>(url: string, payloads?: any, options?: Options): Promise<T | boolean> => {
    const { afterError, afterSuccess, headers, ...restOptions } = options || {};
    try {
      const result: RequestResponse = await request.post(url, {
        ...restOptions,
        data: payloads,
        headers: {
          ...createAuthHeaders(),
          ...headers,
        },
      });

      return successHandler<T>(result, afterSuccess, '添加成功！');
    } catch (err) {
      return errorHandler(err as ResponseError, afterError, '添加失败');
    }
  };

const createPutRequest =
  (request: RequestMethod<true>) =>
  async <T>(url: string, payloads?: any, options?: Options): Promise<T | boolean> => {
    const { afterError, afterSuccess, headers, ...restOptions } = options || {};
    try {
      const result = await request.put(url, {
        ...restOptions,
        data: payloads,
        headers: {
          ...createAuthHeaders(),
          ...headers,
        },
      });
      return successHandler<T>(result, afterSuccess, '更新成功！');
    } catch (err) {
      return errorHandler(err as ResponseError, afterError, '更新失败');
    }
  };

const createPatchRequest =
  (request: RequestMethod<true>) =>
  async <T>(url: string, payloads?: any, options?: Options): Promise<T | boolean> => {
    const { afterError, afterSuccess, headers, ...restOptions } = options || {};
    try {
      const result = await request.patch(url, {
        ...restOptions,
        data: payloads,
        headers: {
          ...createAuthHeaders(),
          ...headers,
        },
      });
      return successHandler<T>(result, afterSuccess, '更新成功！');
    } catch (err) {
      return errorHandler(err as ResponseError, afterError, '更新失败');
    }
  };

const createDeleteRequest =
  (request: RequestMethod<true>) =>
  async <T>(url: string, payloads?: any, options?: Options): Promise<T | boolean> => {
    const { afterError, afterSuccess, headers, ...restOptions } = options || {};
    try {
      const result = await request.delete(url, {
        ...restOptions,
        data: payloads,
        headers: {
          ...createAuthHeaders(),
          ...headers,
        },
      });
      return successHandler<T>(result, afterSuccess, '删除成功！');
    } catch (err) {
      return errorHandler(err as ResponseError, afterError, '删除失败');
    }
  };

export const createRequest = (urlPath: string = '/api/v1') => {
  const prefix = urlPath;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const errorHandler = (error: ResponseError) => {
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      // 服务器没有响应
      // 由于 entrance 采用代理请求的方式，因此在 entrance 的代理接口没有挂的情况下，是不会执行以下逻辑的
      message.error('代理服务器没有响应').then(() => {});
      // eslint-disable-next-line no-console
      console.log('no response >>>', error.message, error.request);
      return false;
    } else {
      // axios 处理请求时的未知错误
      message.error('前端配置错误，请联系管理员').then(() => {});
      // eslint-disable-next-line no-console
      console.log('unspecified error >>>', error.message);
      return false;
    }
  };

  const request = extend({
    prefix,
    errorHandler,
    getResponse: true,
    // credentials: 'include', // Does the default request bring cookies
  });

  return {
    get: createGetRequest(request),
    post: createPostRequest(request),
    put: createPutRequest(request),
    patch: createPatchRequest(request),
    delete: createDeleteRequest(request),
  };
};
