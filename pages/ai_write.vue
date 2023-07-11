<template>
    <main class="main overflow-auto ai-write">
        <h1 class="mx-auto text-center max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Ai <span class="relative whitespace-nowrap text-blue-600"><svg aria-hidden="true" viewBox="0 0 418 42"
                                                                           class="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                                                                           preserveAspectRatio="none"><path
            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg><span
            class="relative">写作</span></span>便利服务 <span class="block mt-5 text-center font-18">AI写作便利服务是一种基于人工智能技术的解决方案，旨在为用户提供高效、便捷的写作帮助。该服务通过深度学习和自然语言处理技术，具备智能理解、创作和优化文本的能力。</span>

        </h1>
        <div class="content_tencent m-6">
            <h3 class="mb-3">快速访问</h3>
            <div class="content_card mb-4">
                <a-row :gutter="20">
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2" @click="get_last_id('new')">
                            <a-card hoverable class="bg-white rounded-3">
                                <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                        <img src="@/assets/images/write/text.png" alt="新建文稿" class="mr-3 w-14">
                                        <a-typography-text>
                                            <h5>新建文稿</h5>
                                            <p>新建空白文档进行创作</p>
                                        </a-typography-text>
                                      </span>
                                </div>
                            </a-card>
                    </a-col>
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
                            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('ai_write')">
                                <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/ai_chat.png" alt="Ai快速稿件" class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>AI功能稿</h5>
                                            <p>使用AI功能进行辅助开放思维</p>
                                        </a-typography-text>
                                      </span>
                                </div>
                            </a-card>
                    </a-col>
                </a-row>
            </div>
            <h3 class="mb-3">热门模版</h3>
            <div class="content_mode mb-4">
                <a-row :gutter="20">
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
                            <a-card hoverable class="bg-white rounded-3"  @click="get_last_id('content_change')">
                                <div class="flex items-center justify-between">
                                  <span class="flex item-center">
                                    <img src="@/assets/images/write/content.png" alt="内容修改" class="mr-3 w-14">
                                    <a-typography-text>
                                        <h5>内容修改</h5>
                                        <p>修改某段文章段落内容，保留原意操作</p>
                                    </a-typography-text>
                                  </span>
                                </div>
                            </a-card>
                    </a-col>
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
                            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_long')">
                                <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/content_set.png" alt="句子续写" class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>句子续写</h5>
                                            <p>根据上下文句子延续写作创新</p>
                                        </a-typography-text>
                                      </span>
                                </div>
                            </a-card>
                    </a-col>
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
                            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_color')">
                                <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/style.png" alt="风格润色" class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>风格润色</h5>
                                            <p>修改当前内容的整体写作风格</p>
                                        </a-typography-text>
                                      </span>
                                </div>
                            </a-card>
                    </a-col>
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
                            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_think')">
                                <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/gousi.png" alt="创意故事" class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>创意故事</h5>
                                            <p>帮你构思一个创意</p>
                                        </a-typography-text>
                                      </span>
                                </div>
                            </a-card>
                    </a-col>
                </a-row>
            </div>
            <h3 class="mb-3">最近文件</h3>
            <!--me file-->
            <div class="content_me">
                <a-row :gutter="20" v-if="all_content.length>0">
                    <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2 list-animation-leftIn" :class="'delay-'+index" v-for="(item,index) in all_content" :key="index">
                        <NuxtLink :to="'/editor/'+item.id">
                            <a-card hoverable class="bg-white rounded-3">
                                <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                        <img src="@/assets/images/write/file.png" alt="未命名标题" class="mr-3 w-14">
                                        <a-typography-text>
                                            <h5>{{ item.title?item.title:'未命名' }}</h5>
                                            <p class="text-gray-400">{{ item.created_at }}</p>
                                        </a-typography-text>
                                      </span>
                                    <a-dropdown trigger="hover">
                                        <icon-more/>
                                        <template #content>
                                            <a-doption @click.native="go_now(item.id,'in')"><icon-rotate-right class="mr-1" />当前标签页打开</a-doption>
                                            <a-doption @click.native="go_now(item.id,'out')"><icon-share-internal class="mr-1" />新建标签页打开</a-doption>
                                            <a-doption @click.native="send_name(item.id)"><icon-edit class="mr-1" />重命名</a-doption>
                                            <a-doption @click.native="export_word(item.title,item.content)"><icon-swap class="mr-1" />导出word</a-doption>
                                            <a-doption @click.native="delete_this(item.id)"><icon-delete class="mr-1" />删除</a-doption>
                                        </template>
                                    </a-dropdown>
                                    <a-modal v-model:visible="name_info" title="修改名称" @ok="rename">
                                        <a-input v-model="beizhu" placeholder="输入新的名称"/>
                                    </a-modal>
                                </div>
                            </a-card>

                        </NuxtLink>
                    </a-col>
                </a-row>
                <a-empty v-else></a-empty>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {
    IconMore,
    IconRotateRight,
    IconShareInternal,
    IconEdit,
    IconSwap,
    IconDelete,

} from "@arco-design/web-vue/es/icon"
import {rename_content} from "~/utils/api";
import {Message} from "@arco-design/web-vue";
import {asBlob} from "html-docx-js-typescript";
import fileSaver from 'file-saver';
import {useCounter} from "~/store/counter";
const counter = useCounter()
useHead({
    title: 'AI写作 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const router = useRouter();
const token = useCookie('token');
const get_content_id = ref(0);
const all_content = ref([]);
const get_last_id = (type:any)=>{
    console.log(type)
    get_nowContent().then((res:any)=>{
        get_content_id.value = res._rawValue.data
        if (type=='new'){
            router.push({path: '/editor/'+get_content_id.value.id})
        }else if (type=='ai_write'){
            router.push({path: '/editor/'+get_content_id.value.id,query:{ai_write:'true'}})
        }
        if (type === 'content_change' || type === 'content_long' || type === 'content_color' || type === 'content_think') {
            router.push({
                path: '/editor/' + get_content_id.value.id,
                query: {
                    ai_write: 'true',
                    ai_write_type: type
                }
            });
        }
    }).catch((err:any)=>{
        console.log(err)
    })
}
const go_now = (id:any,type:any)=>{
    if (type=='in'){
        router.push({path: '/editor/'+id})
    }else{
        window.open('/editor/'+id)
    }

}
const now_id  =ref(0)
const name_info = ref(false)
const beizhu = ref('')
const send_name = (id:any)=>{
    now_id.value = id
    name_info.value = true
}
const export_word = (title:any,content:any)=>{
    if (content == null || content == ''){
        Message.error('内容为空')
        return
    }
    asBlob(content).then((blob: any) => {
        fileSaver.saveAs(blob, title?title:'未命名'+'.docx');
    });
}
const delete_this = (id:any) =>{
    delete_content({
        id: id
    }).then((res: any) => {
        Message.success('删除成功')
        get_all_content()
    }).catch((err: any) => {
        console.log(err)
    })
}
const rename = ()=>{
    rename_content({
        id:now_id.value,
        title:beizhu.value
    }).then((res:any)=>{
        Message.success('修改成功')
        get_all_content()
    }).catch((err:any)=>{
        console.log(err)
    })
}
const get_all_content = ()=>{
    get_allContent().then((res:any)=>{
        all_content.value = res._rawValue.data
    }).catch((err:any)=>{
        console.log(err)
    })
}
if (token.value){
    get_all_content()
}
</script>

