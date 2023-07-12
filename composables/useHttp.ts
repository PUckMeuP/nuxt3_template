import { UseFetchOptions } from 'nuxt/app';
// import { RouteLocationRaw } from 'vue-router';
import { ResultEnum } from '~/enums/interface';

interface DefaultResult<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  detailcode: string; // code 200 success 为 false 根据这个detailcode 做具体的逻辑判断
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request);

type HttpOption<T> = UseFetchOptions<DefaultResult<T>>;

interface RequestConfig<T = any> extends HttpOption<T> {
  // 忽略拦截，不走拦截，拥有 responseData，且 code !== 200 的情况下，直接返回 responseData，
  // 但是若无 responseData， 不设置 ignoreGlobalErrorMessage 也会报错
  ignoreCatch?: boolean;
  // 忽略全局错误提示，走拦截，但是任何情况下都不会提示错误信息
  ignoreGlobalErrorMessage?: boolean;
}

const request = async (
  url: UrlType,
  options: RequestConfig<any>
) => {
  // const headers = useRequestHeaders(['cookie']);

  const runtimeConfig = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const { $login } = nuxtApp;
  const { apiBaseUrl } = runtimeConfig.public;
  // 处理用户信息过期
  const hanlerTokenOverdue = async () => {
    const { _route } = nuxtApp;
    await $login(_route?.fullPath);
  };

  // 处理报错异常
  const handlerError = (msg = '服务异常') => {
    if (process.server) {
      showError({ message: msg, statusCode: 500 });
    } else {
      ElMessage.error(msg);
    }
  };
  await nextTick(); //不加这个玩意,刷新页面 接口返回null https://blog.csdn.net/qq_38661597/article/details/129399054
  let { data, error } = await useFetch(`${apiBaseUrl}${url}`, {
    ...options,
  });
  let responseData = data.value
  const { ignoreCatch, ignoreGlobalErrorMessage } = options; // 忽略全局
  if (error.value || !responseData) {
    if (!ignoreGlobalErrorMessage) handlerError();
    return Promise.reject(error.value || '服务响应失败，请稍后重试');
  } else {
    const { code, data, message, success, detailcode } = responseData;//{ code, data, message, success, detailcode }
    // 接口请求成功，直接返回结果 //code =200 && success ==true
    if (code === ResultEnum.SUCCESS ) { 
      if (process.client) {
        ElMessage.success(JSON.stringify(responseData));
      }
      return responseData;
    }
    if (!ignoreCatch) {
      // 接口请求错误，统一处理
      switch (code) {
        case ResultEnum.TOKEN_OVERDUE: // 登录信息过期，去登录
          // 用户信息过期
          await hanlerTokenOverdue();
        default:
          if (!ignoreGlobalErrorMessage) handlerError(message);
          return Promise.reject(message || '服务响应失败，请稍后重试');
      }
    }
  }
};

// 自动导出
export const useDefaultRequest = {
  get: (url: any, options = {}) => {
    return request(url, { method: 'get', ...options });
  },
  post: (url: any, options = {}) => {
    return request(url, { method: 'post', ...options });
  },
};
