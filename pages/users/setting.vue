<template>
    <div style="width: 260px; margin-left: 1px;"
         class="flex h-full flex-col border-r-blue-200 bg-white person-list-left"
    >
        <div class=" border-0 text-center pt-3 mb-4 p-2">
            <a-skeleton style="width: 240px;margin:0 auto" animation v-show="s_loading">
                <a-skeleton-shape variant="image" style="width: 240px; height: 240px"/>

            </a-skeleton>
            <client-only>
                <div class="card"  v-show="!s_loading">
                    <div class="card-body">
                        <div class="card-user-avatar">
                            <img :src="me_info.avatar" alt="avatar" class="avatar-150">
                            <a-upload
                                class="avatar-uploader"
                                :action="actions"
                                :show-file-list="false"
                                :headers="{'Authorization': 'Bearer ' + token}"
                                @success="onSuccess"
                                @before-upload="beforeUpload"
                            >
                            </a-upload>
                        </div>
                        <div class="card-user-detail mt-4">
                            <h5>{{ me_info.name }}</h5>
                            <span class="text-muted"><div class="__cf_email__">{{ me_info.email }}</div></span>
                            {{ me_info.description }}
                        </div>
                    </div>
                </div>

            </client-only>

        </div>
        <a-descriptions
            bordered
            class="margin-top p-2"
            title="个人信息"
            :column="1"
        >
            <template #extra>
                <a-button :disabled="is_signin" v-if="is_signin">已经签到</a-button>
                <a-button v-else type="primary" @click="go_signin()" :loading="signin_loading">签到</a-button>
            </template>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-mobile/>
                        手机号
                    </div>
                </template>
                {{ me_info.phone ? me_info.phone : '未绑定' }}
            </a-descriptions-item>

            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-relation/>
                        {{ counter.setting.money_name_set }}
                    </div>
                </template>
                ￥ {{ me_info.money }}
            </a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-fire/>
                        会员等级
                    </div>
                </template>
                <a-tag color="blue" size="small">{{ me_vip ? me_vip.title : '免费会员' }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-message/>
                        今日剩余问答
                    </div>
                </template>
                <a-tag color="arcoblue" size="small">{{ last_msg }}</a-tag>
                次
            </a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-highlight/>
                        今日剩余绘画
                    </div>
                </template>
                <a-tag color="orange" size="small" type="success">{{ last_draw }}</a-tag>
                次
            </a-descriptions-item>

        </a-descriptions>
        <div class="flex">
            <a-button type="primary" status="danger" class="m-2 w-100" @click="sigt_out()">
                <icon-import/>
                退出登录
            </a-button>
        </div>
    </div>
    <div class="main">
        <div class="editor-panel">
            <div class="h-100 w-100 setting_mod editor-panel__content">
                <h4 class="bg-white p-2 mb-0 px-xl-5 px-lg-4 px-3 w-100">
                    <a-button shape="round" @click="onCollapse" class="mobile_show mobile_inline">
                        <icon-menu-unfold v-if="collapsed"/>
                        <icon-menu-fold v-else />
                    </a-button>
                    个人中心
                </h4>
                <div class="editor-panel__right-panel">
                    <a-tabs v-model="c_change">
                        <a-tab-pane key="me">
                            <template #title>
                                <icon-user/>
                                个人信息
                            </template>
                            <div class="row">
                                <div class="col-6 a-col-12">
                                    <div class="mb-2">
                                        <div class="card-body">
                                            <div class="index_module_card index_module_card_pw60">
                                                <div class="index-module_header "><span
                                                    class="index-module_title">个人信息</span></div>
                                                <div class="index-module_basic">
                                                    <a-form :model="me_info" class="g-3 ai-form" v-if="!now_loading"
                                                            layout="vertical">
                                                        <a-form-item label="昵称:">
                                                            <a-input placeholder="请输入昵称"
                                                                     v-model="me_info.name"></a-input>
                                                        </a-form-item>
                                                        <a-form-item label="描述:">
                                                            <a-textarea placeholder="请输入个人描述"
                                                                        v-model="me_info.description"
                                                            ></a-textarea>
                                                        </a-form-item>
                                                        <a-button type="primary" @click="update_info()"
                                                                  :loading="up_loading">
                                                            更新信息
                                                        </a-button>
                                                    </a-form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 a-col-12">
                                    <a-modal v-model:visible="change_phone_number" class="phone_dialog"
                                             title="更新手机号">
                                        <a-form :model="phone_form">
                                            <a-form-item label="手机号">
                                                <a-input v-model="phone_form.phone"
                                                         placeholder="请输入手机号" autocomplete="off"/>
                                            </a-form-item>
                                            <a-form-item label="手机验证码">
                                                <a-space>
                                                    <a-input v-model="phone_form.phone_code"
                                                             placeholder="请输入验证码" autocomplete="off">
                                                    </a-input>
                                                    <a-button :loading="send_wait" type="primary"
                                                              @click="send_p_code()">
                                                        {{ send_code_text }}
                                                    </a-button>

                                                </a-space>
                                            </a-form-item>
                                        </a-form>
                                        <template #footer>
                                                          <span class="dialog-footer">
                                                            <a-button type="primary" @click="c_user_phone()">
                                                              提交
                                                            </a-button>
                                                          </span>
                                        </template>
                                    </a-modal>
                                    <a-modal v-model:visible="change_email_code" class="email_dialog"
                                             title="更改邮箱">
                                        <a-form :model="email_form">
                                            <a-form-item label="邮箱">
                                                <a-input v-model="email_form.email" placeholder="请输入新的邮箱"
                                                         autocomplete="off"/>
                                            </a-form-item>
                                            <a-form-item label="邮箱验证码">
                                                <a-space>
                                                    <a-input v-model="email_form.email_code"
                                                             placeholder="请输入验证码" autocomplete="off">
                                                    </a-input>
                                                    <a-button :loading="send_wait" type="primary"
                                                              @click="send_e_code()">
                                                        {{ send_code_text }}
                                                    </a-button>
                                                </a-space>

                                            </a-form-item>
                                        </a-form>
                                        <template #footer>
                                                          <span class="dialog-footer">
                                                             <a-button type="primary" @click="c_user_email()">
                                                              提交
                                                            </a-button>
                                                          </span>
                                        </template>
                                    </a-modal>
                                    <!--new mode-->
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">基本设置</span></div>
                                            <div class="index-module_basic">
                                                <div class="index_module_cardItem">
                                                    <div class="index-module_svgIcon"><img
                                                        src="@/assets/images/phone_verify.svg"
                                                        alt=""></div>
                                                    <div class="index-module_info">
                                                        <div class="index-module_infoTop"><span
                                                            class="index-module_label">安全手机</span><span
                                                            class="index-module_bind" v-if="me_info.phone">
                                                                            <img
                                                                                src="@/assets/images/success.svg"
                                                                                alt="">

                                                                            <span>已绑定</span>
                                                                        </span>
                                                            <span class="index-module_unbind" v-else>
                                                                            <img
                                                                                src="@/assets/images/warning.svg"
                                                                                alt="">
                                                                            <span>未绑定</span>
                                                                        </span>
                                                        </div>
                                                        <div class="index-module_desc"><span
                                                            class="index-module_desc">{{
                                                                me_info.iphone
                                                            }}</span>
                                                            可用于身份验证、密码找回、通知接收
                                                        </div>
                                                    </div>
                                                    <div class="index-module_btnWrap">
                                                        <a-button
                                                            @click="change_phone_number = true"
                                                            class="index-module_btn"
                                                            :type="me_info.iphone?'secondary':'primary'"
                                                        ><span>{{ me_info.iphone ? '修改' : '绑定' }}</span>
                                                        </a-button>
                                                    </div>
                                                </div>
                                                <div class="index_module_cardItem">
                                                    <div class="index-module_svgIcon"><img
                                                        src="@/assets/images/email_verify.svg"
                                                        alt=""></div>
                                                    <div class="index-module_info">
                                                        <div class="index-module_infoTop"><span
                                                            class="index-module_label">安全邮箱</span>
                                                            <span
                                                                class="index-module_bind" v-if="me_info.email">
                                                                            <img
                                                                                src="@/assets/images/success.svg"
                                                                                alt="">

                                                                            <span>已绑定</span>
                                                                        </span>
                                                            <span class="index-module_unbind" v-else>
                                                                            <img
                                                                                src="@/assets/images/warning.svg"
                                                                                alt="">
                                                                            <span>未绑定</span>
                                                                        </span>
                                                        </div>
                                                        <div class="index-module_desc"><span
                                                            class="index-module_desc"></span>
                                                            {{ me_info.email }}邮箱可用于身份验证、密码找回、通知接收
                                                        </div>
                                                    </div>
                                                    <div class="index-module_btnWrap">
                                                        <a-button
                                                            @click="change_email_code = true"
                                                            class="index-module_btn"
                                                            :type="me_info.email?'secondary':'primary'"
                                                        ><span>{{ me_info.email ? '修改' : '绑定' }}</span>
                                                        </a-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-6 a-col-12">
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">更改密码</span></div>
                                            <div class="index-module_basic">
                                                <a-form :model="pass_all" class="g-3 ai-form" layout="vertical">
                                                    <a-form-item label="旧密码:">
                                                        <a-input placeholder="请输入旧密码"
                                                                 v-model="pass_all.old_password"></a-input>
                                                    </a-form-item>
                                                    <a-form-item label="新密码:">
                                                        <a-textarea placeholder="请输入新密码"
                                                                    v-model="pass_all.new_password"
                                                        ></a-textarea>
                                                    </a-form-item>
                                                    <a-form-item label="确认新密码:">
                                                        <a-textarea placeholder="请二次输入新密码"
                                                                    v-model="pass_all.new_password_confirmation"
                                                        ></a-textarea>
                                                    </a-form-item>
                                                    <a-button type="primary" @click="c_pass()"
                                                              :loading="pass_loading">
                                                        修改密码
                                                    </a-button>
                                                </a-form>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-6 a-col-12" v-if="counter.setting.three_login_open=='1'">
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">绑定第三方</span></div>
                                            <div class="index-module_basic">
                                                <div class="index_module_cardItem">
                                                    <div class="index-module_svgIcon"><img
                                                        src="@/assets/images/wechat_bind.png"
                                                        alt=""></div>
                                                    <div class="index-module_info" v-if="counter.setting.wechat_login=='1'">
                                                        <div class="index-module_infoTop"><span
                                                            class="index-module_label">微信登录</span>
                                                            <span
                                                                class="index-module_bind" v-if="me_info.openid">
                                                                            <img
                                                                                src="@/assets/images/success.svg"
                                                                                alt="">

                                                                            <span>已绑定</span>
                                                                        </span>
                                                            <span class="index-module_unbind" v-else>
                                                                            <img
                                                                                src="@/assets/images/warning.svg"
                                                                                alt="">
                                                                            <span>未绑定</span>
                                                                        </span>
                                                        </div>
                                                        <div class="index-module_desc"><span
                                                            class="index-module_desc"></span>
                                                            绑定微信快速登录，用户在第三方网站或应用中点击微信登录按钮
                                                        </div>
                                                    </div>
                                                    <div class="index-module_btnWrap">
                                                        <a-button
                                                            @click="me_info.openid?'':change_dialog_click()"
                                                            class="index-module_btn"
                                                            :type="me_info.openid?'secondary':'primary'"
                                                        ><span>{{ me_info.openid ? '已绑定' : '绑定' }}</span>
                                                        </a-button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="wallet">
                            <template #title>
                                <icon-translate/>
                                钱包
                            </template>
                            <div class="row">

                                <div class="col-12 col-md-6">
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">{{ counter.setting.money_name_set }}</span></div>
                                            <div class="index-module_basic">
                                                <div class="row align-items-end">
                                                    <div class="col">
                                                        <span class="h3 mb-0">{{ me_info.money }}</span>
                                                    </div>
                                                    <div class="col-auto">
                                                        <a-button
                                                            type="primary"
                                                            v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1"
                                                            @click="charge()">充值
                                                        </a-button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">卡密兑换</span></div>
                                            <div class="index-module_basic">
                                                <div class="row align-items-end">
                                                    <div class="col">
                                                            <span class="h3 mb-0">
                                                        <a-input v-model="kami_code"
                                                                 placeholder="请填写卡密信息"></a-input>
                                                    </span>
                                                    </div>
                                                    <div class="col-auto">
                                                        <a-space>
                                                            <a :href="counter.setting.buy_card"
                                                               class="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-medium arco-btn-status-success"
                                                               target="_blank"
                                                            >购买卡密</a>
                                                            <a-button :loading="kami_loading" type="primary"
                                                                      @click="change_code()">兑换
                                                            </a-button>
                                                        </a-space>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="pb-10">
                                        <div class="card-body">
                                            <h4 class="round-arcoblue">购买订单</h4>
                                            <a-table :data="tableData" bordered stripe>
                                                <template #columns>
                                                    <a-table-column data-index="created_at" title="时间"/>
                                                    <a-table-column data-index="order_id" title="订单编号"/>
                                                    <a-table-column data-index="amount"
                                                                    :title="counter.setting.money_name_set"/>
                                                    <a-table-column title="支付状态">
                                                        <template #cell="{ record }">
                                                            {{ record.status == '0' ? '未支付' : '已支付' }}
                                                        </template>

                                                    </a-table-column>
                                                    <a-table-column title="支付方式">
                                                        <template #cell="{ record }">
                                                            {{ record.way == 'wechat' ? '微信支付' : '支付宝支付' }}
                                                        </template>
                                                    </a-table-column>
                                                </template>
                                            </a-table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="pb-10">

                                        <div class="card-body">
                                            <h4 class="round-arcoblue">消耗总览</h4>

                                            <a-table :data="consum" bordered stripe>
                                                <template #columns>
                                                    <a-table-column data-index="id" title="编号"/>
                                                    <a-table-column  title="消耗额度">
                                                        <template #cell="{ record }">
                                                            <a-tag color="arcoblue">{{record.balance?record.balance:'无'}}</a-tag>
                                                        </template>
                                                    </a-table-column>
                                                    <a-table-column  title="消耗次数">
                                                        <template #cell="{ record }">
                                                            <a-tag color="green">{{record.limit?record.limit:'无'}}</a-tag>
                                                        </template>
                                                    </a-table-column>
                                                    <a-table-column  title="类型">
                                                        <template #cell="{ record }">
                                                            {{ consum_type(record.type) }}
                                                        </template>
                                                    </a-table-column>
                                                    <a-table-column data-index="notes" title="描述"/>

                                                    <a-table-column data-index="created_at" title="时间"/>

                                                </template>
                                            </a-table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-tab-pane>

                        <a-tab-pane key="vip">
                            <template #title>
                                <icon-layers/>
                                VIP会员
                            </template>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">总览</span></div>
                                            <div class="index-module_basic">
                                                <div class="row align-items-end">
                                                    <a-descriptions :column="{xs:1, md:3, lg:4}">
                                                        <a-descriptions-item label="会员等级">
                                                            <a-tag color="arcoblue">{{
                                                                    me_vip ? me_vip.title : '免费会员'
                                                                }}
                                                            </a-tag>
                                                        </a-descriptions-item>
                                                        <a-descriptions-item label="到期时间">
                                                            <a-tag color="green">{{
                                                                    me_vip ? me_vip.expire_time : '永久'
                                                                }}
                                                            </a-tag>
                                                        </a-descriptions-item>
                                                        <a-descriptions-item label="今日总问答">
                                                            <a-tag color="blue">{{
                                                                    me_vip ? me_vip.limit_send : 0
                                                                }}
                                                            </a-tag>
                                                        </a-descriptions-item>
                                                        <a-descriptions-item label="今日剩余问答">
                                                            <a-tag color="blue">{{ last_msg }}</a-tag>
                                                        </a-descriptions-item>
                                                        <a-descriptions-item label="今日总绘画">
                                                            <a-tag color="orange">{{
                                                                    me_vip ? me_vip.limit_draw : 0
                                                                }}
                                                            </a-tag>
                                                        </a-descriptions-item>
                                                        <a-descriptions-item label="今日剩余绘画">
                                                            <a-tag color="orange">{{ last_draw }}</a-tag>
                                                        </a-descriptions-item>
                                                    </a-descriptions>
                                                    <div class="col-auto">
                                                        <a-button
                                                            type="primary"
                                                            @click="up_vip_dialog()"
                                                            v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1"
                                                        >升级
                                                        </a-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="card-body">
                                        <div class="module-privilege mb-2">
                                            <ul class="privilege-ul name-ul">
                                                <li class="privilege-item first-item">
                                                    <p class="title">
                                                        <span>功能特权</span>
                                                    </p>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    <a>描述</a>
                                                </li>
                                                <li class="privilege-item">
                                                    <a>价格</a>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    <a>每天限制问答次数</a>
                                                </li>
                                                <li class="privilege-item">
                                                    <a>每天限制绘画次数</a>
                                                </li>
                                                <li class="privilege-item">
                                                    <a>天数</a>
                                                </li>
                                            </ul>
                                            <ul class="privilege-ul vip-ul " v-for="(vs,vs_index) in vip_list"
                                                :key="vs_index">
                                                <li class="privilege-item first-item">
                                                    <div class="vip-type">
                                                        <p class="vip-type-icon">
                                                            <span class="vip-icon vip-middle icon-size-middle"></span>
                                                        </p>
                                                        <span class="vip-type-title">{{ vs.title }}</span>
                                                    </div>
                                                    <div class="buy-btn-box">
                                                        <p class="center-button-base center-button-light-red center-button-container-middle">
                                                            开通会员
                                                        </p>
                                                    </div>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">{{
                                                        vs.description
                                                    }}
                                                </li>
                                                <li class="privilege-item">￥ {{ vs.pay_amount }}</li>
                                                <li class="privilege-item" style="background: #fbf9f8">{{ vs.limit_send }}
                                                    次
                                                </li>
                                                <li class="privilege-item">{{ vs.limit_draw }} 次</li>
                                                <li class="privilege-item">{{ vs.end_time }} 天</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-12">
                                    <div class="card-body">
                                        <a-table :data="tableVip" bordered stripe>
                                            <template #columns>
                                                <a-table-column data-index="created_at" title="时间"/>
                                                <a-table-column data-index="title" title="标题"/>
                                                <a-table-column data-index="order_id" title="订单编号"/>
                                                <a-table-column data-index="amount"
                                                                :title="counter.setting.money_name_set"/>
                                                <a-table-column title="支付状态">
                                                    <template #cell="{ record }">
                                                        {{ record.status == '0' ? '未支付' : '已支付' }}
                                                    </template>
                                                </a-table-column>
                                                <a-table-column title="支付方式">
                                                    <template #cell="{ record }">
                                                        {{
                                                            record.way == 'wechat' ? '微信支付' : record.way == 'alipay' ? '支付宝支付' : counter.setting.money_name_set + '支付'
                                                        }}
                                                    </template>
                                                </a-table-column>
                                            </template>
                                        </a-table>

                                    </div>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="invite">
                            <template #title>
                                <icon-share-alt/>
                                邀请码
                            </template>
                            <div class="row">

                                <div class="col-12 col-md-6">
                                    <div class="card-body">
                                        <div class="index_module_card index_module_card_pw60">
                                            <div class="index-module_header "><span
                                                class="index-module_title">邀请码</span></div>
                                            <div class="index-module_basic">
                                                <div class="row align-items-end">
                                                    <div class="col">
                                                        <span class="h3 mb-0">{{ invite_code }}</span>
                                                    </div>
                                                    <div class="col-auto">
                                                        <a-space>
                                                            <a-button
                                                                type="primary"
                                                                status="warning"
                                                                @click="invite_up()">生成邀请码
                                                            </a-button>
                                                            <a-button
                                                                type="primary"
                                                                @click="copy_invite()">复制邀请链接
                                                            </a-button>
                                                        </a-space>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card-body">
                                        <div class="module-privilege mb-2">
                                            <ul class="privilege-ul name-ul">
                                                <li class="privilege-item first-item">
                                                    <p class="title">
                                                        <span>邀请奖励</span>
                                                    </p>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    <a>邀请人数</a>
                                                </li>
                                                <li class="privilege-item">
                                                    <a>奖励额度</a>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    <a>奖励会员</a>
                                                </li>

                                            </ul>
                                            <ul class="privilege-ul vip-ul " v-for="(ins,ins_index) in invite_set"
                                                :key="ins_index">
                                                <li class="privilege-item first-item">
                                                    <div class="vip-type">
                                                        <p class="vip-type-icon">
                                                            <span class="vip-icon vip-middle icon-size-middle"></span>
                                                        </p>
                                                        <span class="vip-type-title">{{ ins_index + 1 }} 级奖励项</span>
                                                    </div>

                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">{{ ins.invite_c }}
                                                    人
                                                </li>
                                                <li class="privilege-item">￥ {{ ins.invite_amount }}</li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    {{ ins.vip_info ? ins.vip_info.title : '无' }}
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-12">
                                    <div class="card-body">
                                        <a-table :data="tableInvite" stripe>
                                            <template #columns>
                                                <a-table-column data-index="created_at" title="时间"/>
                                                <a-table-column data-index="invite_user.name" title="邀请人"/>
                                                <a-table-column data-index="user_id" title="邀请人ID"/>
                                            </template>
                                        </a-table>
                                    </div>

                                </div>

                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="signin">
                            <template #title>
                                <icon-cloud/>
                                签到
                            </template>
                            <div class="row">

                                <div class="col-12">
                                    <div class="card-body">
                                        <a-calendar class="bg-white mb-2">
                                            <!--循环sign_all的数据 生成日历-->
                                            <!--<template #date-cell="{ data }">-->
                                            <!--    {{ data.day.split('-').slice(1).join('-') }}-->

                                            <!--    <p :class="data.day==formatTime(times.created_at) ? 'is-selected' : ''"-->
                                            <!--       v-for="(times,times_index) in sign_all" :key="times_index">-->

                                            <!--    </p>-->
                                            <!--</template>-->
                                        </a-calendar>
                                        <a-button :disabled="is_signin" class="w-100" v-if="is_signin">已经签到</a-button>
                                        <a-button v-else type="primary" class="w-100" @click="go_signin()"
                                                  :loading="signin_loading">立即签到
                                        </a-button>
                                        <!--vip introduct-->
                                        <div class="module-privilege mb-2">
                                            <ul class="privilege-ul name-ul">
                                                <li class="privilege-item first-item">
                                                    <p class="title">
                                                        <span>功能特权</span>
                                                    </p>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    <a>描述</a>
                                                </li>
                                                <li class="privilege-item">
                                                    <a>连续签到天数</a>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">
                                                    <a>获得额度</a>
                                                </li>
                                                <li class="privilege-item">
                                                    <a>获得会员</a>
                                                </li>
                                            </ul>
                                            <ul class="privilege-ul mt-2 vip-ul " v-for="(si,si_index) in signin_info"
                                                :key="si_index">
                                                <li class="privilege-item first-item">
                                                    <div class="vip-type">
                                                        <p class="vip-type-icon">
                                                            <span class="vip-icon vip-middle icon-size-middle"></span>
                                                        </p>
                                                        <span class="vip-type-title">{{ si.title }}</span>
                                                    </div>
                                                    <div class="buy-btn-box">
                                                        <p class="center-button-base center-button-light-red center-button-container-middle">
                                                            开通会员
                                                        </p>
                                                    </div>
                                                </li>
                                                <li class="privilege-item" style="background: #fbf9f8">{{ si.title }}</li>
                                                <li class="privilege-item"> {{ si.day }} 天</li>
                                                <li class="privilege-item" style="background: #fbf9f8">￥ {{
                                                        si.balance
                                                    }}
                                                </li>
                                                <li class="privilege-item">{{
                                                        si.vip_info ? si.vip_info.title : '暂无'
                                                    }}
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-12">
                                    <div class="card-body">
                                        <a-table :data="sign_me_info" stripe style="width: 100%">
                                            <template #columns>
                                                <a-table-column data-index="created_at" title="时间"/>
                                                <a-table-column data-index="balance"
                                                                :title="counter.setting.money_name_set"/>
                                                <a-table-column title="会员名称">
                                                    <template #cell="{ record }">
                                                        {{ record.vip_info ? record.vip_info.title : '暂无' }}
                                                    </template>
                                                </a-table-column>
                                                <a-table-column data-index="description" title="描述"/>
                                            </template>
                                        </a-table>
                                    </div>

                                </div>

                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>

            </div>
        </div>
    </div>


    <a-modal v-model:visible="dialogFormVisible"
             :title="counter.setting.money_name_set+'充值'">
        <a-spin :loading="qr_load">
            <div class="qr_fing">
                <qrcode-vue v-if="qr_show" :value="pay_scan" size="240"
                            class="mt-2 mb-2 m-auto d-sm-block"></qrcode-vue>
            </div>
        </a-spin>

        <a-form :model="form">
            <a-form-item label="充值">
                <a-input-number :step="0.01" v-model="form.amount" autocomplete="off"
                                :min="counter.setting.min_recharge"
                                placeholder="请输入充值金额"/>
            </a-form-item>
            <a-form-item label="支付方式">
                <a-radio-group v-model="form.pay_type">
                    <a-radio v-if="counter.setting.pay_wechat_open==1" value="wechat">微信
                    </a-radio>
                    <a-radio v-if="counter.setting.pay_alipay_open==1" value="alipay">支付宝
                    </a-radio>
                </a-radio-group>
            </a-form-item>

        </a-form>
        <template #footer>
                                      <span class="dialog-footer">
                                          <a-space>
                                              <a-button type="primary" @click="send_charge()" :loading="charge_loading">
                                          立即充值
                                        </a-button>
                                          <a-button type="primary" plain @click="dialogm()">
                                              完成支付
                                          </a-button>
                                          </a-space>

                                      </span>
        </template>
    </a-modal>
    <a-modal v-model:visible="dialogVip"
             class="vip_mb"
             title="会员升级"
    >
        <a-alert show-icon>
            选择好VIP套餐后，点击立即升级生成二维码支付！
        </a-alert>

        <a-spin :loading="qr_load">
            <div class="qr_fing">
                <qrcode-vue v-if="qr_show" :value="pay_scan" size="240"
                            class="mt-2 mb-2 m-auto d-sm-block"></qrcode-vue>
            </div>
        </a-spin>

        <a-form :model="form">
            <a-form-item label="购买会员">
                <a-radio-group @change="changeRadio" v-model="form.vip_type">
                    <template v-for="(item,index) in vip_list" :key="index">
                        <a-radio :value="item.id">
                            <template #radio="{ checked }">
                                <a-space
                                    align="start"
                                    class="custom-radio-card"
                                    :class="{ 'custom-radio-card-checked': checked }"
                                >
                                    <div className="custom-radio-card-mask">
                                        <div className="custom-radio-card-mask-dot"/>
                                    </div>
                                    <div>
                                        <div className="custom-radio-card-title">
                                            {{ item.title }}
                                        </div>
                                        <a-typography-text type="secondary">
                                            ￥{{ item.pay_amount }}
                                        </a-typography-text>
                                    </div>
                                </a-space>
                            </template>
                        </a-radio>

                    </template>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="支付方式">
                <a-radio-group v-model="form.pay_type">
                    <a-radio v-if="counter.setting.pay_wechat_open==1" value="wechat">微信
                    </a-radio>
                    <a-radio v-if="counter.setting.pay_alipay_open==1" value="alipay">支付宝
                    </a-radio>
                    <a-radio value="balance">{{ counter.setting.money_name_set }}</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="优惠卷">
                <a-input v-model="form.kami" placeholder="请输入优惠卷码"></a-input>
            </a-form-item>
        </a-form>
        <template #footer>
                                      <span class="dialog-footer">
                                          <a-space>
                                              <a-button type="primary" @click="up_to_vip()">立即升级</a-button>
                                                <a-button type="primary" plain @click="dialogv()">
                                                  完成支付
                                                </a-button>
                                          </a-space>

                                      </span>
        </template>
    </a-modal>
    <a-drawer v-model:visible="collapsed" placement="left" width="80%" :header=false>
        <div class=" border-0 text-center pt-3 mb-4 p-2">
            <a-skeleton style="width: 240px;margin:0 auto" animation v-show="s_loading">
                <a-skeleton-shape variant="image" style="width: 240px; height: 240px"/>

            </a-skeleton>
            <div class="card-body" v-if="!s_loading">
                <div class="card-user-avatar">
                    <img :src="me_info.avatar" alt="avatar" class="avatar-150">
                    <a-upload
                        class="avatar-uploader"
                        :action="actions"
                        :show-file-list="false"
                        :headers="{'Authorization': 'Bearer ' + token}"
                        @success="onSuccess"
                        @before-upload="beforeUpload"
                    >

                    </a-upload>
                </div>
                <div class="card-user-detail mt-4">
                    <h5>{{ me_info.name }}</h5>
                    <span class="text-muted"><div class="__cf_email__">{{ me_info.email }}</div></span>
                    {{ me_info.description }}
                </div>
            </div>
        </div>
        <a-descriptions
            bordered
            class="margin-top p-2"
            title="个人信息"
            :column="1"
        >
            <template #extra>
                <a-button :disabled="is_signin" v-if="is_signin">已经签到</a-button>
                <a-button v-else type="primary" @click="go_signin()" :loading="signin_loading">签到</a-button>
            </template>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-mobile/>
                        手机号
                    </div>
                </template>
                {{ me_info.phone ? me_info.phone : '未绑定' }}
            </a-descriptions-item>

            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-relation/>
                        {{ counter.setting.money_name_set }}
                    </div>
                </template>
                ￥ {{ me_info.money }}
            </a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-fire/>
                        会员等级
                    </div>
                </template>
                <a-tag color="blue" size="small">{{ me_vip ? me_vip.title : '免费会员' }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-message/>
                        今日剩余问答
                    </div>
                </template>
                <a-tag color="arcoblue" size="small">{{ last_msg }}</a-tag>
                次
            </a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <icon-highlight/>
                        今日剩余绘画
                    </div>
                </template>
                <a-tag color="orange" size="small" type="success">{{ last_draw }}</a-tag>
                次
            </a-descriptions-item>

        </a-descriptions>
        <template #footer>
            <div class="flex">
                <a-button type="primary" status="danger" class="m-2 w-100" @click="sigt_out()">
                    <icon-import/>
                    退出登录
                </a-button>
            </div>
        </template>
    </a-drawer>
    <Wechat :change_wechat="change_wechat" @handleCancel="handleCancel" />
</template>
<script setup lang="ts">
definePageMeta({
    middleware: ['islogin']
})
import {ref, reactive} from 'vue'
import {useCounter} from '~/store/counter'
import QrcodeVue from 'qrcode.vue'
import {Message, Notification, Descriptions} from "@arco-design/web-vue";

import {
    IconMobile,
    IconRelation,
    IconFire,
    IconMessage,
    IconHighlight,
    IconUser,
    IconTranslate,
    IconLayers,
    IconShareAlt,
    IconCloud,
    IconImport,
    IconMenuUnfold,
    IconMenuFold,
} from "@arco-design/web-vue/es/icon";

const collapsed = ref(false);
const onCollapse = () => {
    collapsed.value = !collapsed.value;
};
const counter = useCounter()

useHead({
    title: '个人中心 - ' + counter.setting.title,
    meta: [
        {name: 'description', content: counter.setting.description},
        {name: 'keywords', content: counter.setting.keywords}
    ]
})

const full_url = ref('') as any
if (process.client) {
    full_url.value = window.location.origin
} else {
    full_url.value = ''
}
const change_wechat = ref(false)
const change_dialog_click = () => {
    change_wechat.value = true
}
const scene_preset = ref(false)
const handleCancel = () => {
    change_wechat.value = false
}
const token = useCookie('token')
const router = useRouter()
const user_info = useCookie('user_info')
const actions = counter.setting.APP_URL + '/api/upload_avatar'
const c_change = ref('me')
const me_info = ref({
    name: '',
    phone: '',
    description: '',
})
const tableData = ref([])
const tableVip = ref([])
const s_loading = ref(false)
const up_loading = ref(false)
const now_loading = ref(true)
const me_vip = ref({})
const invite_set = ref([])
const sigt_out = () => {
    token.value = ''
    Message.success('退出成功')
    router.push('/')
}
const sign_all = ref([])
const formatTime = (time: any) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${year}-${month}-${day}`
}
const last_msg = ref(0)
const last_draw = ref(0)
const is_signin = ref(false)
const now_user = () => {
    s_loading.value = true
    now_loading.value = true
    get_user().then((res: any) => {
        me_info.value = res._rawValue.data
        me_vip.value = res._rawValue.vip
        tableData.value = res._rawValue.order
        tableVip.value = res._rawValue.v_order
        invite_code.value = res._rawValue.data.invite_code
        tableInvite.value = res._rawValue.invite_meta
        invite_set.value = res._rawValue.invite_set
        sign_all.value = res._rawValue.sign
        last_msg.value = res._rawValue.last_msg
        last_draw.value = res._rawValue.last_draw
        s_loading.value = false
        now_loading.value = false
    }).catch((err: any) => {
        s_loading.value = false
        now_loading.value = false
        console.log(err)
    })
}
now_user()

const signins_check = () => {
    signin_check().then((res: any) => {
        is_signin.value = res._rawValue.data
    }).catch((err: any) => {
        console.log(err)
    })
}
signins_check()
const vip_list = ref([])
const vip_tab_list = ref([])
const get_vip = () => {
    get_vip_show().then((res: any) => {
        vip_list.value = res._rawValue.data
        vip_tab_list.value = res._rawValue.data
        vip_ids.value = res._rawValue.data[0].id
        vip_now_money.value = res._rawValue.data[0].pay_amount
    }).catch((err: any) => {
        Message.error('获取失败')
    })
}
get_vip()
const consum_type = (type:any)=>{
    switch (type){
        case 'gpt':
            return '聊天'
        case 'draw':
            return '绘画'
        case 'midjourney':
            return 'Midjourney'
        case 'app':
            return '小应用'
        case 'mindmap':
            return '思维导图'
        case 'write':
            return 'AI写作'
    }
}
const consum = ref([])
const all_limit_get = ()=>{
    get_consum_limit().then((res:any)=>{
        consum.value = res._rawValue.data
    }).catch((err:any)=>{
        console.log(err)
    })
}
all_limit_get()
const change_set = (options: string) => {
    c_change.value = options
}


const update_info = () => {
    up_loading.value = true
    update_user({
        name: me_info.value.name,
        description: me_info.value.description,
    }).then((res: any) => {
        // now_user()
        up_loading.value = false
        Message.success('修改成功')
    }).catch((err: any) => {
        up_loading.value = false
        console.log(err)
    })
}
const pass_loading = ref(false)
const pass_all = ref({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
})
const c_pass = () => {
    pass_loading.value = true
    if (pass_all.value.old_password == '') {
        Message.error('请输入旧密码')
        pass_loading.value = false
        return false
    }
    if (pass_all.value.new_password == '') {
        Message.error('请输入新密码')
        pass_loading.value = false
        return false
    }
    if (pass_all.value.new_password_confirmation == '') {
        Message.error('请输入确认密码')
        pass_loading.value = false
        return false
    }
    if (pass_all.value.new_password != pass_all.value.new_password_confirmation) {
        Message.error('两次密码不一致')
        pass_loading.value = false
        return false
    }
    change_password({
        password: pass_all.value.old_password,
        new_password: pass_all.value.new_password,
    }).then((res: any) => {
        pass_loading.value = false
        Message.success('修改成功')
        pass_all.value = {
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
        }
    }).catch((err: any) => {
        pass_loading.value = false
        console.log(err)
    })
}

const dialogFormVisible = ref(false)
const form = reactive({
    amount: counter.setting.min_recharge ? parseInt(counter.setting.min_recharge) : 1,
    pay_type: counter.setting.pay_wechat_open == 1 ? 'wechat' : 'alipay',
    vip_type: 1,
    kami: '',
})
const charge = () => {
    dialogFormVisible.value = true
}
const pay_scan = ref('')
const charge_loading = ref(false)
const qr_load = ref(false)
const qr_show = ref(false)
const send_charge = () => {
    if (form.amount == 0) {
        Message.error('请输入充值' + counter.setting.money_name_set)
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            amount: form.amount,
            type: 'charge',
            is_mobile: isMobile && counter.setting.alipay_wap_open == '1' ? 1 : 0

        }).then((res: any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            } else {
                console.log('pc')
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    } else {
        wechat({
            amount: form.amount,
            type: 'charge',
            is_mobile: isMobile && counter.setting.wechat_wap_open == '1' ? 1 : 0
        }).then((res: any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            } else {
                console.log('pc')
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false

            console.log(err.message)
        })
    }

}
// VIP bug
const dialogVip = ref(false)
const up_vip_dialog = () => {
    dialogVip.value = true
}
const up_to_vip = () => {
    if (vip_ids.value == '') {
        Message.error('请选择VIP套餐')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            v_id: vip_ids.value,
            amount: vip_now_money.value,
            type: 'vip',
            coupon: form.kami,
            is_mobile: isMobile && counter.setting.alipay_wap_open == '1' ? 1 : 0
        }).then((res: any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            } else {
                console.log('pc')
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    } else if (form.pay_type == 'wechat') {
        wechat({
            v_id: vip_ids.value,
            amount: vip_now_money.value,
            type: 'vip',
            coupon: form.kami,
            is_mobile: isMobile && counter.setting.wechat_wap_open == '1' ? 1 : 0

        }).then((res: any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            } else {
                console.log('pc')
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    } else if (form.pay_type == 'balance') {
        qr_load.value = false
        qr_show.value = false
        buy_vip({
            v_id: vip_ids.value,
            coupon: form.kami,
        }).then((res: any) => {
            charge_loading.value = false
            Message.success(res._rawValue.message)
            dialogVip.value = false
            now_user()
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    } else {
        Message.error('请选择支付方式')
    }
}
const vip_ids = ref('')
const vip_now_money = ref(0)
const changeRadio = (ids: string) => {
        vip_list.value.forEach((item:any) => {
            if (item.id == ids) {
                vip_ids.value = item.id
                vip_now_money.value = item.pay_amount
            }
        })
}
const invite_code = ref('')
const tableInvite = ref([])
const copy_invite = () => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', full_url.value + '/?invite_code=' + invite_code.value)
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        Message.success('复制成功')
    }
    document.body.removeChild(input)
}
const invite_up = () => {
    invite_code_send().then((res: any) => {
        invite_code.value = res._rawValue.data
        Message.success(
            '邀请码已更新'
        )
    }).catch((err: any) => {
        console.log(err)
    })
}
const kami_code = ref('')
const kami_loading = ref(false)
const change_code = () => {
    if (kami_code.value == '') {
        Message.error('请输入卡密')
        return
    }
    kami_loading.value = true
    kami_send({
        code: kami_code.value,
    }).then((res: any) => {
        Notification.success({
            title: '成功',
            content: res._rawValue.info,
        })
        kami_code.value = ''
        kami_loading.value = false
        now_user()
    }).catch((err: any) => {
        kami_loading.value = false
        console.log(err)
    })
}

const onSuccess = (currentFile) => {
    // 获取currentFile里的response的data值
    if (currentFile.response.status != 200) {
        Message.error('上传失败!')
        return
    }
    Message.success('上传成功!')
    now_user()
};
const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isLt2M = file.size / 1024 / 1024 < 5;

    if (!isJPG && !isPNG && !isGIF) {
        Message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        return false
    }
    if (!isLt2M) {
        Message.error('上传图片大小不能超过 5MB!')
        return false
    }
    return true
};
const change_phone_number = ref(false)
const change_email_code = ref(false)
const phone_form = reactive({
    phone: '',
    phone_code: '',
})
const email_form = reactive({
    email: '',
    email_code: '',
})
const c_user_phone = () => {
    if (phone_form.phone == '') {
        Message.error('请输入手机号')
        return
    }
    if (phone_form.phone_code == '') {
        Message.error('请输入验证码')
        return
    }
    change_phone_number.value = true
    change_phone({
        phone: phone_form.phone,
        code: phone_form.phone_code,
    }).then((res: any) => {
        Message.success('修改成功')
        change_phone_number.value = false
        now_user()
    }).catch((err: any) => {
        console.log(err)
    })
}
const send_wait = ref(false)
const send_code_text = ref('发送验证码')
const send_p_code = () => {
    if (phone_form.phone == '') {
        Message.error('请输入手机号')
        return
    }
    send_wait.value = true
    send_phone_code({
        phone: phone_form.phone,
    }).then((res: any) => {
        send_wait.value = true
        let time = 60
        const timer = setInterval(() => {
            time--
            send_code_text.value = time + 's'
            if (time == 0) {
                send_wait.value = false
                send_code_text.value = '发送验证码'
                clearInterval(timer)
            }
        }, 1000)
        Message.success('发送成功')
    }).catch((err: any) => {
        send_wait.value = false
        console.log(err)
    })
}

const send_e_code = () => {
    if (email_form.email == '') {
        Message.error('请输入邮箱')
        return
    }
    send_wait.value = true
    send_email({
        email: email_form.email,
    }).then((res: any) => {
        send_wait.value = true
        let time = 60
        const timer = setInterval(() => {
            time--
            send_code_text.value = time + 's'
            if (time == 0) {
                send_wait.value = false
                send_code_text.value = '发送验证码'
                clearInterval(timer)
            }
        }, 1000)
        Message.success('发送成功')
    }).catch((err: any) => {
        send_wait.value = false
        console.log(err)
    })
}

const c_user_email = () => {
    if (email_form.email == '') {
        Message.error('请输入邮箱')
        return
    }
    if (email_form.email_code == '') {
        Message.error('请输入验证码')
        return
    }
    change_email_code.value = true
    change_email({
        email: email_form.email,
        code: email_form.email_code,
    }).then((res: any) => {
        Message.success('修改成功')
        change_email_code.value = false
        now_user()
    }).catch((err: any) => {
        console.log(err)
    })
}

const dialogv = () => {
    dialogVip.value = false
    now_user()
}

const dialogm = () => {
    dialogFormVisible.value = false
    now_user()
}

const signin_loading = ref(false)
const go_signin = () => {
    signin_loading.value = true
    signin_me().then((res: any) => {
        Message.success('签到成功')
        signin_loading.value = false
        now_user()
    }).catch((err: any) => {
        signin_loading.value = false
        console.log(err)
    })
}
const signin_info = ref([])
const sign_me_info = ref([])
const get_sign = () => {
    get_signin_info().then((res: any) => {
        signin_info.value = res._rawValue.sign_info
        sign_me_info.value = res._rawValue.data
    }).catch((err: any) => {
        console.log(err)
    })
}
get_sign()


</script>


