<template>
    <div style="width: 260px; margin-left: 1px;"
                    class="flex h-full flex-col bg-[#fafbfc] chat-message-left"
    >

            <a-space class="p-2  bg-white">
                <a-input-search v-model="qs_input" @search="qs_search" @keydown.enter.native="qs_search" placeholder="搜索..."/>
                <a-button type="primary" @click="check_message(0)">
                    <icon-plus />
                </a-button>

            </a-space>
            <a-spin class="overflow-auto h-full" :loading="left_loding" tip="Loading..">
                <div v-if="messages.length>0" class="chat_list_message p-2 bg-[#fafbfc]">
                    <p class="all_message mb-2 mt-2">
                        <span @click="all_message()" class="py-0 border-0 text-muted" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <icon-refresh class="fs-6 align-text-bottom" />
                        </span>
                        全部消息</p>
                    <ul class="chat-list mb-2">
                        <div class="bot_info">
                            <li class="online list-animation-bottomIn"  :class="[ms_active==item[item.length-1].session_id?'active':'','delay-'+index]"
                                v-for="(item,index) in messages" :key="index">
                                <div class="hover_action">
                                    <a-space>
                                        <icon-edit @click="change_sname(item[item.length-1].session_id)"/>
                                        <a-popconfirm content="此操作将永久删除当前会话,确定要删除吗?"
                                                      @ok="delete_msg(item[item.length-1].session_id)" type="warning">
                                            <icon-delete/>
                                        </a-popconfirm>

                                    </a-space>
                                </div>
                                <div class="card mb-2" @click="check_message(item[item.length-1].session_id)">
                                    <div class="card-body">
                                        <div class="media">
                                            <div class="avatar me-3">
                                                <a-avatar
                                                    v-if="item[item.length-1].icon"
                                                    @click="send_avatar()"
                                                    shape="square"
                                                    :imageUrl="item[item.length-1].icon"
                                                >

                                                </a-avatar>
                                                <a-avatar @click="send_avatar()" v-else>
                                                    <img src="@/assets/images/normal-avatar.png" alt="">
                                                </a-avatar>
                                            </div>
                                            <div class="media-body overflow-hidden">
                                                <div class="d-flex align-items-center mb-1">
                                                    <h6 class="text-truncate mb-0 me-auto" v-if="item[item.length - 1].message_b">{{
                                                            item[item.length - 1].message_b
                                                        }}
                                                    </h6>
                                                    <h6 class="text-truncate mb-0 me-auto" v-else>{{
                                                            item[item.length - 1].question
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
                    <a-modal v-model:visible="avatar_select" title="头像预设" :footer=false>
                        <div class="avatar_preset" v-if="all_avatar_preset.length>0">
                            <a-space class="flex-wrap justify-between">
                                <a-avatar class="cursor-pointer" :size="64" v-for="(a_item,a_index) in all_avatar_preset" :imageUrl="a_item.avatar" width="200" @click="change_avatar(a_item.id)" />
                            </a-space>
                        </div>
                        <a-empty v-else></a-empty>

                    </a-modal>

                </div>
                <a-empty class="message_empty" v-else/>
                <a-pagination
                    size="small"
                    :total="ms_count"
                    :current="page"
                    :page-size="limit"
                    class="justify-content-center mb-2"
                    background
                    simple
                    @change="handleCurrentChange"
                    :hide-on-single-page=true
                />
                <client-only>
                    <a-popconfirm content="此操作将永久删除所有会话,确定要删除吗?" @ok="delete_all" type="warning">
                        <a-button type="primary" class="w-11/12 flex m-auto mb-2">
                            <template #icon>
                                <icon-delete/>
                            </template>
                            <!-- Use the default slot to avoid extra spaces -->
                            <template #default>清空所有对话</template>
                        </a-button>
                    </a-popconfirm>
                </client-only>
            </a-spin>
            <a-modal v-model:visible="beizhu_info" title="修改备注" @ok="handle_send">
                <a-input v-model="beizhu"/>
            </a-modal>


            <client-only>
                <div class="border-t dark:border-t-neutral-800">
                    <div class="p-2 bg-n-6 rounded-xl">
                        <a-trigger :trigger="['click','hover','focus']"  v-if="token">
                            <div class="flex items-center px-2.5 py-2.5 pb-4.5">
                                <div class="relative w-10 h-10">
                                    <a-avatar>
                                        <img
                                            :src="user_info.avatar"
                                            alt="avatar" class="rounded-full w-10 h-10"/>
                                    </a-avatar>
                                    <div
                                        class="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full border-4 border-n-6 bg-green-300 top-1 border-green-300"></div>
                                </div>
                                <div class="ml-1 mr-2">
                                    <div class="base2 font-semibold text-n-1 text-truncate">{{ user_info.name }}</div>
                                    <div class="caption1 font-semibold text-n-3/50 text-truncate">额度:{{ user_info.money }}</div>
                                </div>
                                <div
                                    class="shrnik-0 ml-auto self-start px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip">
                                    {{ vip_level }}
                                </div>
                            </div>
                            <template #content>
                                <div class="nav-wraper">
                                    <div class="user-info-box">
                                        <div class="user-dis">
                                            <a-avatar>
                                                <img
                                                    :src="user_info.avatar"
                                                    alt="avatar" class="rounded-full w-10 h-10"/>
                                            </a-avatar>
                                            <span class="nickname flex-wrap ml-1">
                                                <span>{{ user_info.name }}</span>
                                                <div
                                                    class="shrnik-0 px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip">
                                                    {{ vip_level }}
                                                </div>
                                            </span>
                                        </div>
                                        <div class="use-info user-type"><span class="number">问答 </span><span>{{ last_msg }}/{{total_msg}}次 </span><img src="@/assets/images/today.svg" class="ml-1" alt=""></div>
                                        <div class="use-info user-type"><span class="number">绘画 </span><span>{{ last_draw }}/{{ total_draw }}次 </span><img src="@/assets/images/today.svg" class="ml-1" alt=""></div>
                                        <div class="use-info"><span class="number">额度</span><span>{{ user_info.money }}</span></div>
                                        <div class="quit" @click="quit_out()">
                                            <div name="quit" class="i-svg quit-icon-blue">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <g id="Group 1000007605">
                                                        <rect id="Rectangle 10" x="15.0001" y="9.41418" width="2" height="6"
                                                              rx="1" transform="rotate(-45 15.0001 9.41418)"
                                                              fill="#057cff"></rect>
                                                        <rect id="Rectangle 11" x="19.2427" y="10.8284" width="2" height="6"
                                                              rx="1" transform="rotate(45 19.2427 10.8284)"
                                                              fill="#057cff"></rect>
                                                        <rect id="Rectangle 12" x="19" y="11" width="2" height="11" rx="1"
                                                              transform="rotate(90 19 11)" fill="#057cff"></rect>
                                                        <path id="Rectangle 11218"
                                                              d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17"
                                                              stroke="#057cff" stroke-width="2"
                                                              stroke-linecap="round"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            退出登录
                                        </div>
                                    </div>
                                </div>

                            </template>
                        </a-trigger>
                        <div class="flex items-center px-2.5 py-2.5 pb-4.5" v-else>
                            <div class="relative w-10 h-10">
                                <a-avatar :style="{ backgroundColor: '#3370ff' }">
                                    <IconUser/>
                                </a-avatar>
                                <div
                                    class="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full border-4 border-n-6 bg-green-300 top-1 border-green-300"></div>
                            </div>
                            <div class="ml-1 mr-2">
                                <div class="base2 font-semibold text-n-1 text-truncate">请先登录</div>
                            </div>
                            <div
                                class="shrnik-0 ml-auto self-start px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip">
                                {{ vip_level }}
                            </div>
                        </div>

                        <a-button @click="login_dialog_click()" class="w-full" v-if="!token">
                            用户登录
                        </a-button>
                        <a-button class="w-full" v-else @click="charge()">

                            <div v-if="counter.setting.show_limit_front=='1'">
                                VIP剩余 <a-tag color="arcoblue" class="ml-1 mr-1"> {{ last_msg }}</a-tag>次问答
                            </div>
                            <div v-else>
                                升级会员
                            </div>
                        </a-button>

                    </div>
                </div>
            </client-only>
    </div>
    <div class="main">
        <a-spin :loading="loadins" tip="记录加载loading..">
            <div class="chat-body">
                <div class="chat-header border-bottom md:py-3 sm:py-3 py-2 ">
                        <div class="container-xxl">

                            <div class="row align-items-center">
                                <div class="col-6 col-xl-4 d-flex">
                                    <button @click="change_side()" class="btn sidebar-toggle-btn">
                                        <icon-menu-unfold size="24" />

                                    </button>
                                    <div class="media align-items-center">
                                        <div class="show-user-detail" v-if="ms_active==0">
                                            <a-avatar class="mr-2">
                                                <img
                                                    src="@/assets/images/normal-avatar.png"
                                                    alt="avatar" class="rounded-full w-100"/>
                                            </a-avatar>

                                        </div>
                                        <div class="show-user-detail" v-else>
                                            <a-avatar class="mr-2" >
                                                <img
                                                    v-if="me_message && me_message[0] && me_message[0].icon != null"
                                                    :src="me_message[0].icon"
                                                    alt="avatar" class="rounded-full w-100"/>
                                                <img
                                                    v-else
                                                    src="@/assets/images/normal-avatar.png"
                                                    alt="avatar" class="rounded-full w-100"/>

                                            </a-avatar>

                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">

                                                <h6 class="text-truncate mb-0 me-auto" v-if="ms_active==0">
                                                    {{ counter.setting.bot_name }}</h6>
                                                <h6 class="mobile_width_5rem text-truncate mb-0 me-auto w-40"
                                                    v-if="me_message.length>0">{{ me_message[0].question }} </h6>
                                            </div>
                                            <div class="text-truncate">
                                                <a-space>
                                                    <a-tag color="arcoblue" class="cursor-pointer" @click="dialog_scene=true">
                                                        <template #icon>
                                                            <icon-code />
                                                        </template>
                                                        预设配置
                                                    </a-tag>
                                                    <a-tag color="orange" v-if="me_message.length>0">
                                                        {{ me_message.length*2 }}条消息
                                                    </a-tag>
                                                </a-space>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-6 col-xl-8 text-end">
                                    <ul class="nav justify-content-end align-items-center mobile_show">
                                        <li class="nav-item list-inline-item d-md-block me-2">
                                            <client-only>
                                                <a-dropdown>
                                                    <a class="css-htwhyh nav-link text-muted" data-toggle="pill"
                                                       href="javascript:;">
                                                        <icon-more class="fs-6" />
                                                    </a>

                                                    <template #content>
                                                            <a-doption>
                                                                <a @click="notice=true" data-toggle="pill"
                                                                   class="text-gray-400" href="javascript:;">
                                                                    <icon-notification class="fs-6 align-text-bottom" />
                                                                    公告信息
                                                                </a>
                                                            </a-doption>
                                                        <a-doption v-if="ms_active!=0">
                                                            <a @click="img_download=true" data-toggle="pill"
                                                               class="text-gray-400" href="javascript:;">
                                                                <icon-download class="fs-6 align-text-bottom" />
                                                                导出记录
                                                            </a>
                                                        </a-doption>
                                                            <a-doption>
                                                                <a @click="check_message(ms_active)"
                                                                   class="text-gray-400" data-toggle="pill"
                                                                   href="javascript:;">
                                                                    <icon-refresh class="fs-6 align-text-bottom" />
                                                                    刷新对话
                                                                </a>
                                                            </a-doption>
                                                            <a-doption>
                                                                <a v-if="token" @click="charge()" class=" text-gray-400"
                                                                   data-toggle="pill" href="javascript:;">
                                                                    <icon-command class="fs-6 align-text-bottom" />
                                                                    充值{{
                                                                        counter.setting.money_name_set
                                                                    }}</a>
                                                                <a v-else @click="login_dialog_click()"
                                                                   class="text-gray-400" data-toggle="pill"
                                                                   href="javascript:;">
                                                                    <icon-command class="fs-6 align-text-bottom" />充值{{
                                                                        counter.setting.money_name_set
                                                                    }}</a>

                                                            </a-doption>
                                                    </template>
                                                </a-dropdown>
                                            </client-only>
                                        </li>

                                    </ul>
                                    <ul class="nav justify-content-end align-items-center mobile_none">
                                        <li class="nav-item list-inline-item d-md-block me-2">
                                            <a-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="公告信息"
                                                placement="bottom"
                                            >
                                                <a @click="notice=true" class="css-htwhyh nav-link text-muted"
                                                   data-toggle="pill" href="javascript:;">
                                                    <icon-notification class="fs-6"/>
                                                </a>
                                            </a-tooltip>
                                        </li>
                                        <li class="nav-item list-inline-item d-md-block me-2" v-if="ms_active!=0">
                                            <a-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="保存当前聊天"
                                                placement="bottom"
                                            >
                                                <a @click="img_download=true"
                                                   class="css-htwhyh nav-link text-muted" data-toggle="pill"
                                                   href="javascript:;">
                                                    <icon-download class="fs-6 align-text-bottom" />
                                                </a>
                                            </a-tooltip>
                                        </li>
                                        <li class="nav-item list-inline-item d-md-block me-2">
                                            <a-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="刷新当前聊天"
                                                placement="bottom"
                                            >
                                                <a @click="check_message(ms_active)"
                                                   class="css-htwhyh nav-link text-muted" data-toggle="pill"
                                                   href="javascript:;">
                                                    <icon-refresh class="fs-6 align-text-bottom" />
                                                </a>
                                            </a-tooltip>
                                        </li>
                                        <li class="nav-item list-inline-item d-md-block me-2">
                                            <a-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="充值"
                                                placement="bottom"
                                            >
                                                <a v-if="token" @click="charge()"
                                                   class="nav-link text-muted  css-htwhyh" data-toggle="pill"
                                                   href="javascript:;">
                                                    <icon-command class="fs-6 align-text-bottom" />
                                                </a>
                                                <a v-else @click="login_dialog_click()"
                                                   class="nav-link text-muted  css-htwhyh" data-toggle="pill"
                                                   href="javascript:;">
                                                    <icon-command class="fs-6 align-text-bottom" />
                                                </a>

                                            </a-tooltip>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="chat-content">
                    <div class="pb-32 sm:py-6 relative" ref="poster">

                        <!--no message show-->
                        <div class="flex flex-column">
                            <div class="m-auto rounded-md p-4" v-if="ms_active==0 && me_message.length==0">
                                <h1 class="mb-6 rounded px-4 py-2 text-center text-3xl font-bold">
                                    {{ counter.setting.title }}</h1>
                                <div class="w-full md:min-w-[450px]">
                                    <div>
                                        <!--scene show-->
                                        <div class="wrap_portal">
                                            <a-row class="grid-demo w-100">
                                                <a-col :xs="{span: 24}" :lg="{span: 6}" class="list-animation-leftIn" :class="'delay-'+ocp_index" v-for="(ocp,ocp_index) in scene_p_model">
                                                    <div class="card_b" @click="selectedItem(ocp.Instruction)">
                                                        <div class="card_b__top">
                                                            <a-avatar class="opacity-100"
                                                                      :imageUrl="ocp.icon"
                                                            >
                                                            </a-avatar>
                                                            <h2>{{ ocp.title }}</h2>
                                                        </div>
                                                        <div class="card_b__bottom">
                                                            <h2>{{ ocp.title }}</h2>
                                                            <p class="line-clamp-2">
                                                                {{ ocp.Instruction }}
                                                            </p>
                                                            <p class="line-clamp-5">
                                                                {{ocp.Instruction}}
                                                            </p>
                                                        </div>
                                                        <span class="hover_card_bg" :style="{ 'background-image': `url(${ocp.icon})` }"></span>
                                                    </div>
                                                </a-col>

                                            </a-row>


                                        </div>
                                        <!--scene show end-->
                                        <p class="mt-4 text-center text-sm text-neutral-400">
                                            点击以上话题，快速与我对话</p></div>
                                </div>
                            </div>
                        </div>
                        <!--no message show end-->

                        <div class="container-xxl" v-if="me_message.length>0">
                            <ul class="list-unstyled pt-5">


                                <!--qs-->

                                <div class="message_s" v-for="(item,index) in me_message" :key="index">
                                    <li class="d-flex message right">
                                        <div class="message-body">
                                    <span class="date-time text-muted">{{ item.created_at }}
                                        </span>
                                            <div
                                                class="message-row d-flex align-items-center justify-content-end">
                                                <div class="message-content me_content border p-3" v-html="renderMarkdown(item.question).replace(/\\n/g, '\n')">
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="d-flex message">

                                        <div class="mr-lg-3 me-2">
                                            <a-avatar class="mr-2" >
                                                <img
                                                    v-if="me_message && me_message[0] && me_message[0].icon != null"
                                                    :src="me_message[0].icon"
                                                    alt="avatar" class="rounded-full w-100"/>
                                                <img
                                                    v-else
                                                    src="@/assets/images/normal-avatar.png"
                                                    alt="avatar" class="rounded-full w-100"/>

                                            </a-avatar>
                                        </div>

                                        <div class="message-body">
                                            <span class="date-time text-muted">{{ item.created_at }}</span>
                                            <div class="message-row relative d-flex flex-column align-items-start">

                                                <div class="message-content p-3"
                                                     :class="index==me_message.length-1 && !is_done?'ms-up':''"
                                                     v-html="renderMarkdown(item.message).replace(/\\n/g, '\n')">
                                                </div>
                                                <div class="message_content_footer">
                                                    <a-space class="ml-4">
                                                        <div class="speak btn z-10 new_ant_btn h-30"
                                                             @click="speak_is_audio?stop_speak():speak(item.message.replace(/\\n/g, '\n'))">
                                                            <icon-voice/>
                                                            <span class="ant_hide">{{ speak_is_audio ? '停止' : '朗读' }}</span>

                                                        </div>
                                                        <div class="speak btn z-10 new_ant_btn h-30"
                                                             @click="refresh_answer(item.question)">
                                                            <icon-refresh />
                                                            <span class="ant_hide">重新生成</span>
                                                        </div>
                                                        <div class="speak btn z-10 new_ant_btn h-30"
                                                            @click="handleClick(item.message.replace(/\\n/g, '\n'))">
                                                            <icon-copy />
                                                            <span class="ant_hide">复制答案</span>
                                                        </div>
                                                        <div class="speak btn z-10 new_ant_btn h-30"
                                                            @click="exportWord(item.message.replace(/\\n/g, '\n'))">
                                                            <icon-share-internal />
                                                            <span class="ant_hide">导出Word</span>
                                                        </div>
                                                        <div class="speak btn z-10 new_ant_btn h-30"
                                                            @click="exportPdf(item.message.replace(/\\n/g, '\n'))">
                                                            <icon-download />
                                                            <span class="ant_hide">导出PDF</span>
                                                        </div>
                                                        <a-popconfirm content="此操作将永久删除当条消息,确定要删除吗?"
                                                                      @ok="delete_this(item.id)" type="warning">
                                                            <div class="speak btn z-10 new_ant_btn h-30">
                                                                <icon-delete />
                                                                <span class="ant_hide">删除</span>
                                                            </div>

                                                        </a-popconfirm>


                                                    </a-space>
                                                </div>

                                            </div>
                                        </div>
                                    </li>

                                </div>
                                <!--qs end-->
                            </ul>
                        </div>
                    </div>
                </div>
                    <div class="res_stop text-center mb-2" :class="is_done?'d-none':''" @click="stop_stream()">
                        <a-button>
                            <icon-record-stop class="font-22 mr-2" />
                            停止运行
                        </a-button>
                    </div>
                    <div class="chat-footer border-top py-xl-2 py-lg-2 py-2">
                        <div class="container-xxl">
                            <div class="row">
                                <div class="col-12">
                                    <a-form :model="ruleForm" ref="formRef">
                                        <a-form-item :hide-label=true
                                                     :hide-asterisk=true
                                                     field="message_input"
                                                     validate-trigger="input"
                                        >
                                            <a-textarea placeholder="shift+enter换行"
                                                        v-model="ruleForm.message_input"
                                                        allow-clear

                                                        :auto-size="{
                                                                minRows:1,
                                                                maxRows:4
                                                              }"
                                                        @keydown.enter.native.prevent="counter.setting.no_login_aiqs=='1' && !token? submitFormNoLogin() : submitForm()"
                                                        show-word-limit/>
                                        <a-space>
                                            <a-button
                                                @click="change_online()"
                                                v-if="counter.setting.online_is_open=='1'"
                                                :type="online_open?'primary':'secondary'" :loading="send_loading"
                                                :style="{marginLeft:'10px'}">
                                                <icon-public class="text-lg"/>
                                            </a-button>
                                            <a-button
                                                @click="counter.setting.no_login_aiqs=='1' && !token? submitFormNoLogin() : submitForm()"
                                                type="primary" :loading="send_loading">
                                                <icon-send class="text-lg"/>
                                            </a-button>
                                        </a-space>

                                        </a-form-item>
                                    </a-form>

                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </a-spin>
        </div>
    <a-modal v-model:visible="notice" @ok="save_notice()" :hide-cancel=true ok-text="已查阅">
        <template #title>
            本站公告
        </template>
        <a-skeleton :animation=true v-if="normal_message.length==0">
            <a-space direction="vertical" :style="{width:'100%'}" size="large">
                <a-skeleton-line :rows="3" />
            </a-space>
        </a-skeleton>
        <div v-else>
            <a-timeline>
                <a-timeline-item v-for="(n_t,n_index) in normal_message" :label="n_t.created_at" lineType="dashed" :key="n_index">
                    {{ n_t.title }}
                    <br />
                    <a-typography-text
                        type="secondary"
                        :style="{ fontSize: '12px', marginTop: '4px' }"
                        v-html="n_t.info"
                    >

                    </a-typography-text>
                </a-timeline-item>
            </a-timeline>
        </div>
    </a-modal>
    <a-modal
        v-model:visible="dialog_scene"
        class="mb_dialog"
    >
        <a-modal
            v-model:visible="scene_preset"
            title="场景预设"
            width="30%"
            append-to-body
            class="mb_dialog"
        >
            <a-form :model="SceneForm">
                <a-form-item
                    :hide-label=true
                    :hide-asterisk=true
                    v-for="(domain, index) in SceneForm.domains" :field="`domains[${index}].value`" :key="index">
                    <a-space>
                        <a-select v-model="domain.sel">
                            <a-option
                                v-for="item in domainOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </a-select>
                        <a-textarea auto-size placeholder="预设内容" v-model="domain.value"/>
                        <a-button type="primary" @click="removeDomain(domain)" :style="{marginLeft:'10px'}">
                            <icon-delete />
                        </a-button>

                    </a-space>

                </a-form-item>
            </a-form>
            <div>
                <a-button @click="addDomain">添加场景</a-button>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <a-button type="primary" @click="scene_preset = false">
                        完成
                    </a-button>
                </span>
            </template>
        </a-modal>
        <template #title>
            预设配置
        </template>
        <h6 class="mb-3">模型选择</h6>
        <a-radio-group class="mb-3 flex-wrap" v-model="model_is_select" type="button">
            <a-radio v-for="(mod,mod_index) in model_list" :value="mod.model">{{ mod.title }}</a-radio>

        </a-radio-group>
        <a-collapse class="mb-3 better_preview">
            <template #expand-icon="{ active }">
                <icon-face-smile-fill v-if="active"/>
                <icon-face-frown-fill v-else/>
            </template>
            <a-collapse-item header="高级设置" key="1">
                <template #expand-icon="{ active }">
                    <icon-double-down v-if="active"/>
                    <icon-double-right v-else/>
                </template>
                <div class="normal_setting">
                    <div class="flex items-center justify-between"><div class="w-[150px]"><p>上下文数量</p></div>
                        <div class="flex w-[200px] items-center">
                            <a-slider :default-value="answer_num" v-model="answer_num" :max="15" step="1" :show-ticks=true />

                        </div>
                    </div>
                    <p class="mt-2 text-xs text-slate-500">更多的上下文会使问答有联动性，能够结合上下精准回答</p>
                    <div class="flex items-center justify-between mt-4"><div class="w-[150px]"><p>话题精准度</p></div>
                        <div class="flex w-[200px] items-center">
                            <a-slider :default-value="answer_tem" v-model="answer_tem" :max="2" step="0.1" :show-ticks=true />

                        </div>
                    </div>
                    <p class="mt-2 text-xs text-slate-500">正常数值0.8,数值越高每次回答内容更随机</p>
                </div>
            </a-collapse-item>
        </a-collapse>
        <h6 class="mb-3 flex align-items-center justify-content-between">场景选择
            <a-button type="primary" @click="scene_preset=true">预设场景</a-button>
        </h6>
        <a-input-search v-model="scene_search" placeholder="请输入场景名称" @press-enter="scene_insearch()"
                        @search="scene_insearch()"/>
        <a-list :loading="scene_loading" :bordered=false>
            <a-list-item @click="selectedItem(oc.Instruction)" class="cursor-pointer" v-for="(oc,oc_index) in scene_model"
                         :key="oc_index">
                <a-list-item-meta
                    :title="oc.title"
                    :description="oc.Instruction"
                >
                    <template #avatar>
                        <a-avatar shape="square" :imageUrl="oc.icon">

                        </a-avatar>
                    </template>
                </a-list-item-meta>
            </a-list-item>
            <a-pagination
                class="mt-2"
                :current="s_page"
                :page-size="s_limit"
                background
                hide-on-single-page
                :total="scene_count"
                @change="handleCurrentChangeScene"
            />
            <a-empty v-show="scene_count==0" description="暂无数据"/>
        </a-list>
        <template #footer>
            <span class="dialog-footer">
                <a-button type="primary" @click="dialog_scene = false">
                    配置完成
                </a-button>
            </span>
        </template>
    </a-modal>
        <a-drawer
            v-model:visible="drawer"
            placement="left"
            class="drawer_index"
            unmountOnClose
            :header=false
        >
                <a-space class="p-2  bg-white">
                    <a-input-search v-model="qs_input" @search="qs_search" @keydown.enter.native="qs_search" placeholder="搜索..."/>
                    <a-button type="primary" @click="check_message(0)">
                        <icon-plus />
                    </a-button>

                </a-space>
                <a-spin :loading="left_loding" tip="Loading..">
                    <div v-if="messages.length>0" class="chat_list_message p-2 bg-[#fafbfc]">
                        <p class="all_message mb-2 mt-2">
                            <span @click="all_message()" class="py-0 border-0 text-muted" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <icon-refresh />
                            </span>
                            全部消息</p>
                        <ul class="chat-list mb-2">
                            <div class="bot_info">
                                <li class="online" :class="ms_active==item[item.length-1].session_id?'active':''"
                                    v-for="(item,index) in messages" :key="index">
                                    <div class="hover_action">
                                        <a-space>
                                            <icon-edit @click="change_sname(item[item.length-1].session_id)"/>
                                            <a-popconfirm content="此操作将永久删除当前会话,确定要删除吗?"
                                                          @ok="delete_msg(item[item.length-1].session_id)" type="warning">
                                                <icon-delete/>
                                            </a-popconfirm>

                                        </a-space>
                                    </div>
                                    <div class="card mb-2" @click="check_message(item[item.length-1].session_id)">
                                        <div class="card-body">
                                            <div class="media">
                                                <div class="avatar me-3">
                                                    <a-avatar
                                                        v-if="item[item.length-1].icon"
                                                        @click="send_avatar()"
                                                        shape="square"
                                                        :imageUrl="item[item.length-1].icon"
                                                    >

                                                    </a-avatar>
                                                    <a-avatar v-else>
                                                        <img src="@/assets/images/normal-avatar.png" alt="">
                                                    </a-avatar>
                                                </div>
                                                <div class="media-body overflow-hidden">
                                                    <div class="d-flex align-items-center mb-1">
                                                        <h6 class="text-truncate mb-0 me-auto" v-if="item[item.length - 1].message_b">{{
                                                                item[item.length - 1].message_b
                                                            }}
                                                        </h6>
                                                        <h6 class="text-truncate mb-0 me-auto" v-else>{{
                                                                item[item.length - 1].question
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
                    <a-empty v-else/>
                    <a-pagination
                        size="small"
                        :total="ms_count"
                        :current="page"
                        :page-size="limit"
                        class="justify-content-center mb-2 mt-2"
                        background
                        simple
                        @change="handleCurrentChange"
                        :hide-on-single-page=true
                    />
                    <client-only>
                        <a-popconfirm content="此操作将永久删除所有会话,确定要删除吗?" @ok="delete_all" type="warning">
                            <a-button type="primary" class="w-11/12 flex m-auto mb-2">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                                <!-- Use the default slot to avoid extra spaces -->
                                <template #default>清空所有对话</template>
                            </a-button>
                        </a-popconfirm>
                    </client-only>
                </a-spin>
                <a-modal v-model:visible="beizhu_info" title="修改备注" @ok="handle_send">
                    <a-input v-model="beizhu"/>
                </a-modal>

                <template #footer>
                    <div class="mb-3  dark:border-t-neutral-800">
                        <div class="p-2 bg-n-6 rounded-xl">
                            <a-trigger :trigger="['click','hover','focus']"  v-if="token">
                                <div class="flex items-center px-2.5 py-2.5 pb-4.5">
                                    <div class="relative w-10 h-10">
                                        <a-avatar>
                                            <img
                                                :src="user_info.avatar"
                                                alt="avatar" class="rounded-full w-10 h-10"/>
                                        </a-avatar>
                                        <div
                                            class="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full border-4 border-n-6 bg-green-300 top-1 border-green-300"></div>
                                    </div>
                                    <div class="ml-1 mr-2">
                                        <div class="base2 font-semibold text-n-1 text-truncate">{{ user_info.name }}</div>
                                        <div class="caption1 font-semibold text-n-3/50 text-truncate">额度:{{ user_info.money }}</div>
                                    </div>
                                    <div
                                        class="shrnik-0 ml-auto self-start px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip">
                                        {{ vip_level }}
                                    </div>
                                </div>
                                <template #content>
                                    <div class="nav-wraper">
                                        <div class="user-info-box">
                                            <div class="user-dis">
                                                <a-avatar>
                                                    <img
                                                        :src="user_info.avatar"
                                                        alt="avatar" class="rounded-full w-10 h-10"/>
                                                </a-avatar>
                                                <span class="nickname flex-wrap ml-1">
                                                <span>{{ user_info.name }}</span>
                                                <div
                                                    class="shrnik-0 px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip">
                                                    {{ vip_level }}
                                                </div>
                                            </span>
                                            </div>
                                            <div class="use-info user-type"><span class="number">问答 </span><span>{{ last_msg }}/{{total_msg}}次 </span><img src="@/assets/images/today.svg" class="ml-1" alt=""></div>
                                            <div class="use-info user-type"><span class="number">绘画 </span><span>{{ last_draw }}/{{ total_draw }}次 </span><img src="@/assets/images/today.svg" class="ml-1" alt=""></div>
                                            <div class="use-info"><span class="number">额度</span><span>{{ user_info.money }}</span></div>
                                            <div class="quit" @click="quit_out()">
                                                <div name="quit" class="i-svg quit-icon-blue">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g id="Group 1000007605">
                                                            <rect id="Rectangle 10" x="15.0001" y="9.41418" width="2" height="6"
                                                                  rx="1" transform="rotate(-45 15.0001 9.41418)"
                                                                  fill="#057cff"></rect>
                                                            <rect id="Rectangle 11" x="19.2427" y="10.8284" width="2" height="6"
                                                                  rx="1" transform="rotate(45 19.2427 10.8284)"
                                                                  fill="#057cff"></rect>
                                                            <rect id="Rectangle 12" x="19" y="11" width="2" height="11" rx="1"
                                                                  transform="rotate(90 19 11)" fill="#057cff"></rect>
                                                            <path id="Rectangle 11218"
                                                                  d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17"
                                                                  stroke="#057cff" stroke-width="2"
                                                                  stroke-linecap="round"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                退出登录
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </a-trigger>

                            <div class="flex items-center px-2.5 py-2.5 pb-4.5" v-else>
                                <div class="relative w-10 h-10">
                                    <a-avatar :style="{ backgroundColor: '#3370ff' }">
                                        <IconUser/>
                                    </a-avatar>
                                    <div
                                        class="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full border-4 border-n-6 bg-green-300 top-1 border-green-300"></div>
                                </div>
                                <div class="ml-1 mr-2">
                                    <div class="base2 font-semibold text-n-1 text-truncate">请先登录</div>
                                </div>
                                <div
                                    class="shrnik-0 ml-auto self-start px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip">
                                    {{ vip_level }}
                                </div>
                            </div>
                            <a-button @click="login_dialog_click()" class="w-full" v-if="!token">
                                用户登录
                            </a-button>
                            <a-button class="w-full" @click="charge()">
                                <div v-if="counter.setting.show_limit_front=='1'">
                                    VIP剩余 <a-tag color="arcoblue" class="ml-1 mr-1"> {{ last_msg }}</a-tag>次问答
                                </div>
                                <div v-else>
                                    升级会员
                                </div>
                            </a-button>

                        </div>
                    </div>
                </template>


        </a-drawer>
    <Login :login_dialog="login_dialog" @handleCancel="handleCancel"/>
    <Charge :dialogFormVisible="dialogFormVisible" @handleCancels="handleCancels"/>
    <div class="tongji" v-if="counter.setting.script_tongji" v-html="counter.setting.script_tongji"></div>
    <a-modal v-model:visible="img_download" :footer="false">
        <template #title>
            导出聊天记录
        </template>
        <div class="export_message">
            <div class="flex justify-content-center">
                <a-space>
                    <a-button @click="save_message_img('PNG')" type="primary" status="success">
                        <template #icon>
                            <icon-download/>
                        </template>
                        导出PNG
                    </a-button>
                    <a-button @click="save_message_img('JPG')" type="primary" status="warning">
                        <template #icon>
                            <icon-download/>
                        </template>
                        导出JPG
                    </a-button>
                </a-space>

            </div>

            <div class="main all_message_export">
                <div class="chat-body bg-white border mt-2 h-full">
                    <div class="chat-content overflow-visible">

                        <div class="pb-32 sm:py-6 relative" ref="poster">
                            <a-card hoverable class="m-2">
                                <div
                                    :style="{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                      }"
                                >
      <span
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
      >
          <img src="@/assets/images/normal-avatar.png" alt="" class="mr-2 w-12">
        <a-typography-text>{{ counter.setting.title }}</a-typography-text>

      </span>
                                    <div class="flex flex-column">
                                        <a-tag size="mini" type="outline" class="mb-2">
                                            模型：{{ model_is_select }}
                                        </a-tag>
                                        <a-tag size="mini" type="outline" class="mb-2">
                                            消息：{{ me_message.length*2 }}
                                        </a-tag>
                                        <a-tag size="mini" type="outline" class="mb-2">
                                            时间：{{ me_message.length>0?me_message[me_message.length-1].created_at:'' }}
                                        </a-tag>
                                    </div>
                                </div>
                            </a-card>


                            <div class="container-xxl" v-if="me_message.length>0">
                                <ul class="list-unstyled pt-5">


                                    <!--qs-->

                                    <div class="message_s" v-for="(item,index) in me_message" :key="index">
                                        <li class="d-flex message right">
                                            <div class="message-body">
                                    <span class="date-time text-muted">{{ item.created_at }}
                                        </span>
                                                <div
                                                    class="message-row d-flex align-items-center justify-content-end">
                                                    <div class="message-content me_content border p-3"
                                                         v-html="renderMarkdown(item.question)">
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="d-flex message">

                                            <div class="mr-lg-3 me-2">
                                                <a-avatar class="mr-2">
                                                    <img
                                                        src="@/assets/images/normal-avatar.png"
                                                        alt="avatar" class="rounded-full w-100"/>

                                                </a-avatar>
                                            </div>

                                            <div class="message-body">
                                                <span class="date-time text-muted">{{ item.created_at }}</span>
                                                <div class="message-row relative d-flex flex-column align-items-start">

                                                    <div class="message-content p-3"
                                                         :class="index==me_message.length-1 && !is_done?'ms-up':''"
                                                         v-html="renderMarkdown(item.message).replace(/\\n/g, '\n')">
                                                    </div>

                                                </div>
                                            </div>
                                        </li>

                                    </div>
                                    <!--qs end-->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import {useCounter} from '~/store/counter'
import {ref} from 'vue'

import ClipboardJS from "clipboard";
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import fileSaver from 'file-saver';
import {asBlob} from 'html-docx-js-typescript'
import Speech from 'speak-tts'
import {
    IconEdit,
    IconDelete,
    IconNotification,
    IconSend,
    IconPublic,
    IconUser,
    IconVoice,
    IconCopy,
    IconPlus,
    IconMenuUnfold,
    IconCommand,
    IconRefresh,
    IconCode,
    IconMore,
    IconRecordStop,
    IconDoubleDown,
    IconDoubleRight,
    IconShareInternal,
    IconDownload,

} from '@arco-design/web-vue/es/icon';
import * as htmlToImage from 'html-to-image';
import { toPng,toJpeg} from 'html-to-image';
const img_download = ref(false)
const counter = useCounter()
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
useHead({
    title: counter.setting.title,
    meta: [
        {name: 'description', content: counter.setting.description},
        {name: 'keywords', content: counter.setting.keywords}
    ],

})
const login_dialog = ref(false)
const login_dialog_click = () => {
    login_dialog.value = true
}
const scene_preset = ref(false)
const handleCancel = () => {
    login_dialog.value = false
}
const dialogFormVisible = ref(false)
const charge = () => {
    dialogFormVisible.value = true
}
const handleCancels = () => {
    dialogFormVisible.value = false
}


const token = useCookie('token')
const router = useRouter();
const messages = ref([]) as any
const ms_active = ref(0)
const me_message = ref([]) as any
const loadins = ref(false)
const send_loading = ref(false)
const data_load = ref(false)
const scene_model = ref([]) as any
const m_last = ref({}) as any
const avatar_select = ref(false)
const page = ref(1);
const limit = ref(8);
const ms_count = ref(0)
const left_loding = ref(false)
import {Message} from "@arco-design/web-vue";
const answer_num = ref(3)
const answer_tem = ref(0.8)

const exportPdf = (info: any) => {
    generatePdf({
        content: info
    }).then((res:any)=>{
        const blob = new Blob([res._rawValue], { type: 'application/pdf' })
        // 使用FileSaver.js保存文件并提供下载链接
        saveAs(blob, 'example.pdf')
    })

}

const exportWord = (info: any) => {
    asBlob(info).then((blob: any) => {
        fileSaver.saveAs(blob, 'answer.docx');
    });
}
onMounted(async () => {

    // 先获取数据
    // nextTick保证你的获取到的已转成html的markdown内容已经更新到HTML的DOM结构中了。
    await nextTick()
    //  然后执行高亮即可
    speechInit()

})
const speech = ref()
const all_avatar_preset = ref([])
const get_avatar = () => {
    get_avatar_preset().then((res: any) => {
        all_avatar_preset.value = res._rawValue.data
    })
}
const send_avatar= ()=>{
    avatar_select.value = true
    get_avatar()
}

const change_avatar=  (id:number)=>{
    c_avatar_session({
        avatar_preset_id:id,
        session_id:ms_active.value
    }).then((res: any) => {
        avatar_select.value = false
        Message.success('头像修改成功')
        all_message()
    })
}
const speechInit = () => {
    speech.value = new Speech();
    speech.value.setLanguage('zh-CN');
    speech.value.init().then(() => {

    })
}

const speak_is_audio = ref(false)
const speak = (info: any) => {
    speech.value.cancel()
    speak_is_audio.value = true
    speech.value.speak({text: info,
        listeners: {
            onend: () => {
                speech.value.cancel()
            },
        }}).then(() => {
        speak_is_audio.value = false
        Message.success('语音播放完成')

    })
}

const stop_speak = () => {
    speech.value.cancel()
    speak_is_audio.value = false
}
const code_copy = () => {
    if (process.client) {
        const clipboard = new ClipboardJS('.pre_copy', {
            target: (trigger: any) => {
                return trigger.nextElementSibling
            }
        })
        clipboard.on('success', (e: any) => {
            if (e.trigger.innerText === 'Copy') {
                e.trigger.innerText = 'Copied'
                Message.success('复制成功')
                setTimeout(() => {
                    e.trigger.innerText = 'Copy'
                }, 1000)
            }


        })
        clipboard.on('error', (e: any) => {
            Message.error('复制失败')
        })
    }
}
code_copy()
const last_msg = ref(0)
const last_draw = ref(0)
// 请求左侧列表
const all_message = () => {
    left_loding.value = true
    data_load.value = true
    get_message({
        page: page,
        limit: limit,
    }).then((res: any) => {
        messages.value = res._rawValue.data
        m_last.value = res._rawValue.m_last
        ms_count.value = res._rawValue.count
        max_session.value = res._rawValue.max_session
        left_loding.value = false
        data_load.value = false
    }).catch((err: any) => {
        data_load.value = false
        left_loding.value = false
        console.log(err)
    })
}
const user_info = ref({}) as any
const vip_level = ref('free')
const save_message_img = (ext:any)=>{
    let node = document.querySelector(".all_message_export");
    // 设置node节点overflow:hidden
    if (ext=='PNG'){
        htmlToImage.toPng(<HTMLElement>node,{cacheBust : false,useCorsEverywhereProxy: true})
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'message.png';
                link.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }else{
        htmlToImage.toJpeg(<HTMLElement>node)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'message.jpeg';
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }


}
const total_msg = ref(0)
const total_draw = ref(0)
const get_limit = () => {
    get_user_limit().then((res: any) => {
        last_msg.value = res._rawValue.last_msg
        last_draw.value = res._rawValue.last_draw
        total_msg.value = res._rawValue.total_msg
        total_draw.value = res._rawValue.total_draw
        user_info.value = res._rawValue.user_info
        vip_level.value = res._rawValue.vip_level
    }).catch((err: any) => {
        console.log(err)
    })
}
const quit_out = () => {
    token.value = ''
    router.go(0)
}
if (token.value) {
    all_message()
    get_limit()
}


const max_session = ref(0)
const s_page = ref(1)
const s_limit = ref(4)
const change_status = ref(true)
const model_list = ref([]) as any
const model_is_select = ref()
const scene_p_model = ref([]) as any
const scene_all = () => {
    get_scene_f({
        page: s_page,
        limit: s_limit,
    }).then((res: any) => {
        scene_model.value = res._rawValue.data
        scene_p_model.value = res._rawValue.p_data
        scene_count.value = res._rawValue.count
        model_list.value = res._rawValue.model
        model_is_select.value = res._rawValue.model[0].model
    }).catch((err: any) => {
        console.log(err)
    })
}
scene_all()


const handleCurrentChange = (val: number) => {
    left_loding.value = true
    if (qs_input.value){
        searchs({
            search: qs_input.value,
            page: val,
            limit: limit.value,
        }).then((res: any) => {
            page.value = val
            messages.value = res._rawValue.data
            ms_count.value = res._rawValue.count
            left_loding.value = false
            Message.success('搜索完成')
        }).catch((err: any) => {
            Message.error(err.message)
            left_loding.value = false
        })
    }else{
        get_message({
            page: val,
            limit: limit,
        }).then((res: any) => {
            page.value = val
            messages.value = res._rawValue.data
            ms_count.value = res._rawValue.count
            left_loding.value = false
        }).catch((err: any) => {
            left_loding.value = false
            console.log(err)
        })
    }


}

const delete_this = (id: number) => {
    delete_message({
        id: id
    }).then((res: any) => {
        Message.success('删除成功')
        if (me_message.value.length == 1) {
            ms_active.value = 0
            check_message(ms_active.value)
            all_message()
        }else{
            check_message(ms_active.value)
            all_message()
        }

    }).catch((err: any) => {
        Message.error(err.message)
    })
}
const scene_loading = ref(false)
const handleCurrentChangeScene = (val: number) => {
    scene_loading.value = true
    if (change_status.value) {
        if (scene_search.value) {
            s_page.value = val
            scene_searchs({
                search: scene_search.value,
                page: val,
                limit: s_limit.value
            }).then((res: any) => {
                s_page.value = val
                scene_model.value = res._rawValue.data
                scene_count.value = res._rawValue.count
                Message.success('搜索完成')
                scene_loading.value = false

            }).catch((err: any) => {
                Message.error(err.message)
                scene_loading.value = false

            })
        } else {
            get_scene_f({
                page: val,
                limit: s_limit,
            }).then((res: any) => {
                s_page.value = val
                scene_model.value = res._rawValue.data
                scene_count.value = res._rawValue.count
                scene_loading.value = false
            }).catch((err: any) => {
                console.log(err)
                scene_loading.value = false

            })
        }
        change_status.value = true
    }
}


const handleSizeChange = (val: number) => {
    limit.value = val
    left_loding.value = true
    get_message({
        page: page,
        limit: val,
    }).then((res: any) => {
        messages.value = res._rawValue.data
        ms_count.value = res._rawValue.count
        left_loding.value = false
    }).catch((err: any) => {
        left_loding.value = false
        console.log(err)
    })
}

// 单独请求聊天记录
const check_message = (id: number) => {
    ms_active.value = id
    loadins.value = true
    c_message({
        session_id: id,
    }).then((res: any) => {
        me_message.value = res._rawValue.data
        loadins.value = false
        down_message()
    }).catch((err: any) => {
        loadins.value = false
    })
}
const normal_message = ref([])
const normal_loading = ref(true)
const get_normal_tips = () => {
    get_normal().then((res: any) => {
        normal_message.value = res._rawValue.data
        normal_loading.value = false
    }).catch((err: any) => {
        console.log(err)
    })
}
get_normal_tips()



const is_read = useCookie('is_read', {maxAge: 60 * 60 * 24})

const notice = ref(is_read.value == 'on' || counter.setting.notice_open !='1'? false : true)
const save_notice = () => {
    notice.value = false
    is_read.value = 'on'
}
const down_message = () => {
    setTimeout(() => {
        let chat = document.getElementsByClassName('chat-content')[0]
        chat.style.transition = "500ms"; // 过渡时间为0.5秒
        chat.scrollTo({top: chat.scrollHeight, behavior: 'smooth'});
    }, 100)
}
// 发送消息
const ruleForm = reactive({
    message_input: '',
})

const rules = reactive<FormRules>({
    message_input: [
        {required: true, message: '请输入内容', trigger: 'blur'},
    ],
})
const {public: {baseUrl}} = useRuntimeConfig()


const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const is_done = ref(true)
const streams = ref()
const up_stop = ref('start')
const formRef = ref()

const stop_stream = () => {
    up_stop.value = 'end'
    is_done.value = true
    send_loading.value = false
    ruleForm.message_input = ''
}

const refresh_answer=(qs:any)=>{
    ruleForm.message_input = qs
    if (token.value){
        submitForm()
    }else{
        submitFormNoLogin()
    }

}

const submitForm = async () => {
    if (ruleForm.message_input == '') {
        Message.warning('请输入内容')
        return false
    }
    if (event.shiftKey) {
        // 按下shift键，插入换行符
        ruleForm.message_input += "\n";
        return false;
    }
    if (!token.value) {
        Message.warning('请先登录')
        login_dialog_click()
        return false
    }


    send_loading.value = true
    me_message.value.push({
        "session_id": ms_active.value,
        "question": ruleForm.message_input,
        "message": "思考中...",
    })
    down_message()
    if (online_open.value) {
        chat_online({
            session_id: ms_active.value,
            prompt: ruleForm.message_input,
        }).then((res: any) => {
            me_message.value[me_message.value.length - 1].message = res._rawValue.data
            down_message()
            ruleForm.message_input = ''
            send_loading.value = false
            if (ms_active.value == 0) {
                all_message()
                setTimeout(() => {
                    if (ms_active.value == 0) {
                        ms_active.value = m_last.value.session_id
                    }
                    check_message(ms_active.value)
                }, 2000)
            }
        }).catch((err: any) => {
            me_message.value[me_message.value.length - 1].message = '联网错误'
            down_message()
            send_loading.value = false
        })
    } else {
        const res = await fetch(`${baseUrl}api/send_bot`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                info: ruleForm.message_input,
                session_id: ms_active.value,
                scene_preset: SceneForm.domains,
                model_is_select: model_is_select.value,
                answer_num: answer_num.value,
                answer_tem: answer_tem.value,
            }),

        })

        up_stop.value = 'start'
        if (res){
            me_message.value[me_message.value.length - 1].message=''
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
            me_message.value[me_message.value.length - 1].message = '发送次数已达上限或余额不足'
            Message.error('发送次数已达上限或余额不足')
            return false
        }
        if (res.status == 403) {
            send_loading.value = false
            me_message.value[me_message.value.length - 1].message = '禁止发送违禁词'
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
                        me_message.value[me_message.value.length - 1].message = JSON.parse(arr[i]).error.message
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
                            me_message.value[me_message.value.length - 1].message += content.charAt(i)
                            down_message()
                        }, 1000)
                    }
                }


            }

            for (let i = 0; i < new_arr.length; i++) {
                setTimeout(() => {
                    if (new_arr[i].choices[0].delta.content) {
                        me_message.value[me_message.value.length - 1].message += new_arr[i].choices[0].delta.content
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
                get_limit()
                send_loading.value = false
                ruleForm.message_input = ''
                if (ms_active.value == 0) {
                    all_message()
                    setTimeout(() => {
                        if (ms_active.value == 0) {
                            ms_active.value = m_last.value.session_id
                        }
                        check_message(ms_active.value)
                    }, 2000)
                }
            } else {
                send_loading.value = true
                is_done.value = false
                onData(result!);
                await read();
            }
        };
        await read();
    }


}

