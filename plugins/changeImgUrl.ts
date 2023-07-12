export default defineNuxtPlugin((useNuxtApp) => {
  return {
    provide: {
      changeImgUrl(url: string, size = 220) {
        const runtimeConfig = useRuntimeConfig();
        const { img_url } = runtimeConfig.public;
        let arr = url.split('/')
        let arrtemp = [...arr]
        let imgPre = arrtemp.splice(arrtemp.length - 1).join('/')
        let img = `${size}x${size}_${imgPre}`.replace(/jpg/gi, 'webp')
        return `${img_url}${arrtemp.join('/')}/${img}`
      },
    },
  };
});
