<template>
    <div style="width: 260px; margin-left: 1px;"
         class="flex h-full flex-col bg-[#fafbfc] chat-message-left ai_pdf_list"
    >

        <a-space class="p-2  bg-white">
            <a-input-search v-model="qs_input" @search="qs_search" @keydown.enter.native="qs_search" placeholder="搜索..."/>
            <a-button type="primary" @click="check_message(0)" status="danger">
                <icon-plus />
            </a-button>

        </a-space>
        <a-spin class="overflow-auto h-full" :loading="left_loding" tip="Loading..">
            <div v-if="left_list.length>0" class="chat_list_message p-2 bg-[#fafbfc]">

                <p class="all_message mb-2 mt-2">
                        <span @click="get_left_list()" class="py-0 border-0 text-muted" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <icon-refresh class="fs-6 align-text-bottom" />
                        </span>
                    PDF文档
                </p>
                <ul class="chat-list mb-2">
                    <div class="bot_info">
                        <li class="online list-animation-bottomIn"  :class="[now_pdf_id==item[item.length-1].pdf_id?'active':'','delay-'+index]"
                            v-for="(item,index) in left_list" :key="index">
                            <div class="hover_action">
                                <a-space>
                                    <icon-edit @click="change_sname(item[item.length-1].pdf_id)"/>

                                    <a-popconfirm content="此操作将永久删除当前pdf文档,确定要删除吗?"
                                                  @ok="delete_msg(item[item.length-1].pdf_id)" type="warning">
                                        <icon-delete/>
                                    </a-popconfirm>

                                </a-space>
                            </div>
                            <div class="card mb-2" @click="check_message(item[item.length-1].pdf_id)">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <svg t="1688027443507" class="icon w-10 inline h-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2439" width="64" height="64 "><path d="M995.17 246.71v485.97H35.29V246.71c0-118.55 96.1-214.66 214.66-214.66h530.56c118.55 0.01 214.66 96.12 214.66 214.66z" fill="#FDF1F2" p-id="2440"></path><path d="M995.17 732.68v44.59c0 118.56-96.11 214.67-214.66 214.67H249.95c-118.56 0-214.66-96.11-214.66-214.67v-44.59h959.88z" fill="#F04D58" p-id="2441"></path><path d="M344.31 928.24V803.76h46.96c8.26 0 14.58 0.4 18.93 1.19 6.11 1.02 11.24 2.96 15.37 5.82 4.13 2.86 7.46 6.87 9.98 12.02 2.52 5.15 3.78 10.81 3.78 16.98 0 10.59-3.37 19.54-10.1 26.88-6.74 7.33-18.91 11-36.51 11h-31.93v50.61h-16.48z m16.48-65.3h32.18c10.64 0 18.2-1.98 22.67-5.94 4.47-3.96 6.71-9.54 6.71-16.73 0-5.21-1.32-9.67-3.95-13.37-2.63-3.71-6.1-6.16-10.4-7.34-2.77-0.74-7.9-1.1-15.37-1.1h-31.84v44.48zM467.26 928.24V803.76h42.88c9.68 0 17.07 0.59 22.16 1.78 7.13 1.64 13.22 4.61 18.26 8.92 6.57 5.55 11.48 12.64 14.73 21.27 3.25 8.63 4.88 18.5 4.88 29.59 0 9.45-1.1 17.83-3.31 25.13-2.21 7.3-5.04 13.35-8.49 18.13-3.45 4.78-7.23 8.55-11.34 11.29-4.1 2.75-9.06 4.83-14.86 6.24-5.8 1.42-12.47 2.12-20 2.12h-44.91z m16.47-14.69h26.58c8.21 0 14.65-0.76 19.32-2.29s8.39-3.68 11.17-6.45c3.91-3.91 6.95-9.16 9.13-15.75 2.18-6.59 3.27-14.59 3.27-23.99 0-13.02-2.14-23.02-6.41-30.02-4.27-6.99-9.47-11.68-15.58-14.05-4.42-1.7-11.52-2.55-21.31-2.55h-26.15v95.1zM600.65 928.24V803.76h83.98v14.69h-67.5V857h58.42v14.69h-58.42v56.55h-16.48z" fill="#FFFFFF" p-id="2442"></path><path d="M500.21 352.29c-6.1 20.03-14.85 41.39-26.78 64.93-5.3 10.28-11.14 20.01-13.26 28.14l2.92-1.09c33.68-13.25 65.5-20.83 88.57-25.16-3.98-2.71-7.69-5.68-10.87-8.65-15.92-13.8-29.71-33.82-40.58-58.17z m171.83 103.08c-4.51 5.13-12.46 8.11-24.13 8.11-20.16 0-53.03-6.22-79.55-20.02-45.61 5.14-79.55 11.36-106.86 20.29-1.33 0.54-2.92 1.08-4.77 1.89-32.88 57.34-57.28 83.05-78.76 83.05-4.24 0-8.49-1.09-11.67-2.98l-12.73-8.39-0.8-1.35c-1.86-4.87-2.39-9.48-1.33-14.61 2.92-14.33 18.03-37.06 49.85-57.35 5.04-3.8 12.99-8.11 23.6-13.25 7.96-14.07 16.44-30.57 25.46-48.7 13.53-27.86 22.01-55.46 28.64-79.26v-0.27c-9.81-32.73-15.65-52.47-5.83-88.46 2.38-10.28 11.14-20.83 20.95-20.83h6.37c6.1 0 11.93 2.16 16.17 6.49 17.5 17.85 9.28 61.41 0.53 97.38-0.53 1.63-0.8 2.98-1.06 3.79 10.61 30.56 25.72 55.19 42.43 69.25 6.89 5.41 14.59 10.82 23.07 15.7 11.93-1.36 23.33-1.9 34.21-1.9 32.88 0 52.77 5.96 60.46 18.66 2.65 4.34 3.98 9.47 3.18 14.89-0.27 6.77-2.66 13-7.43 17.87z m-10.87-19.22c-2.65-2.7-13.26-9.47-50.38-9.47-1.86 0-3.71 0-6.1 2.71 19.36 8.66 38.18 13.8 50.38 13.8 1.86 0 3.45-0.27 5.04-0.54h1.06c1.33-0.54 2.12-0.81 2.39-3.52-0.54-0.82-1.06-1.9-2.39-2.98z m-243.16 39.5c-5.57 3.25-10.08 6.22-12.73 8.39-18.83 17.58-30.76 35.44-32.08 45.71 11.93-4.05 27.57-21.91 44.81-54.1z m80.08-186.93l1.33-1.09c1.86-8.65 2.65-16.23 4.24-22.18l0.8-4.31c2.65-15.43 2.12-23.27-2.39-29.76l-3.98-1.36c-0.53 0.82-1.33 2.17-1.85 3.25-4.51 11.36-4.25 31.11 1.85 55.45z" fill="#F04D58" p-id="2443"></path></svg>

                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">{{
                                                        item[item.length - 1].title?item[item.length - 1].title:'未命名.pdf'
                                                    }}
                                                </h6>

                                            </div>
                                            <div class="text-truncate h-20" v-html="item[item.length - 1].message.replace(/\n/g, '<br />')"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>

            </div>
            <a-empty class="message_empty" v-else/>
            <a-pagination
                size="small"
                :total="pdf_list_count"
                :current="page"
                :page-size="page_size"
                class="justify-content-center mb-2"
                background
                simple
                @change="handleCurrentChange"
                :hide-on-single-page=true
            />
            <client-only>
                <a-popconfirm content="此操作将永久删除所有PDF,确定要删除吗?" @ok="delete_all" type="warning">
                    <a-button type="primary" status="danger" class="w-11/12 flex m-auto mb-2">
                        <template #icon>
                            <icon-delete/>
                        </template>
                        <!-- Use the default slot to avoid extra spaces -->
                        <template #default>清空所有PDF</template>
                    </a-button>
                </a-popconfirm>
            </client-only>
        </a-spin>
        <client-only>
            <div class="left-panel-footer  p-2">
                <div class="left-panel-footer__tips mb-2">
                    <div class="left-panel-footer__spend-tip"><img
                        src="@/assets/images/jifen.png"
                        class="left-panel-footer__icon mr-2"> 消耗{{ pdf_limit }}额度(共{{ user_balance }}额度)
                    </div>
                    <div class="disclaimer">
                        <div class="disclaimer">
                            <a-tooltip
                                class="box-item"
                                effect="dark"
                                placement="top"
                            >
                                <template #content> 您应当合法合规使用本服务，并承担由此产生的所有责任。<br/>本服务生成的作品仅供个人学习交流使用，不可用于商业用途<br/>对您的使用不做保证且不承担任何责任。
                                </template>
                                <div class="d-sm-flex align-items-center">
                                    <svg role="img" aria-label="warning" focusable="false" data-icon="warning"
                                         aria-hidden="true" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         class="gd_design_icon  gd_design_icon-warning">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.25 14V7H12.75V14H11.25ZM11.25 17V15.5H12.75V17H11.25Z"
                                              fill="currentColor"></path>
                                    </svg>
                                    免责声明
                                </div>

                            </a-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </client-only>


    </div>
    <main class="main overflow-auto ai-pdf">
        <!--header-->
        <div class="ai-header" style="top: 0px; height: 60px;">
            <div class="ai-header__left" @click="change_drawer()">
                <icon-menu-unfold size="24"/>
            </div>
            <div class="ai-header__logo ai-header__logo--mobile"><span><a class="ai-header__link"><img
                :src="counter.setting.logo" style="width: 40px;"></a></span>
            </div>
            <div class="ai-header__right">
                <div class="ai-page__right">
                    <div placement="bottomRight">
                        <div>
                            <div>
                                <a-tooltip class="item" effect="dark" :content="'额度：'+user_balance"
                                           placement="bottom">
                                    <div class="creation"><img
                                        src="@/assets/images/header_jifen.png"
                                        class="creation-count__icon">
                                    </div>
                                </a-tooltip>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="w-full pb-20 pt-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex flex-column align-items-center ">
                <h1 class="mt-10 mb-10">PDF解析工具</h1>
                <a-card hoverable class="upload_card" v-if="now_pdf_id == 0">
                            <a-upload

                                class="avatar-uploader"
                                :action="actions"
                                :show-file-list="false"
                                :headers="{'Authorization': 'Bearer ' + token}"
                                @before-upload="beforeUpload"
                                @success="picSuccess"
                                draggable
                                accept="application/pdf"
                            >
                                <template #upload-button>
                                    <div
                                    >
                                        <div
                                            class="arco-upload-list-picture w-100  h-auto custom-upload-avatar"
                                            v-if="imageUrl"
                                        >
                                            <svg t="1688027443507" class="icon w-16 inline h-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2439" width="128" height="128"><path d="M995.17 246.71v485.97H35.29V246.71c0-118.55 96.1-214.66 214.66-214.66h530.56c118.55 0.01 214.66 96.12 214.66 214.66z" fill="#FDF1F2" p-id="2440"></path><path d="M995.17 732.68v44.59c0 118.56-96.11 214.67-214.66 214.67H249.95c-118.56 0-214.66-96.11-214.66-214.67v-44.59h959.88z" fill="#F04D58" p-id="2441"></path><path d="M344.31 928.24V803.76h46.96c8.26 0 14.58 0.4 18.93 1.19 6.11 1.02 11.24 2.96 15.37 5.82 4.13 2.86 7.46 6.87 9.98 12.02 2.52 5.15 3.78 10.81 3.78 16.98 0 10.59-3.37 19.54-10.1 26.88-6.74 7.33-18.91 11-36.51 11h-31.93v50.61h-16.48z m16.48-65.3h32.18c10.64 0 18.2-1.98 22.67-5.94 4.47-3.96 6.71-9.54 6.71-16.73 0-5.21-1.32-9.67-3.95-13.37-2.63-3.71-6.1-6.16-10.4-7.34-2.77-0.74-7.9-1.1-15.37-1.1h-31.84v44.48zM467.26 928.24V803.76h42.88c9.68 0 17.07 0.59 22.16 1.78 7.13 1.64 13.22 4.61 18.26 8.92 6.57 5.55 11.48 12.64 14.73 21.27 3.25 8.63 4.88 18.5 4.88 29.59 0 9.45-1.1 17.83-3.31 25.13-2.21 7.3-5.04 13.35-8.49 18.13-3.45 4.78-7.23 8.55-11.34 11.29-4.1 2.75-9.06 4.83-14.86 6.24-5.8 1.42-12.47 2.12-20 2.12h-44.91z m16.47-14.69h26.58c8.21 0 14.65-0.76 19.32-2.29s8.39-3.68 11.17-6.45c3.91-3.91 6.95-9.16 9.13-15.75 2.18-6.59 3.27-14.59 3.27-23.99 0-13.02-2.14-23.02-6.41-30.02-4.27-6.99-9.47-11.68-15.58-14.05-4.42-1.7-11.52-2.55-21.31-2.55h-26.15v95.1zM600.65 928.24V803.76h83.98v14.69h-67.5V857h58.42v14.69h-58.42v56.55h-16.48z" fill="#FFFFFF" p-id="2442"></path><path d="M500.21 352.29c-6.1 20.03-14.85 41.39-26.78 64.93-5.3 10.28-11.14 20.01-13.26 28.14l2.92-1.09c33.68-13.25 65.5-20.83 88.57-25.16-3.98-2.71-7.69-5.68-10.87-8.65-15.92-13.8-29.71-33.82-40.58-58.17z m171.83 103.08c-4.51 5.13-12.46 8.11-24.13 8.11-20.16 0-53.03-6.22-79.55-20.02-45.61 5.14-79.55 11.36-106.86 20.29-1.33 0.54-2.92 1.08-4.77 1.89-32.88 57.34-57.28 83.05-78.76 83.05-4.24 0-8.49-1.09-11.67-2.98l-12.73-8.39-0.8-1.35c-1.86-4.87-2.39-9.48-1.33-14.61 2.92-14.33 18.03-37.06 49.85-57.35 5.04-3.8 12.99-8.11 23.6-13.25 7.96-14.07 16.44-30.57 25.46-48.7 13.53-27.86 22.01-55.46 28.64-79.26v-0.27c-9.81-32.73-15.65-52.47-5.83-88.46 2.38-10.28 11.14-20.83 20.95-20.83h6.37c6.1 0 11.93 2.16 16.17 6.49 17.5 17.85 9.28 61.41 0.53 97.38-0.53 1.63-0.8 2.98-1.06 3.79 10.61 30.56 25.72 55.19 42.43 69.25 6.89 5.41 14.59 10.82 23.07 15.7 11.93-1.36 23.33-1.9 34.21-1.9 32.88 0 52.77 5.96 60.46 18.66 2.65 4.34 3.98 9.47 3.18 14.89-0.27 6.77-2.66 13-7.43 17.87z m-10.87-19.22c-2.65-2.7-13.26-9.47-50.38-9.47-1.86 0-3.71 0-6.1 2.71 19.36 8.66 38.18 13.8 50.38 13.8 1.86 0 3.45-0.27 5.04-0.54h1.06c1.33-0.54 2.12-0.81 2.39-3.52-0.54-0.82-1.06-1.9-2.39-2.98z m-243.16 39.5c-5.57 3.25-10.08 6.22-12.73 8.39-18.83 17.58-30.76 35.44-32.08 45.71 11.93-4.05 27.57-21.91 44.81-54.1z m80.08-186.93l1.33-1.09c1.86-8.65 2.65-16.23 4.24-22.18l0.8-4.31c2.65-15.43 2.12-23.27-2.39-29.76l-3.98-1.36c-0.53 0.82-1.33 2.17-1.85 3.25-4.51 11.36-4.25 31.11 1.85 55.45z" fill="#F04D58" p-id="2443"></path></svg>
                                            <div class="flex justify-center">
                                                <p>名称：{{pdf_name}}  |</p>
                                                <span>   大小：{{pdf_size}}KB</span>
                                            </div>

                                            <div class="arco-upload-list-picture-mask">
                                                <IconPlus />
                                            </div>

                                        </div>
                                        <div class="arco-upload-picture-card pl-20 pr-20 h-48" v-else>
                                            <div class="arco-upload-picture-card-text">
                                                <icon-cloud class="fs-2" />
                                                <div>点击或拖拽PDF文件到这进行解析</div>
                                            </div>
                                        </div>
                                    </div>
                                </template>

                            </a-upload>
                    <div class="w-full flex justify-content-center" v-if="imageUrl">
                        <a-space>
                            <a-button type="primary" :loading="generate_load" @click="generatePDF()">
                                <template #icon>
                                    <icon-mosaic />
                                </template>
                                进行解析
                            </a-button>
                            <a-button type="primary" :loading="generate_load" status="danger" @click="deletePic()">
                                <template #icon>
                                    <icon-delete />
                                </template>
                                删除PDF文档
                            </a-button>
                        </a-space>

                    </div>


                </a-card>
            </div>
                <a-spin :loading="content_load">
                    <a-row :gutter="20"  class="mt-2 mb-2" v-if="imageUrl && now_pdf_id!=0">
                        <a-col :xs="{span: 24}" :lg="{span: 12}" class="mb-3">
                            <iframe :src="imageUrl" width="100%" height="600"></iframe>
                        </a-col>
                        <a-col :xs="{span: 24}" :lg="{span: 12}">
                            <a-card :title="pdf_name?pdf_name:'未命名.pdf'" style="min-height: 600px" class="mes_content">
                                <template #extra>
                                    <a-space>
                                        <a-tooltip content="编辑名称">
                                            <a-button type="primary" @click="change_sname(now_pdf_id)">
                                                <template #icon>
                                                    <icon-edit />
                                                </template>
                                            </a-button>
                                        </a-tooltip>
                                        <a-tooltip content="删除当前会话">
                                            <a-popconfirm content="此操作将永久删除当前pdf文档,确定要删除吗?"
                                                          @ok="delete_msg(now_pdf_id)" type="warning">
                                                <a-button type="primary">
                                                    <template #icon>
                                                        <icon-delete />
                                                    </template>
                                                </a-button>
                                            </a-popconfirm>

                                        </a-tooltip>
                                        <a-tooltip content="导出为word">
                                            <a-button type="primary" @click="export_word()">
                                                <template #icon>
                                                    <icon-share-internal />
                                                </template>
                                            </a-button>
                                        </a-tooltip>

                                    </a-space>

                                </template>
                                <a-spin :loading="pdf_generate_end" class="d-flex justify-content-center flex-wrap">
                                        <div class="chat_content p-4">
                                            <div class="chat_message_all">
                                                <div class="message_right_all"  v-for="(mes,mes_index) in now_message" :key="mes_index">
                                                    <div v-if="mes.question" class="chat-message-row list-animation-bottomIn human" :class="['delay'+mes_index]">
                                                        <div class="chat-message" v-html="renderMarkdown(mes.question!=''?mes.question:mes.message)">
                                                        </div>
                                                    </div>
                                                    <div v-if="mes.message" class="chat-message-row list-animation-bottomIn ai" :class="['delay'+mes_index]">
                                                        <div class="chat-message" v-html="renderMarkdown(mes.message!=''?mes.message:'')">
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    <div class="mes_footer position-absolute bottom-0 d-flex w-full p-4">

                                        <a-textarea placeholder="询问pdf相关内容"
                                                    v-model="input_message"
                                                    allow-clear

                                                    :auto-size="{
                                                                minRows:1,
                                                                maxRows:4
                                                              }"
                                                    @keydown.enter.native.prevent="send_pdf()"
                                                    show-word-limit/>
                                        <a-button
                                            class="ml-1"
                                            @click="send_pdf()"
                                            type="primary"
                                            :loading="send_loading"
                                        >
                                            <icon-send class="text-lg"/>
                                        </a-button>
                                    </div>


                                </a-spin>
                            </a-card>
                        </a-col>
                    </a-row>

                </a-spin>
                <a-row :gutter="20" class="mt-4 mb-4">
                    <a-col :xs="{span: 24}" :lg="{span: 8}" v-for="(tip,tip_index) in pdf_tip" :key="tip_index" class="list-animation-leftIn mb-2" :class="'delay'-tip_index">
                        <a-card :title="tip.title" class="shadow-sm">
                            {{
                                tip.description
                            }}
                        </a-card>
                    </a-col>
                </a-row>


            </div>
        </div>

    </main>
    <Login :login_dialog="login_dialog" @handleCancel="handleCancel"/>
    <a-modal v-model:visible="beizhu_info" title="修改名称" @ok="handle_send">
        <a-input v-model="beizhu" placeholder="修改pdf名称"/>
    </a-modal>
    <a-drawer
        v-model:visible="drawer"
        placement="left"
        class="left_pdf"
        width="60%"
        :header=false
    >
        <div
             class="flex h-full flex-col bg-[#fafbfc] ai_pdf_list"
        >

            <a-space class="p-2  bg-white">
                <a-input-search v-model="qs_input" @search="qs_search" @keydown.enter.native="qs_search" placeholder="搜索..."/>
                <a-button type="primary" @click="check_message(0)" status="danger">
                    <icon-plus />
                </a-button>

            </a-space>
            <a-spin class="overflow-auto h-full" :loading="left_loding" tip="Loading..">
                <div v-if="left_list.length>0" class="chat_list_message p-2 bg-[#fafbfc]">

                    <p class="all_message mb-2 mt-2">
                        <span @click="get_left_list()" class="py-0 border-0 text-muted" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <icon-refresh class="fs-6 align-text-bottom" />
                        </span>
                        PDF文档
                    </p>
                    <ul class="chat-list mb-2">
                        <div class="bot_info">
                            <li class="online list-animation-bottomIn"  :class="[now_pdf_id==item[item.length-1].pdf_id?'active':'','delay-'+index]"
                                v-for="(item,index) in left_list" :key="index">
                                <div class="hover_action">
                                    <a-space>
                                        <icon-edit @click="change_sname(item[item.length-1].pdf_id)"/>

                                        <a-popconfirm content="此操作将永久删除当前pdf文档,确定要删除吗?"
                                                      @ok="delete_msg(item[item.length-1].pdf_id)" type="warning">
                                            <icon-delete/>
                                        </a-popconfirm>

                                    </a-space>
                                </div>
                                <div class="card mb-2" @click="check_message(item[item.length-1].pdf_id)">
                                    <div class="card-body">
                                        <div class="media">
                                            <div class="avatar me-3">
                                                <svg t="1688027443507" class="icon w-10 inline h-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2439" width="64" height="64 "><path d="M995.17 246.71v485.97H35.29V246.71c0-118.55 96.1-214.66 214.66-214.66h530.56c118.55 0.01 214.66 96.12 214.66 214.66z" fill="#FDF1F2" p-id="2440"></path><path d="M995.17 732.68v44.59c0 118.56-96.11 214.67-214.66 214.67H249.95c-118.56 0-214.66-96.11-214.66-214.67v-44.59h959.88z" fill="#F04D58" p-id="2441"></path><path d="M344.31 928.24V803.76h46.96c8.26 0 14.58 0.4 18.93 1.19 6.11 1.02 11.24 2.96 15.37 5.82 4.13 2.86 7.46 6.87 9.98 12.02 2.52 5.15 3.78 10.81 3.78 16.98 0 10.59-3.37 19.54-10.1 26.88-6.74 7.33-18.91 11-36.51 11h-31.93v50.61h-16.48z m16.48-65.3h32.18c10.64 0 18.2-1.98 22.67-5.94 4.47-3.96 6.71-9.54 6.71-16.73 0-5.21-1.32-9.67-3.95-13.37-2.63-3.71-6.1-6.16-10.4-7.34-2.77-0.74-7.9-1.1-15.37-1.1h-31.84v44.48zM467.26 928.24V803.76h42.88c9.68 0 17.07 0.59 22.16 1.78 7.13 1.64 13.22 4.61 18.26 8.92 6.57 5.55 11.48 12.64 14.73 21.27 3.25 8.63 4.88 18.5 4.88 29.59 0 9.45-1.1 17.83-3.31 25.13-2.21 7.3-5.04 13.35-8.49 18.13-3.45 4.78-7.23 8.55-11.34 11.29-4.1 2.75-9.06 4.83-14.86 6.24-5.8 1.42-12.47 2.12-20 2.12h-44.91z m16.47-14.69h26.58c8.21 0 14.65-0.76 19.32-2.29s8.39-3.68 11.17-6.45c3.91-3.91 6.95-9.16 9.13-15.75 2.18-6.59 3.27-14.59 3.27-23.99 0-13.02-2.14-23.02-6.41-30.02-4.27-6.99-9.47-11.68-15.58-14.05-4.42-1.7-11.52-2.55-21.31-2.55h-26.15v95.1zM600.65 928.24V803.76h83.98v14.69h-67.5V857h58.42v14.69h-58.42v56.55h-16.48z" fill="#FFFFFF" p-id="2442"></path><path d="M500.21 352.29c-6.1 20.03-14.85 41.39-26.78 64.93-5.3 10.28-11.14 20.01-13.26 28.14l2.92-1.09c33.68-13.25 65.5-20.83 88.57-25.16-3.98-2.71-7.69-5.68-10.87-8.65-15.92-13.8-29.71-33.82-40.58-58.17z m171.83 103.08c-4.51 5.13-12.46 8.11-24.13 8.11-20.16 0-53.03-6.22-79.55-20.02-45.61 5.14-79.55 11.36-106.86 20.29-1.33 0.54-2.92 1.08-4.77 1.89-32.88 57.34-57.28 83.05-78.76 83.05-4.24 0-8.49-1.09-11.67-2.98l-12.73-8.39-0.8-1.35c-1.86-4.87-2.39-9.48-1.33-14.61 2.92-14.33 18.03-37.06 49.85-57.35 5.04-3.8 12.99-8.11 23.6-13.25 7.96-14.07 16.44-30.57 25.46-48.7 13.53-27.86 22.01-55.46 28.64-79.26v-0.27c-9.81-32.73-15.65-52.47-5.83-88.46 2.38-10.28 11.14-20.83 20.95-20.83h6.37c6.1 0 11.93 2.16 16.17 6.49 17.5 17.85 9.28 61.41 0.53 97.38-0.53 1.63-0.8 2.98-1.06 3.79 10.61 30.56 25.72 55.19 42.43 69.25 6.89 5.41 14.59 10.82 23.07 15.7 11.93-1.36 23.33-1.9 34.21-1.9 32.88 0 52.77 5.96 60.46 18.66 2.65 4.34 3.98 9.47 3.18 14.89-0.27 6.77-2.66 13-7.43 17.87z m-10.87-19.22c-2.65-2.7-13.26-9.47-50.38-9.47-1.86 0-3.71 0-6.1 2.71 19.36 8.66 38.18 13.8 50.38 13.8 1.86 0 3.45-0.27 5.04-0.54h1.06c1.33-0.54 2.12-0.81 2.39-3.52-0.54-0.82-1.06-1.9-2.39-2.98z m-243.16 39.5c-5.57 3.25-10.08 6.22-12.73 8.39-18.83 17.58-30.76 35.44-32.08 45.71 11.93-4.05 27.57-21.91 44.81-54.1z m80.08-186.93l1.33-1.09c1.86-8.65 2.65-16.23 4.24-22.18l0.8-4.31c2.65-15.43 2.12-23.27-2.39-29.76l-3.98-1.36c-0.53 0.82-1.33 2.17-1.85 3.25-4.51 11.36-4.25 31.11 1.85 55.45z" fill="#F04D58" p-id="2443"></path></svg>

                                            </div>
                                            <div class="media-body overflow-hidden">
                                                <div class="d-flex align-items-center mb-1">
                                                    <h6 class="text-truncate mb-0 me-auto">{{
                                                            item[item.length - 1].title?item[item.length - 1].title:'未命名.pdf'
                                                        }}
                                                    </h6>

                                                </div>
                                                <div class="text-truncate h-20" v-html="item[item.length - 1].message.replace(/\n/g, '<br />')"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>

                </div>
                <a-empty class="message_empty" v-else/>
                <a-pagination
                    size="small"
                    :total="pdf_list_count"
                    :current="page"
                    :page-size="page_size"
                    class="justify-content-center mb-2"
                    background
                    simple
                    @change="handleCurrentChange"
                    :hide-on-single-page=true
                />
                <client-only>
                    <a-popconfirm content="此操作将永久删除所有PDF,确定要删除吗?" @ok="delete_all" type="warning">
                        <a-button type="primary" status="danger" class="w-11/12 flex m-auto mb-2">
                            <template #icon>
                                <icon-delete/>
                            </template>
                            <!-- Use the default slot to avoid extra spaces -->
                            <template #default>清空所有PDF</template>
                        </a-button>
                    </a-popconfirm>
                </client-only>
            </a-spin>

        </div>
        <template #footer>
            <div class="left-panel-footer  p-2">
                <div class="left-panel-footer__tips mb-2">
                    <div class="left-panel-footer__spend-tip"><img
                        src="@/assets/images/jifen.png"
                        class="left-panel-footer__icon mr-2"> 消耗{{ pdf_limit }}额度(共{{ user_balance }}额度)
                    </div>
                    <div class="disclaimer">
                        <div class="disclaimer">
                            <a-tooltip
                                class="box-item"
                                effect="dark"
                                placement="top"
                            >
                                <template #content> 您应当合法合规使用本服务，并承担由此产生的所有责任。<br/>本服务生成的作品仅供个人学习交流使用，不可用于商业用途<br/>对您的使用不做保证且不承担任何责任。
                                </template>
                                <div class="d-sm-flex align-items-center">
                                    <svg role="img" aria-label="warning" focusable="false" data-icon="warning"
                                         aria-hidden="true" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         class="gd_design_icon  gd_design_icon-warning">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.25 14V7H12.75V14H11.25ZM11.25 17V15.5H12.75V17H11.25Z"
                                              fill="currentColor"></path>
                                    </svg>
                                    免责声明
                                </div>

                            </a-tooltip>
                        </div>
                    </div>
                </div>

            </div>

        </template>

    </a-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
    IconCloud,
    IconDelete,
    IconPlus,
    IconMosaic,
    IconSend, IconEdit, IconRefresh,
    IconShareInternal,
    IconDownload, IconMenuUnfold,
} from "@arco-design/web-vue/es/icon";
import fileSaver from 'file-saver';

