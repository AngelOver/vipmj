<template>
    <a-modal :footer=false v-model:visible="change_wechat" simple class="mb_dialog dialog_login_of">
        <div class="card login_card border-0">
            <div class="card-body">
                <img src="@/assets/images/wechat.png" alt="" class="m-auto mb-2">

                <p class="text-center mb-6">打开微信[扫一扫]绑定</p>
                <a-image :src="wx_ewm" alt=""/>
            </div>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import {
    IconCode,
    IconEmail,
    IconLock,
    IconMessage,
    IconMobile,
    IconUser
} from "@arco-design/web-vue/es/icon";
const counter = useCounter()
import QrcodeVue from "qrcode.vue";
import {useCounter} from "~/store/counter";
import {Message} from "@arco-design/web-vue";
const wx_ewm = ref('')
const props = defineProps({
    change_wechat: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['handleCancel']) // 定义emit
const change_wechat = computed({
    get() {
        if (props.change_wechat) {
            wechat_login()
        }
        return props.change_wechat
    },
    set(val) {
        emit('handleCancel', val)
    }
})

const handleCancel = () => {
    change_wechat.value = false
}
const wechat_id = ref()
const router = useRouter()

const wechat_login= ()=>{
    wechat_login_url({
        type: 'bind'
    }).then((res: any) => {
        wx_ewm.value = res._rawValue.data
        wechat_id.value = res._rawValue.id
        // 轮询是否已经关注登录
        let timer = setInterval(() => {
            wechat_bind_status({
                id:wechat_id.value
            }).then((res: any) => {
                if (res._rawValue.status == 200) {
                    clearInterval(timer)
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

</script>
