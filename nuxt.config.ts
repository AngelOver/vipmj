// https://nuxt.com/docs/api/configuration/nuxt-config

import { loadEnv } from 'vite'

import prismjs from 'vite-plugin-prismjs'

export default defineNuxtConfig({
    telemetry: false,
    experimental: {
        watcher: 'chokidar'
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
        '~/assets/css/bootstrap-datepicker.min.css',
        '~/assets/fonts/material-icon/css/material-design-iconic-font.min.css',
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
    vite: {
        plugins: [
            prismjs({
                // 添加支持的高亮的语言, 如果需要支持全部的话改成这样:  languages: "all"
                languages: ['cpp',
                    'javascript',
                    'bash',
                    'dart',
                    'sql',
                    'css',
                    'html',
                    'java',
                    'json',
                    'sass',
                    'scss',
                    'c',
                    'log',
                    'swift',
                    'md',
                    'nginx',
                    'yaml',
                    'xml',
                    'shell',
                    'ts'
                ],
                // 配置prism插件 toolbar是后面两个插件依赖的插件.
                // show-language: 显示语言名。
                // copy-to-clipboard: 添加复制代码功能。
                plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
                // 主题名称,支持的主题可以在 node_moduels中安装此库的目录下寻找。
                theme: "tomorrow",
                css: true
            })
        ]
    },
    nitro: {
        devProxy: {
            '/api': {
                target: 'https://vip.littlewheat.com',
                changeOrigin: true,
            },
        }
    },


})
