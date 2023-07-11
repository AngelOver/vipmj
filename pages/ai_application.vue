<template>
    <main class="main overflow-auto ai-app">
        <div class="w-full pb-20 pt-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 class="mx-auto text-center max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">海量
                    <span class="relative whitespace-nowrap text-blue-600"><svg aria-hidden="true"
                                                                                viewBox="0 0 418 42"
                                                                                class="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                                                                                preserveAspectRatio="none"><path
                        d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg><span
                        class="relative">AI小应用</span></span>便利服务
                    <span class="block mt-5 text-center font-18">为您提供办公、文案、集合一体化.</span>
                    <div class="flex justify-center gap-x-6 mt-3">
                        <NuxtLink
                            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 relative mt-2 md:mt-0"
                            to="/users/product">
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span class="mr-0.5 whitespace-nowrap">创建应用</span></div>
                        </NuxtLink>
                        <NuxtLink
                            v-if="token"
                            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-500 text-white hover:text-slate-100 hover:bg-yellow-400 active:bg-yellow-800 active:text-yellow-100 focus-visible:outline-yellow-600 relative mt-2 md:mt-0"
                            to="/me_application">
                            <div class="flex items-center gap-2">
                                <svg t="1684147730534" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" width="18" height="18"><path d="M512 4.096C231.424 4.096 4.096 231.424 4.096 512s227.328 508.416 508.416 508.416 508.416-227.328 508.416-508.416S792.576 4.096 512 4.096z m0 941.568c-239.616 0-433.664-194.048-433.664-433.664S272.384 78.336 512 78.336s433.664 194.048 433.664 433.664-194.048 433.664-433.664 433.664z" fill="#ffffff" p-id="2968"></path><path d="M596.992 348.672c-35.328 0-66.048 17.408-84.992 44.032-18.944-25.6-49.664-42.496-83.968-42.496-57.856 0-104.448 46.592-104.448 104.448 0 28.16 11.264 53.248 29.184 72.192l1.536 1.536L511.488 686.08l159.232-159.232c18.944-18.944 30.72-45.056 30.72-73.728 0-57.856-46.592-104.448-104.448-104.448z" fill="#ffffff" p-id="2969"></path></svg>
                                <span class="mr-0.5 whitespace-nowrap">我的收藏</span></div>
                        </NuxtLink>
                    </div>
                </h1>

                <div class="mb-10 items-center justify-between pt-5 sm:pt-0 ">

                    <div>
                        <div class="relative flex justify-center">

                            <a-input-search
                                class="w-50"
                                      size="large"
                                   :placeholder="'收录了 '+app_count+' 个应用'"
                                   v-model="search_text"
                                   @keydown.enter.native="search()"
                                      @search="search()"
                            />
                        </div>
                    </div>
                    <div></div>

                </div>
                <div class="mb-4 mt-4">

                    <div class="tags-application sm:block">
                        <a-tag
                            @click="get_all()"
                            size="large"
                            :class="[
                                'mx-1',
                                'cursor-pointer',
                                'mb-2',
                                'rounded',
                                ]"
                            color="#165dff"
                        >
                            全部
                        </a-tag>
                        <a-tag
                            v-for="(tab, tabIdx) in tabs"
                            :key="tabIdx"
                            :class="[
                                tab_active == tab.other ? 'active' : 'hover:active',
                                'mx-1',
                                'cursor-pointer',
                                'mb-2',
                                'rounded',
                                ]"
                            @click="change_tab(tab.other)"
                            :color="tab.color"
                            size="large"
                        >
                            {{ tab.title }}
                        </a-tag>
                    </div>
                </div>

                <a-row v-show="loadings">
                    <a-col :span="6" v-for="sk in 4">
                        <a-skeleton animation
                                    class="mr-4 relative col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg text-center ">
                            <a-skeleton-shape size="large" class="w-100 pb-56 flex flex-1 flex-col p-8"/>
                        </a-skeleton>
                    </a-col>
                </a-row>

                <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    <client-only>
                        <li v-for="(item,index) in applications" v-if="!loadings" :key="index"
                            class="relative col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg bg-white text-center shadow list-animation-leftIn"  :class="'delay-'+index">
                            <div class="absolute top-5 right-5 cursor-pointer">
                                <icon-star class="fs-5 hover:text-yellow-600" @click="ai_collect_send(item.id)"/>
                            </div>

                            <NuxtLink :to="'/app/'+item.id">
                                <div class="flex flex-1 flex-col p-8">
                                    <div
                                        class="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full  text-3xl">
                                        <a-image class="w-100 h-100" :src="item.icon" alt="" />
                                    </div>
                                    <h3 class="mt-6 text-sm font-medium text-gray-900">{{ item.title }}</h3>
                                    <dl class="mt-1 flex flex-grow flex-col justify-between">
                                        <dt class="sr-only">Title</dt>
                                        <dd class="text-sm text-gray-500">{{ item.description }}</dd>
                                        <dd class="mt-3">
                                        <span
                                            v-for="(cate,cate_index) in item.ai_appmeta"
                                            class="rounded-full bg-gray-100 mr-2 px-2 py-1 text-xs font-medium text-gray-800"
                                        >{{ cate.ai_category.title }}</span
                                        >
                                        </dd>
                                    </dl>
                                </div>
                            </NuxtLink>
                            <div>
                                <div class="-mt-px flex divide-x divide-gray-200">
                                    <div class="flex w-0 flex-1">
                                        <button
                                            @click="like_send(item.id)"
                                            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                                 class="h-5 w-5 text-gray-400">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                            </svg>
                                            点赞 {{item.like}}
                                        </button>
                                    </div>

                                    <div class="-ml-px flex w-0 flex-1">
                                        <NuxtLink
                                            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                            :to="'/app/'+item.id">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                                 class="h-5 w-5 text-gray-400">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"></path>
                                            </svg>
                                            运行</NuxtLink></div>
                                </div>
                            </div>
                        </li>
                    </client-only>
                </ul>
                <a-empty class="m-auto w-100" v-show="applications.length==0 && !loadings" description="暂无应用"></a-empty>

                <div class="mt-10 flex justify-center">

                    <a-pagination
                        :current="page"
                        :page-size="limit"
                        class="mr-4 ml-4"
                        background
                        :total="app_count"
                        @change="get_more"
                    />
                </div>
            </div>
            <div class="qas">
                <div class="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                    <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">小应用可以做什么</h2>
                    <p class="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                        问答系统：根据用户提供的问题生成有关某个主题的答案。

                        文本摘要：从长文章中提取关键信息，生成简洁易懂的摘要。

                        语言翻译：将文本从一种语言翻译成另一种语言。

                        代码生成：根据用户提供的描述自动生成代码片段。

                        创意写作：为用户生成短篇或长篇的创意性文本，如故事、博客文章、广告文案等。
                    </p>
                    <div class="mt-20">
                        <dl class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
                            <div v-for="faq in app_qs" :key="faq.id">
                                <dt class="text-base font-semibold leading-7 text-gray-900">{{ faq.title }}</dt>
                                <dd class="mt-2 text-base leading-7 text-gray-600">{{ faq.answer }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Message} from '@arco-design/web-vue'
