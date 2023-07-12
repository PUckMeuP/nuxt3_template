// import { FetchUserInfoResp } from './model/UserType';

/**
 * @description: 不提示获取用户信息
 */
// export function selectByUserIdBySlient(params?: any) {
//   return useDefaultRequest.get('/user/selectByUserId', params, {
//     ignoreCatch: true, // 不走统一拦截，一个法外之地的接口
//     ignoreGlobalErrorMessage: true, // 报错不提示
//   });
// }

export function selectByUserId(params?: any) {
  return useDefaultRequest.get('/user/selectByUserId', {params});
}

export function guestLogin() {
  return useDefaultRequest.get('/user/guestlogin', { server: false,pick: ['token']});
}