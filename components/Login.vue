<template>
    <a-modal :footer=false v-model:visible="login_dialog" simple class="mb_dialog dialog_login_of">
        <a-modal
                v-model:visible="check_dialog"
                :title="agreement.title"
                class="dialog_login_of"
            >
            <a-skeleton :animation="agreement_load" v-if="agreement_load">
                <a-space direction="vertical" :style="{width:'100%'}" size="large">
                    <a-skeleton-line :rows="3" />
                </a-space>
            </a-skeleton>
                <div v-html="agreement.description" v-else></div>
                <template #footer>
                                      <span class="dialog-footer">
                                        <a-button type="primary" @click="check_dialog_change()">
                                            同意协议
                                        </a-button>
                                      </span>
                </template>
            </a-modal>
        <div class="w-100 dialog_login">
            <!--login-->
            <div v-if="is_login_card" class="card login_card border-0">
                <div class="card-body">
                    <img src="@/assets/images/safe_login.png" alt="" class="w-28 m-auto mb-2">

                    <p class="text-center mb-6">登录自主用户，开始聊天</p>
                    <a-form  ref="ruleFormRefLogin" :model="ruleFormLogin" class="demo-ruleForm"
                        status-icon @submit="submitFormLogin">
                        <a-form-item :hide-label=true field="email"
                                     :rules="[{required:true,message:'邮箱或手机号不得为空'}]">
                                <a-input  v-model="ruleFormLogin.email"
                                    placeholder="输入你的邮箱/手机号">
                                    <template #prefix>
                                        <icon-user />
                                    </template>
                                </a-input>
                        </a-form-item>
                        <a-form-item :hide-label=true field="password"
                                     :rules="[{required:true,message:'密码不得为空'},
                                     {minLength:6,message:'必须输入大于6个字符'}]"
                        >
                                <a-input-password   v-model="ruleFormLogin.password"
                                    placeholder="输入你的密码">
                                    <template #prefix>
                                        <icon-lock />
                                    </template>
                                </a-input-password>
                        </a-form-item>
                        <div class="form-group d-flex justify-content-between mb-2">
                            <NuxtLink class="link" href="/users/reset">忘记密码</NuxtLink>
                        </div>
                        <a-button :loading="login_loading"  type="primary"
                                  html-type="submit" class="login mb-2">
                            登录
                        </a-button>
                    </a-form>
                    <div class="mt-6" v-if="counter.setting.three_login_open=='1'">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300" />
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="bg-white px-2 text-gray-500">第三方登录</span>
                            </div>
                        </div>

                        <div class="mt-3 grid grid-cols-1 gap-1 mb-3" v-if="counter.setting.wechat_login=='1'">
                            <div>
                                <div
                                    @click="wechat_login()"
                                    class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                >
                                    <span class="sr-only">Sign in with Twitter</span>
                                    <svg t="1684751208419" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23618" width="26" height="26"><path d="M512 512m-447.9 0a447.9 447.9 0 1 0 895.8 0 447.9 447.9 0 1 0-895.8 0Z" fill="#00C785" p-id="23619"></path><path d="M741.6 567.5c0-63.7-63.7-115.5-135.3-115.5-75.9 0-135.5 51.9-135.5 115.5 0 63.8 59.6 115.5 135.5 115.5 15.9 0 31.9-4 47.8-7.9l43.7 24-12-39.8c32-24 55.8-56 55.8-91.8z m-179.3-19.9c-7.9 0-15.9-7.9-15.9-15.9 0-7.9 7.9-15.9 15.9-15.9 12 0 20 7.9 20 15.9s-8 15.9-20 15.9z m87.7 0c-7.9 0-15.8-7.9-15.8-15.9 0-7.9 7.9-15.9 15.8-15.9 12 0 19.9 7.9 19.9 15.9 0.1 8-8.1 15.9-19.9 15.9z m0 0" fill="#FFFFFF" p-id="23620"></path><path d="M593.1 437.9c5.2 0 10.5 0.4 15.7 0.9-14-65.6-84.1-114.2-164.1-114.2-89.4 0-162.7 60.9-162.7 138.3 0 44.7 24.3 81.4 65 109.9l-16.2 49 56.9-28.6c20.4 4 36.7 8.1 56.9 8.1 5 0 10.1-0.2 15.1-0.7-3.2-10.8-5-22.3-5-34.1 0.1-70.9 61.2-128.6 138.4-128.6z m-87.5-44.1c12.2 0 20.3 8.1 20.3 20.4 0 12.2-8.1 20.3-20.3 20.3-12.3 0-24.5-8.1-24.5-20.3 0.2-12.3 12.4-20.4 24.5-20.4z m-113.9 40.7c-12.3 0-24.5-8.1-24.5-20.3 0-12.3 12.2-20.4 24.5-20.4s20.4 8.1 20.4 20.4c0 12-8.1 20.3-20.4 20.3z m0 0" fill="#FFFFFF" p-id="23621"></path></svg>
                                </div>
                            </div>

                        </div>
                    </div>

                    <p class="text-center mb-0">还没有账户？
                        <span class="link cursor-pointer" @click="go_regs()">注册一个</span>
                        .
                    </p>
                </div>
            </div>
            <!--wechat_login-->
            <div class="card login_card border-0" v-else-if="wx_login_is">
                <div class="card-body">
                    <img src="@/assets/images/wechat.png" alt="" class="m-auto mb-2">

                    <p class="text-center mb-6">打开微信[扫一扫]登录</p>
                    <a-image :src="wx_ewm" alt=""/>
                </div>
                <NuxtLink @click="go_login" class="text-center cursor-pointer">返回登录</NuxtLink>
            </div>
            <!--register-->
            <div v-else class="card register_card border-0">
                <div class="card-body">
                    <img src="@/assets/images/safe_login.png" alt="" class="w-28 m-auto mb-2">
                    <p class="text-center mb-6">创建一个免费账户</p>
                    <a-tabs type="capsule" v-model="activeName" class="demo-tabs reg_demo_tabs">
                        <a-tab-pane title="邮箱注册" key="first" v-if="reg_way == '1' || reg_way == '3'">
                            <a-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon @submit="submitForm">
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="email"
                                >
                                    <a-input  v-model="ruleForm.email" placeholder="请填写您的邮箱">
                                        <template #prefix>
                                            <icon-email />
                                        </template>
                                    </a-input>
                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="email_code"
                                             >
                                    <a-space>
                                        <a-input  v-model="ruleForm.email_code"
                                                 placeholder="邮箱验证码">
                                            <template #prefix>
                                                <icon-code />
                                            </template>


                                        </a-input>
                                        <a-button :loading="send_wait" type="primary"
                                                  @click="send_code()">
                                            {{ send_code_text }}
                                        </a-button>
                                    </a-space>


                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="password"
                                             >
                                    <a-input-password   v-model="ruleForm.password" placeholder="填写您的密码">
                                        <template #prefix>
                                            <icon-lock />
                                        </template>

                                    </a-input-password>
                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="invite_code" class="mb-2">
                                    <a-input  v-model="ruleForm.invite_code"
                                        placeholder="填写您的邀请码（可选）">
                                        <template #prefix>
                                            <icon-message />
                                        </template>
                                    </a-input>
                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="check_xieyi" class="mb-2 mt-0">
                                    <a-checkbox type="check_xieyi" v-model="ruleForm.check_xieyi" @click="check_agree_dialog()">
                                        同意《用户协议》
                                    </a-checkbox>
                                </a-form-item>
                                <a-button type="primary" :loading="reg_loading" class="register w-100 mb-2"
                                          html-type="submit">
                                    注册
                                </a-button>
                            </a-form>
                        </a-tab-pane>
                        <a-tab-pane title="手机注册" key="second" v-if="reg_way == '2' || reg_way == '3'">
                            <a-form ref="ruleFormRefs" :model="TruleForm" :rules="rulest"  class="demo-ruleForm"
                                    @submit="submitFormS"
                                status-icon>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="phone">
                                        <a-input v-model="TruleForm.phone"
                                            placeholder="请填写您的手机号"
                                            >
                                            <template #prefix>
                                                <icon-mobile />
                                            </template>
                                        </a-input>
                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="phone_code">
                                    <a-space>
                                        <a-input
                                                 v-model="TruleForm.phone_code"
                                                 placeholder="请填写您的手机验证码"
                                        >
                                            <template #prefix>
                                                <icon-code />
                                            </template>

                                        </a-input>
                                        <a-button :loading="send_wait" type="primary" @click="send_p_code()">
                                            {{ send_code_text }}
                                        </a-button>
                                    </a-space>

                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="password">
                                        <a-input-password
                                            v-model="TruleForm.password" placeholder="填写您的密码"
                                            >
                                            <template #prefix>
                                                <icon-lock />
                                            </template>
                                        </a-input-password>
                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="invite_code" class="mb-2">
                                        <a-input
                                            v-model="TruleForm.invite_code" placeholder="填写您的邀请码（可选）"
                                            >
                                            <template #prefix>
                                                <icon-message />
                                            </template>
                                        </a-input>
                                </a-form-item>
                                <a-form-item :hide-label=true
                                             :hide-asterisk=true
                                             field="check_xieyi" class="mb-2 mt-0">
                                    <a-checkbox  v-model="TruleForm.check_xieyi" @click="check_agree_dialog()">
                                        同意《用户协议》
                                    </a-checkbox>
                                </a-form-item>

                                <a-button type="primary" :loading="reg_loading" class="register w-100 mb-2"
                                          html-type="submit">
                                    注册
                                </a-button>
                            </a-form>
                        </a-tab-pane>
                    </a-tabs>



                    <p class="text-center mb-0">已经有账户了? <span class="link cursor-pointer" @click="go_login()">登录</span>.</p>

                </div>
            </div>

        </div>
    </a-modal>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
    IconUser,
    IconLock,
    IconCode,
    IconMessage,
    IconEmail,
    IconMobile,

} from "@arco-design/web-vue/es/icon";
import { useCounter } from '~/store/counter'
import {Message} from "@arco-design/web-vue";
const counter = useCounter()
const is_login_card = ref(true)
import QrcodeVue from "qrcode.vue";
const wx_ewm = ref()

