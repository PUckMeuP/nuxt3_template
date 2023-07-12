import { NuxtConfig } from 'nuxt/config';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: '/style/element/index.css' }, { rel: 'stylesheet', href: '/style/common.css' }],
    }
  },
  devtools: { enabled: false },
  modules: [
    '@element-plus/nuxt',
  ],
  plugins: [
    { src: "@/plugins/vue-lazyload.client", ssr: false }
  ],
  //          // additionalData: `@use "@/assets/scss/element/var.scss" as element;`,
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@import "@/assets/scss/_colors.scss" as *;',
  //       },
  //     },
  //   },
  // },
  elementPlus: {
    importStyle: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      loginUrl: process.env.NUXT_PUBLIC_LOGIN_URL,
      locationOriginUrl: process.env.NUXT_PUBLIC_LOCATION_ORIGIN_URL,
      img_url: process.env.IMG_URL,
    },
  },
} as NuxtConfig)