import {Message} from "@arco-design/web-vue";
import {useCounter} from '~/store/counter'

import markdownIt from "markdown-it";
import hljs from "highlight.js";
import markdownItKatex from "markdown-it-katex";
import {asBlob} from "html-docx-js-typescript";
const renderMarkdown = (markdown: any) => {
    return markdownIt({
        linkify: true, // 添加linkify插件
        highlight: (str: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value}</code></pre>`
                } catch (__) {
                }
            }

            return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`
        },
        breaks: true // 添加breaks插件
    }).use(markdownItKatex).render(markdown)
}
const token = useCookie('token')

const counter = useCounter()
const actions = counter.setting.APP_URL + '/api/upload_pdf'
useHead({
    title: 'pdf解析 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const imageUrl = ref('')
const pdf_size = ref(0)
const pdf_name = ref('')
const pdf_generate_end = ref(false)
const send_loading = ref(false)
const input_message = ref('')
const pdf_list_count = ref(0)

const generate_load = ref(false)
const now_message = ref([])
const now_pdf_id = ref('')
const login_dialog = ref(false)
const page = ref(1)
const page_size = ref(8)
const qs_input = ref('')
const left_loding = ref(false)
const handleCurrentChange = (val: number) => {
    left_loding.value = true
    page.value = 1
    page.value = val
    if (qs_input.value){
        qs_search()
    }else{
        get_left_list()
    }
}
const qs_search = ()=>{
    // 搜索功能
    left_loding.value = true
    pdf_message_search({
        page:page.value,
        limit:page_size.value,
        qs:qs_input.value
    }).then(res=>{
        pdf_list_count.value = res._rawValue.count
        left_list.value = res._rawValue.data
        left_loding.value = false
    }).catch(err=>{
        console.log(err)
    })
}

const content_load = ref(false)
const check_message=(id:any)=>{
    if (id==0){
        now_pdf_id.value = ''
        imageUrl.value = ''
        return
    }
    content_load.value = true
    pdf_message_check({
        pdf_id:id
    }).then(res=>{
        now_message.value = res._rawValue.data
        imageUrl.value = res._rawValue.info.pdf_url
        pdf_name.value = res._rawValue.info.title
        now_pdf_id.value = id
        content_load.value = false
        down_message()
    }).catch(err=>{
        console.log(err)
        content_load.value = false
    })
}

const beizhu_info = ref(false)
const beizhu = ref('')
const change_sname = (id: string) => {
    beizhu_info.value = true
    now_pdf_id.value = id
}
const handle_send = () => {
    if (!beizhu.value) {
        Message.warning('请输入内容')
        return true;
    }
    c_pdf_title({
        pdf_id: now_pdf_id.value,
        title: beizhu.value
    }).then((res: any) => {
        Message.success(res._rawValue.message)
        get_left_list()
        get_now_pdf_message()
    }).catch((err: any) => {
        Message.error(err.message)
    })
    beizhu.value = ''
}

const delete_msg = (id:any)=>{
    // 删除单条消息
    pdf_message_delete({
        pdf_id:id
    }).then(res=>{
        Message.success('删除成功')
        if (now_pdf_id.value == id){
            check_message(0)
        }
        get_left_list()

    }).catch(err=>{
        console.log(err)
    })
}
const delete_all= ()=>{
    // 删除所有pdf
    pdf_listdel_all().then(res=>{
        Message.success('删除成功')
        left_list.value = []
        check_message(0)
        pdf_list_count.value = 0
    }).catch(err=>{
        console.log(err)
    })
}



const pdf_limit = ref(0)
const user_balance = ref(0)
const get_user_balance = () => {
    get_pdf_limit().then(res => {
        pdf_limit.value = res._rawValue.pdf
        user_balance.value = res._rawValue.data
    })
}
if (token.value) {
    get_user_balance()
}
const drawer = ref(false)
const change_drawer = () => {
    drawer.value = true
}
const picSuccess = (currentFile) => {
    // 获取currentFile里的response的data值
    if (currentFile.response.status != 200) {
        Message.error('上传失败!')
        return
    }
    Message.success('上传成功!')
    imageUrl.value = currentFile.response.data;
    pdf_size.value = currentFile.response.size;
    pdf_name.value = currentFile.response.name;
};


const beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    const isLt2M = file.size / 1024 / 1024 < 10;

    if (!isPDF) {
        Message.error('上传文件只能是 PDF 格式!')
        return false
    }
    if (!isLt2M) {
        Message.error('上传文件大小不能超过 15MB!')
        return false
    }
    if (!token.value) {
        login_dialog.value = true
        Message.error('请先登录!')
        return false
    }
    return true
};
const deletePic = () => {
    imageUrl.value = ''
}

const login_dialog_click = () => {
    login_dialog.value = true
}
const handleCancel = () => {
    login_dialog.value = false
}
const get_left_list = () => {
    left_loding.value = true
    pdf_message_all({
        page: page.value,
        limit: page_size.value,
    }).then((res:any) => {
        left_list.value = res._rawValue.data
        pdf_list_count.value = res._rawValue.count
        left_loding.value = false
    }).catch((err:any) => {
        console.log(err)
        left_loding.value = false
    })
}

const pdf_tip = ref([])

const get_all_gdftip = ()=>{
    pdf_scene().then(res=>{
        pdf_tip.value = res._rawValue.data
    }).catch(err=>{
        console.log(err)
    })
}
get_all_gdftip()
const down_message = () => {
    setTimeout(() => {
        let chat = document.getElementsByClassName('arco-card-body')[0]
        chat.style.transition = "500ms"; // 过渡时间为0.5秒
        chat.scrollTo({top: chat.scrollHeight, behavior: 'smooth'});
    }, 100)
}
const {public: {baseUrl}} = useRuntimeConfig()
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const up_stop = ref('start')
const is_done = ref(true)
const streams = ref()

const export_word = ()=>{
    let info = document.getElementsByClassName('arco-card-body')[0].innerHTML
    asBlob(info).then((blob: any) => {
        fileSaver.saveAs(blob, 'pdf_answer.docx');
    });
}
const send_pdf= async () => {
    if (input_message.value == '') {
        Message.error('请输入内容!')
        return
    }
    if (imageUrl.value == '') {
        Message.error('请先上传PDF文件!')
        return
    }
    if (!token.value) {
        Message.warning('请先登录')
        login_dialog_click()
        return false
    }
    send_loading.value = true


    send_loading.value = true
    now_message.value.push({
        "pdf_id": now_pdf_id.value,
        "question": input_message.value,
        "message": "思考中...",
    })
    down_message()

        const res = await fetch(`${baseUrl}api/send_pdf_ask`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                info: input_message.value,
                pdf_id: now_pdf_id.value,
            }),

        })

        up_stop.value = 'start'
        if (res) {
            now_message.value[now_message.value.length - 1].message = ''
        }
        if (res.status == 500) {
            send_loading.value = false
            Message.error('服务器错误')
            return false
        }
        if (res.status == 401) {
            send_loading.value = false
            Message.error('请先登录')
            return false
        }
        if (res.status == 402) {
            send_loading.value = false
            now_message.value[now_message.value.length - 1].message = '发送次数已达上限或余额不足'
            Message.error('发送次数已达上限或余额不足')
            return false
        }
        if (res.status == 403) {
            send_loading.value = false
            now_message.value[now_message.value.length - 1].message = '禁止发送违禁词'
            Message.error('禁止发送违禁词')
            return false
        }
        let reply_in = false;
        const stream = res.body?.getReader();
        const onData = ({value}: { value: Uint8Array }) => {
            let result = new TextDecoder().decode(value);
            let arr = result.split('\n\n').map(str => str.replace(/\n/g, ''));
            let new_arr: any[] = [];

            for (let i = 0; i < arr.length; i++) {
                is_done.value = false
                if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:')) {
                    new_arr.push(JSON.parse(arr[i].replace('data:', '')));
                } else if (arr[i].startsWith('data:') && arr[i].slice(-2) != ']}') {
                    streams.value = arr[i].replace('data:', '');
                } else if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:') == false) {
                    // 与streams.value拼接成一个字符串
                    let str = streams.value += arr[i]
                    new_arr.push(JSON.parse(str.replace('data:', '')))
                    streams.value = ''
                } else {
                    if (arr[i].includes('"error"')) {
                        now_message.value[now_message.value.length - 1].message = JSON.parse(arr[i]).error.message
                    }
                    streams.value = ''
                }

                if (arr[i].includes('reply_content:')) {
                    reply_in = true;
                }
                if (reply_in) {
                    let replyContent = arr[i];
                    let content = replyContent.substring(14);
                    for (let i = 0; i < content.length; i++) {
                        setTimeout(() => {
                            now_message.value[now_message.value.length - 1].message += content.charAt(i)
                            down_message()
                        }, 1000)
                    }
                }


            }

            for (let i = 0; i < new_arr.length; i++) {
                setTimeout(() => {
                    if (new_arr[i].choices[0].delta.content) {
                        now_message.value[now_message.value.length - 1].message += new_arr[i].choices[0].delta.content
                    }
                    down_message()
                }, 100)

            }

        };


        const read = async () => {
            const result = await stream?.read();
            if (up_stop.value == 'end') {
                console.log('end')
                up_stop.value = 'start'
                stream?.cancel()
                return false;
            }
            if (result?.done) {
                console.log('done')
                is_done.value = true
                get_now_pdf_message()
                send_loading.value = false
                input_message.value = ''
            } else {
                send_loading.value = true
                is_done.value = false
                onData(result!);
                await read();
            }
        };
        await read();

}
const generatePDF = () => {
    if (imageUrl.value == '') {
        Message.error('请先上传PDF文件!')
        return
    }
    generate_load.value = true
    gptpdf_generate({
        pdf_url: imageUrl.value,
    }).then((res:any) => {
        now_pdf_id.value = res._rawValue.pdf_id
        get_now_pdf_message()
        generate_load.value = false
        get_left_list()
    }).catch((err:any) => {
        console.log(err)
        generate_load.value = false
    })
}
if (token.value) {
    get_left_list()
}
const left_list = ref([])

const get_now_pdf_message = () => {
    content_load.value = true
    pdf_message({
        pdf_id: now_pdf_id.value,
    }).then((res:any) => {
        now_message.value = res._rawValue.data
        imageUrl.value = res._rawValue.info.pdf_url
        pdf_name.value = res._rawValue.info.title
        content_load.value = false
    }).catch((err:any) => {
        console.log(err)
        content_load.value = false
    })
}
</script>