const cookie_message = useCookie('message')
if (counter.setting.no_login_aiqs == '1' && !token.value) {
    if (cookie_message.value) {
        me_message.value = cookie_message.value
    }

}

// audio send


// audio send end
const submitFormNoLogin = async () => {
    if (ruleForm.message_input == '') {
        Message.warning('请输入内容')
        return false
    }
    if (event.shiftKey) {
        // 按下shift键，插入换行符
        ruleForm.message_input += "\n";
        return false;
    }

    send_loading.value = true
    me_message.value.push({
        "session_id": ms_active.value,
        "question": ruleForm.message_input,
        "message": "思考中...",
    })
    down_message()

    const res = await fetch(`${baseUrl}api/no_send_bot`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            info: ruleForm.message_input,
            session_id: ms_active.value,
            model_select: model_is_select.value,
            scene_preset: SceneForm.domains,
            answer_tem: answer_tem.value,
        }),

    })

    up_stop.value = 'start'
    if (res){
        me_message.value[me_message.value.length - 1].message=''
    }
    if (res.status == 500) {
        send_loading.value = false
        Message.error('服务器错误')
        return false
    }

    if (res.status == 402) {
        send_loading.value = false
        me_message.value[me_message.value.length - 1].message = '未登录用户提问达到上限,,请登录继续免费使用'
        Message.error('未登录用户提问达到上限,请登录继续免费使用')
        return false
    }
    if (res.status == 403) {
        send_loading.value = false
        me_message.value[me_message.value.length - 1].message = '禁止发送违禁词'
        Message.error('禁止发送违禁词')
        return false
    }
    const stream = res.body?.getReader();
    const onData = ({value}: { value: Uint8Array }) => {
        let result = new TextDecoder().decode(value);
        // console.log(result);
        let arr = result.split('\n\n').map(str => str.replace(/\n/g, ''));
        let new_arr: any[] = [];
        // console.log(arr)
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
                    me_message.value[me_message.value.length - 1].message = JSON.parse(arr[i]).error.message
                }
                streams.value = ''
            }

        }


        // console.log(new_arr)
        for (let i = 0; i < new_arr.length; i++) {
            setTimeout(() => {
                if (new_arr[i].choices[0].delta.content) {
                    me_message.value[me_message.value.length - 1].message += new_arr[i].choices[0].delta.content
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
            send_loading.value = false
            ruleForm.message_input = ''
            cookie_message.value = me_message.value
        } else {
            send_loading.value = true
            is_done.value = false
            onData(result!);
            await read();
        }
    };
    await read();


}

const qs_input = ref('')
const qs_search = () => {
    if (!qs_input.value) {
        Message.warning('请输入内容')
        return
    }
    searchs({
        search: qs_input.value,
        page: page.value,
        limit: limit.value,
    }).then((res: any) => {
        messages.value = res._rawValue.data
        ms_count.value = res._rawValue.count
        Message.success('搜索完成')
    }).catch((err: any) => {
        Message.error(err.message)
    })
}

const handleCommand = (command: any) => {
    ruleForm.message_input = scene_model.value[command].Instruction
}

const delete_msg = (id: number) => {
    del_msg({
        session_id: id,
    }).then((res: any) => {
        Message.success(res._rawValue.message)
        all_message()
        ms_active.value = 0
        me_message.value = []
    }).catch((err: any) => {
        console.log(err)
    })
}

const delete_all = () => {
    del_all().then((res: any) => {
        Message.success(res._rawValue.message)
        all_message()
        ms_active.value = 0
        me_message.value = []
    }).catch((err: any) => {
        console.log(err)
    })
    return true;
}

const handleClick = (command: any) => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', command.replace(/&nbsp;/g, ' '))
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        Message.success('复制成功')
    }
    document.body.removeChild(input)
}