import {useCounter} from "~/store/counter";
import {
    IconStar
} from '@arco-design/web-vue/es/icon';
const page = ref(1)
const limit = ref(8)
const applications = ref([])
const app_count = ref(0)
const search_text = ref('')
const loadings = ref(false)
const tabs = ref([])
const tab_active=ref()
const counter = useCounter()
const token  = useCookie('token')
useHead({
    title: 'AI小应用 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const get_all = ()=>{
    loadings.value = true
    tab_active.value = ''
    get_all_app({
        page:page.value,
        limit:limit.value
    }).then((res:any)=>{
        applications.value = res._rawValue.data
        app_count.value = res._rawValue.count
        tabs.value=res._rawValue.cate
        loadings.value = false
    }).catch((err:any)=>{
        console.log(err)
    })
}
get_all()

const change_tab = (other:string)=>{
    tab_active.value = other
    loadings.value = true
    get_ai_cate({
        page:page.value,
        limit:limit.value,
        cate:other
    }).then((res:any)=>{
        applications.value = res._rawValue.data
        app_count.value = res._rawValue.count
        loadings.value = false
    }).catch((err:any)=>{
        console.log(err)
    })
}

const search = ()=>{
    loadings.value = true
    tab_active.value = ''
    search_app({
        page:page.value,
        limit:limit.value,
        search_text:search_text.value
    }).then((res:any)=>{
        applications.value = res._rawValue.data
        app_count.value = res._rawValue.count
        loadings.value = false
    }).catch((err:any)=>{
        console.log(err)
    })
}
const get_more = (val: number)=>{
    page.value = val

    if (tab_active.value){
        change_tab(tab_active.value)
    }else {
        get_all()
    }
}
const like_send = (id:string)=>{
    app_like({
        id:id
    }).then((res:any)=>{
        get_all()
        Message.success(res._rawValue.message)
    }).catch((err:any)=>{
        console.log(err)
    })
}
const app_qs = ref([])
const get_qs_start = ()=>{
    get_app_qs().then((res:any)=>{
        app_qs.value = res._rawValue.data
    }).catch((err:any)=>{
        console.log(err)
    })
}
get_qs_start()

const ai_collect_send = (id:string)=>{
    ai_collect({
        id:id
    }).then((res:any)=>{
        get_all()
        Message.success(res._rawValue.message)
    }).catch((err:any)=>{
        console.log(err)
    })
}

</script>

<style>
.w-100-svg svg{
    width: 100%;
}
.is_like{
    fill: #409eff;
    stroke: #409eff;
}
</style>