const go_regs = () => {
    wx_ewm.value = ''
    is_login_card.value = false
}
const go_login = () => {
    wx_ewm.value = ''
    is_login_card.value = true
}

const props = defineProps({
    login_dialog: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['handleCancel']) // 定义emit
const login_dialog = computed({
    get() {
        return props.login_dialog
    },
    set(val) {
        emit('handleCancel', val)
    }
})
const handleCancel = () => {
    login_dialog.value = false
}

const email = ref('')
const password = ref('')
const ruleFormRefLogin = ref()
const ruleFormLogin = reactive({
    email: '',
    password: ''
})
const rulesLogin = reactive({
    email: [
        { required: true, message: '请输入邮箱或手机号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ]
})
const login_loading = ref(false)
const token = useCookie('token',  { maxAge: 60 * 60 * 24 * 2 })
const user_info = useCookie('user_info')
const router = useRouter()
const cookie_message = useCookie('message')

const submitFormLogin = async ({values, errors}) => {
            if (errors) {
                Message.error('请填写登录信息')
                return false
            }
            login_loading.value = true
            logins({
                email: ruleFormLogin.email,
                password: ruleFormLogin.password
            }).then((res: any) => {
                login_loading.value = false
                if (res._rawValue.status == 200) {
                    handleCancel()
                    cookie_message.value = ''
                    token.value = res._rawValue.token
                    user_info.value = res._rawValue.user_info
                    Message.success(res._rawValue.message)
                    router.go(0)
                }
            }).catch((err: any) => {
                login_loading.value = false
            })
}
const { public: { baseUrl } } = useRuntimeConfig()
const wechat_id = ref()
const wx_login_is = ref(false)
const wechat_login= ()=>{
    is_login_card.value = false
    wx_login_is.value = true
    wechat_login_url({
        type: 'login'
    }).then((res: any) => {
        wx_ewm.value = res._rawValue.data
        wechat_id.value = res._rawValue.id
        // 轮询是否已经关注登录
        let timer = setInterval(() => {
            wechat_login_status({
                id:wechat_id.value
            }).then((res: any) => {
                if (res._rawValue.status == 200) {
                    clearInterval(timer)
                    cookie_message.value = ''
                    token.value = res._rawValue.token
                    user_info.value = res._rawValue.user_info
                    Message.success(res._rawValue.message)
                    router.go(0)
                }
            }).catch((err: any) => {
                clearInterval(timer)
            })
        }, 3000)
    }).catch((err: any) => {
        Message.error(err);
    })
}
const reg_way = ref(counter.setting.register_way?counter.setting.register_way:'1')

// register send

const ruleFormRef = ref()
const ruleFormRefs = ref()
const ruleForm = <any>reactive({
    email: '',
    password: '',
    email_code: '',
    invite_code: '',
    check_xieyi: false

})
const TruleForm = <any>reactive({
    phone: '',
    password: '',
    phone_code: '',
    invite_code: '',
    check_xieyi: false
})
if (process.client) {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('invite_code')) {
        ruleForm.invite_code = searchParams.get('invite_code')
        TruleForm.invite_code = searchParams.get('invite_code')
    }
}
const rulest = reactive({

    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { match: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    phone_code: [
        { required: true, message: '请输入手机验证码', trigger: 'blur' },
    ],

})
const check_agree_dialog=()=>{
    check_dialog.value = true
    get_agreement()
}
const rules = reactive({

    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    email_code: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    ],


})
const reg_loading = ref(false)
// EMAIL register
const submitForm = async ({values, errors}) => {
            if (errors) {
                Message.error('请补全注册信息')
                return false
            }
            if (ruleForm.check_xieyi == false) {
                Message.error('请同意用户协议')
                return
            }
            reg_loading.value = true
            register({
                email: ruleForm.email,
                password: ruleForm.password,
                email_code: ruleForm.email_code,
                invite_code: ruleForm.invite_code
            }).then((res: any) => {
                if (res._rawValue.status == 200) {
                    Message.success(res._rawValue.message)
                    go_login()
                    reg_loading.value = false
                }

            }).catch((err: any) => {
                reg_loading.value = false
            })

}

const check_dialog = ref(false)
const agreement = ref({})
const agreement_load = ref(false)
const get_agreement=()=>{
    agreement_load.value = true
    get_agreement_f().then((res: any) => {
        agreement.value = res._rawValue.data
        agreement_load.value = false
    }).catch((err: any) => {
        console.log(err)
        agreement_load.value = false
    })
}

const check_dialog_change = ()=>{
    check_dialog.value = false
    ruleForm.check_xieyi = true
    TruleForm.check_xieyi = true
}
// Phone register
const submitFormS = async ({values, errors}) => {
            if (errors) {
                Message.error('请补全注册信息')
                return false
            }
            if (TruleForm.check_xieyi == false) {
                Message.error('请同意用户协议')
                return
            }
            reg_loading.value = true
            register({
                phone: TruleForm.phone,
                password: TruleForm.password,
                phone_code: TruleForm.phone_code,
                invite_code: TruleForm.invite_code
            }).then((res: any) => {
                if (res._rawValue.status == 200) {
                    Message.success(res._rawValue.message)

                    go_login()
                    reg_loading.value = false
                }

            }).catch((err: any) => {
                reg_loading.value = false
            })

}
const send_code_text = ref('发送验证码')
const send_wait = ref(false)
const activeName = reg_way === '1' ? 'first' : (reg_way == '2' ? 'second' : 'first')

const send_code = () => {
    if (ruleForm.email == '') {
        Message.error('请填写邮箱')
        return
    }
    send_wait.value = true
    send_email({
        email: ruleForm.email
    }).then((res: any) => {
        if (res._rawValue.status == 200) {
            Message.success(res._rawValue.message)
            // 发送成功倒计时60秒
            let time = 60
            const timer = setInterval(() => {
                if (time <= 0) {
                    send_code_text.value = '发送验证码'
                    send_wait.value = false
                    clearInterval(timer)
                    return
                }
                send_code_text.value = time + 's'
                send_wait.value = true
                time--
            }, 1000)
        }
    }).catch((err: any) => {
        send_wait.value = false
        console.log(err)
    })
}

const send_p_code = () => {
    if (TruleForm.phone == '') {
        Message.error('请填写手机号')
        return
    }
    send_wait.value = true
    send_phone_code({
        phone: TruleForm.phone
    }).then((res: any) => {
        if (res._rawValue.status == 200) {
            Message.success(res._rawValue.message)
            // 发送成功倒计时60秒
            let time = 60
            const timer = setInterval(() => {
                if (time <= 0) {
                    send_code_text.value = '发送验证码'
                    send_wait.value = false
                    clearInterval(timer)
                    return
                }
                send_code_text.value = time + 's'
                send_wait.value = true
                time--
            }, 1000)
        }
    }).catch((err: any) => {
        send_wait.value = false
        console.log(err)
    })
}
</script>

<style>

.dialog_login_of i {
    font-size: 16px;
}
</style>
