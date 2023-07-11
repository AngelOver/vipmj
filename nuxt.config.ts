// https://nuxt.com/docs/api/configuration/nuxt-config

import { loadEnv } from 'vite'


export default defineNuxtConfig({
    telemetry: false,
    experimental: {
        watcher: 'chokidar'
    },
    routeRules: {
        // Admin dashboard renders only on client-side
        '/editor/**': { ssr: false },
    },
    app: {

        head: {
           title: '聊天学习交流 - 免费AI问答',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },

            ],
            link: [
                { rel: "icon", href: "/favicon.ico", type: 'image/x-icon'},
            ],
        }
    },
    css: [
        '~/assets/css/style.min.css',
        '~/assets/css/main.css',
    ],
    modules: [

        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@pinia-plugin-persistedstate/nuxt',
    ],

    runtimeConfig: { // 运行时常量
        public:
            { // 客户端-服务的都能访问
                baseUrl: loadEnv(process.argv[process.argv.length - 1], './env').VITE_SERVER_NAME
            }
    },


})
