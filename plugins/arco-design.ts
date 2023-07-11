import ArcoVue from "@arco-design/web-vue";
// 此处引入css则不需要在nuxt.config.ts配置
import "@arco-design/web-vue/dist/arco.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ArcoVue);
});
