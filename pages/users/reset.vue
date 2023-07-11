<template>
    <div class="authentication">
        <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-center no-gutters min-vh-100">
                <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">

                            <h3 class="text-center">重置密码</h3>

                            <p class="text-center mb-6">
                                请在下面输入你的电子邮件地址，并且发送验证码到你的邮箱。
                            </p>
                            <a-tabs v-model="activeName" type="capsule" size="large" class="justify-content-center mt-2">
                                <a-tab-pane title="邮箱验证" v-if="reg_way=='1'||reg_way=='3'" key="first">
                                    <a-form
                                        @submit="submitForm"
                                        ref="ruleFormRef"
                                        :model="ruleForm"
                                        :rules="rules"
                                        class="demo-ruleForm"
                                        status-icon
                                    >

                                        <a-form-item field="email" :hide-label=true>
                                                <a-input
                                                       v-model="ruleForm.email"
                                                       placeholder="请填写您的邮箱"/>
                                        </a-form-item>
                                        <a-form-item field="email_code" :hide-label=true>
                                            <a-space>
                                                <a-input
                                                         v-model="ruleForm.email_code"
                                                         placeholder="请填写您的邮箱验证码"/>
                                                <a-button type="primary"  @click="send_code()">{{ send_code_text }}</a-button>

                                            </a-space>


                                        </a-form-item>
                                        <a-form-item field="password" :hide-label=true>
                                                <a-input
                                                       v-model="ruleForm.password"
                                                       placeholder="填写您的密码" />
                                        </a-form-item>

                                        <a-form-item field="password" :hide-label=true>
                                                <a-input
                                                       v-model="ruleForm.password_c"
                                                       placeholder="确认您的密码" />
                                        </a-form-item>

                                        <a-form-item :hide-label=true>
                                            <a-button type="primary" :loading="pass_loading" class="register" size="large" html-type="submit">
                                                重置密码
                                            </a-button>
                                        </a-form-item>
                                    </a-form>
                                </a-tab-pane>
                                <a-tab-pane title="手机验证" v-if="reg_way=='2'||reg_way=='3'" key="second">
                                    <a-form
                                        ref="ruleFormRefP"
                                        :model="ruleFormP"
                                        :rules="rulesP"
                                        class="demo-ruleForm"
                                        status-icon
                                        @submit="submitFormP"
                                    >
                                        <a-form-item field="phone" :hide-label=true>
                                                <a-input
                                                       v-model="ruleFormP.phone"
                                                       placeholder="请填写您的手机号" />
                                        </a-form-item>
                                        <a-form-item field="phone_code" :hide-label=true>
                                            <a-space>
                                                <a-input
                                                       v-model="ruleFormP.phone_code"
                                                       placeholder="请填写您的手机验证码" />
                                                <a-button type="primary" @click="send_phone_codes()">{{ send_code_text }}</a-button>

                                            </a-space>


                                        </a-form-item>
                                        <a-form-item field="password" :hide-label=true>
                                                <a-input type="password" class="form-control form-control-lg"
                                                       v-model="ruleFormP.password"
                                                       placeholder="填写您的密码" />
                                        </a-form-item>

                                        <a-form-item field="password" :hide-label=true>
                                            <a-input type="password" class="form-control form-control-lg"
                                                   v-model="ruleFormP.password_c"
                                                   placeholder="确认您的密码" />
                                        </a-form-item>

                                        <a-form-item :hide-label=true>
                                            <a-button type="primary" :loading="pass_loading" class="register" size="large" html-type="submit">
                                                重置密码
                                            </a-button>
                                        </a-form-item>
                                    </a-form>
                                </a-tab-pane>
                            </a-tabs>


                            <p class="text-center mb-0">已经有账户了？<NuxtLink class="link" to="/">登录</NuxtLink>.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCounter } from '~/store/counter'
const counter = useCounter()

useHead({
    title: '重置密码 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
definePageMeta({
    layout: false
})
import { ref,reactive } from 'vue'
import {Message} from "@arco-design/web-vue";

const get_config = ()=>{
    get_nav_config().then((res:any)=>{
        counter.setting = res._rawValue.data;
    }).catch((err:any)=>{
        Message.error(err);
    })
}
get_config()
const reg_way = counter.setting.register_way
const activeName = reg_way=== '1' ? 'first' : (reg_way == '2' ? 'second' : 'first')
const send_code_text = ref('发送验证码')

const ruleFormRef = ref()
const ruleFormRefP = ref()
const ruleForm = reactive({
    email: '',
    email_code: '',
    password: '',
    password_c: ''
})
const ruleFormP = reactive({
    phone: '',
    phone_code: '',
    password: '',
    password_c: ''
})
const rules = reactive({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    email_code: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
    ],
    password_c: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
    ],
})

const rulesP = reactive({
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    phone_code: [
        { required: true, message: '请输入手机验证码', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
    ],
    password_c: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
    ],
})
const router = useRouter()
const pass_loading = ref(false)
const submitForm = async ({values,errors}) => {
            if (errors) {
                Message.error('请填写正确的信息')
                return false;
            }
            if (ruleForm.password!=ruleForm.password_c){
                Message.error('两次密码不一致')
                return
            }
            pass_loading.value = true
            reset_password({
                email: ruleForm.email,
                email_code: ruleForm.email_code,
                password: ruleForm.password,
            }).then((res:any) => {
                if (res._rawValue.status==200){
                    let time = 60
                    const timer = setInterval(() => {
                        if (time > 0 && time <= 60) {
                            time--
                            send_code_text.value = time + 's'
                        } else {
                            clearInterval(timer)
                            send_code_text.value = '发送验证码'
                        }
                    }, 1000)
                    Message.success(res._rawValue.message)
                    router.push({path:'/'})
                    pass_loading.value = false
                }

            }).catch((err:any) => {
                pass_loading.value = false
                console.log(err)
            })

}

const submitFormP = async ({values,errors}) => {
            if (errors) {
                Message.error('请填写正确的信息')
                return false;
            }
            if (ruleFormP.password!=ruleFormP.password_c){
                Message.error('两次密码不一致')
                return
            }
            pass_loading.value = true
            reset_password_phone({
                phone: ruleFormP.phone,
                phone_code: ruleFormP.phone_code,
                password: ruleFormP.password,
            }).then((res:any) => {
                if (res._rawValue.status==200){
                    let time = 60
                    const timer = setInterval(() => {
                        if (time > 0 && time <= 60) {
                            time--
                            send_code_text.value = time + 's'
                        } else {
                            clearInterval(timer)
                            send_code_text.value = '发送验证码'
                        }
                    }, 1000)
                    Message.success(res._rawValue.message)
                    router.push({path:'/'})
                    pass_loading.value = false
                }

            }).catch((err:any) => {
                pass_loading.value = false
                console.log(err)
            })

}
const send_code = () => {
    if (ruleForm.email==''){
        Message.error('请填写邮箱')
        return
    }
    send_email({
        email: ruleForm.email,
        type: 'reset'
    }).then((res:any) => {
        if (res._rawValue.status==200){
            Message.success(res._rawValue.message)
        }
    }).catch((err:any) => {
        console.log(err)
    })
}

const send_phone_codes = () => {
    if (ruleFormP.phone==''){
        Message.error('请填写手机号')
        return
    }
    send_phone_code({
        phone: ruleFormP.phone,
        type: 'reset'
    }).then((res:any) => {
        if (res._rawValue.status==200){
            Message.success(res._rawValue.message)
        }
    }).catch((err:any) => {
        console.log(err)
    })
}
</script>

<style scoped>

</style>
