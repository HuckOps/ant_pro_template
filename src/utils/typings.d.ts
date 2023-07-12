import { RequestOptionsInit, RequestResponse } from 'umi-request';
interface Options extends RequestOptionsInit {
  headers?: any;
  afterError?: (arg0: RequestResponse) => any;
  afterSuccess?: (arg0: RequestResponse) => any;
}