const posterimg = ref();
// 绑定  需要把那个内容生成图片
const poster = ref();




const drawer = ref(false)
const direction = ref('ltr')
const change_side = () => {
    drawer.value = true
}
const dialog_scene = ref(false)
const scene_search = ref('')
const scene_count = ref(0)
const scene_insearch = () => {
    scene_searchs({
        search: scene_search.value,
        page: s_page.value,
        limit: s_limit.value
    }).then((res: any) => {
        scene_model.value = res._rawValue.data
        scene_count.value = res._rawValue.count
        Message.success('搜索完成')
    }).catch((err: any) => {
        Message.error(err.message)
    })
}
const selectedItem = (item: any) => {
    ruleForm.message_input = item
    dialog_scene.value = false
}

const change_sname = (id: number) => {
    beizhu_info.value = true
    ms_active.value = id
}
const beizhu_info = ref(false)
const beizhu = ref('')
const handle_send = () => {
    if (!beizhu.value) {
        Message.warning('请输入内容')
        return true;
    }
    change_session_name(ms_active.value, beizhu.value)
    beizhu.value = ''
}
const change_session_name = (session_id: any, name: any) => {
    c_session_name({
        session_id: session_id,
        session_name: name
    }).then((res: any) => {
        Message.success(res._rawValue.message)
        all_message()
    }).catch((err: any) => {
        Message.error(err.message)
    })
}

const online_open = ref(false)
const change_online = () => {
    online_open.value = !online_open.value
    const text = online_open.value ? '开启' : '关闭'
    Message.success('联网功能' + text + '成功')
}
const formRefScene = ref<FormInstance>()
const SceneForm = reactive<{
    domains: DomainItem[]
}>({
    domains: [
        {
            key: 1,
            value: '',
            sel: 'system',
        },
    ],
})

interface DomainItem {
    key: number
    value: string
    sel: string
}

const domainOptions = [
    {
        value: 'system',
        label: 'system',
    },
    {
        value: 'user',
        label: 'user',
    },
    {
        value: 'assistant',
        label: 'assistant',
    },
]
const removeDomain = (item: DomainItem) => {
    const index = SceneForm.domains.indexOf(item)
    if (index !== -1) {
        SceneForm.domains.splice(index, 1)
    }
}

const addDomain = () => {
    SceneForm.domains.push({
        key: Date.now(),
        value: '',
        sel: 'system',
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
<style>
.v-align {
    vertical-align: -2px;
}
</style>

