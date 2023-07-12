
import VueLazyload from 'vue-lazyload'
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(VueLazyload,
    {
      preLoad: 1.5,
      error: 'https://www.tvcmall.com/_nuxt/1.3.34/assets/pl.svg',
      loading: 'https://www.tvcmall.com/_nuxt/1.3.34/assets/pl.svg',
      attempt: 2,// 加载一屏图片
    }
  )
})