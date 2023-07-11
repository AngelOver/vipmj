<template>
    <a-modal class="msgbox" v-model:visible="dialogFormVisible" title="充值中心">

        <a-tabs
            v-model="activeName"
            default-active-key="first"
            class="demo-tabs"
            type="capsule"
            @tab-click="handleClick"
        >
            <a-tab-pane :title="'充值'+counter.setting.money_name_set" key="first">
                <a-spin :loading="qr_load">
                    <div class="qr_fing">
                        <qrcode-vue v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"></qrcode-vue>
                    </div>
                </a-spin>

                <a-form :model="form">
                    <a-form-item label="充值">
                        <a-input-number :step="0.01"  v-model="form.amount" autocomplete="off" :min="counter.setting.min_recharge" placeholder="请输入充值金额" />
                    </a-form-item>
                    <a-form-item label="支付方式">
                        <a-radio-group v-model="form.pay_type">
                            <a-radio v-if="counter.setting.pay_wechat_open==1"  value="wechat">微信
                            </a-radio>
                            <a-radio v-if="counter.setting.pay_alipay_open==1"  value="alipay">支付宝
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>

                </a-form>

            </a-tab-pane>
            <a-tab-pane title="开通VIP" key="second">
                <a-spin :loading="qr_load">
                    <div class="qr_fing" >
                        <qrcode-vue v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"></qrcode-vue>
                    </div>
                </a-spin>

                <a-form :model="form">
                    <a-form-item label="购买会员">
                        <a-radio-group @change="changeRadio" v-model="form.vip_type">
                            <template v-for="(item,index) in vip_list" :key="index">
                                <a-radio  :value="item.id">
                                    <template #radio="{ checked }">
                                        <a-space
                                            align="start"
                                            class="custom-radio-card"
                                            :class="{ 'custom-radio-card-checked': checked }"
                                        >
                                            <div className="custom-radio-card-mask">
                                                <div className="custom-radio-card-mask-dot" />
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
                            <a-radio   v-if="counter.setting.pay_wechat_open==1" value="wechat">微信</a-radio>
                            <a-radio   v-if="counter.setting.pay_alipay_open==1" value="alipay">支付宝</a-radio>
                            <a-radio   value="balance">{{counter.setting.money_name_set}}</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="优惠卷">
                        <a-input v-model="form.kami" placeholder="请输入优惠卷码"></a-input>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
        </a-tabs>
        <template #footer>
            <a-space class="dialog-footer">
                <a-button type="primary" @click="is_vipor_charge()" :loading="charge_loading">
                    立即充值
                </a-button>
                <a-button type="primary" plain @click="dialogm()">
                    完成支付
                </a-button>
            </a-space>
        </template>
    </a-modal>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import QrcodeVue from "qrcode.vue";

import {useCounter} from '~/store/counter'
import {Message} from "@arco-design/web-vue";
const activeName = ref('first')

const counter = useCounter()
const props = defineProps({
    dialogFormVisible: {
        type: Boolean,
        default: false
    },
})
const handleClick = (tab:any) => {
    activeName.value = tab
}
const emit = defineEmits(['handleCancels']) // 定义emit
const dialogFormVisible = computed({
    get() {
        if (props.dialogFormVisible!=false){
            get_vip()
        }
        return props.dialogFormVisible
    },
    set(val) {

        emit('handleCancels', val)
    }
})
const handleCancels = () => {
    dialogFormVisible.value = false
}
const qr_load = ref(false)
const pay_scan = ref('')
const charge_loading = ref(false)
const qr_show = ref(false)
const form = reactive({
    amount:counter.setting.min_recharge?parseInt(counter.setting.min_recharge):1,
    pay_type:counter.setting.pay_wechat_open == 1 ? 'wechat' : 'alipay',
    vip_type:1,
    kami:'',
})
watch(() => form.amount, (val) => {
    if (val < counter.setting.min_recharge) {
        form.amount = counter.setting.min_recharge
    }
})

const vip_list = ref([])
const get_vip = () => {
    get_vip_show().then((res:any) => {
        vip_list.value = res._rawValue.data
        vip_ids.value = res._rawValue.data[0].id
        vip_now_money.value = res._rawValue.data[0].pay_amount
    }).catch((err:any) => {
        Message.error('获取失败')
    })
}


const vip_ids = ref('')
const vip_now_money = ref(0)
const changeRadio = (e:any) => {
    vip_list.value.forEach((item:any) => {
        if (item.id == e) {
            vip_ids.value = item.id
            vip_now_money.value = item.pay_amount
        }
    })
}

const send_charge = () => {
    if (form.amount == 0) {
        Message.error('请输入充值金额')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            amount:form.amount,
            type:'charge',
            is_mobile:isMobile&& counter.setting.alipay_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }

            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else{
        wechat({
            amount:form.amount,
            type:'charge',
            is_mobile:isMobile&& counter.setting.wechat_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false

            console.log(err.message)
        })
    }

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
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
            coupon:form.kami,
            is_mobile:isMobile&& counter.setting.alipay_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'wechat'){
        wechat({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
            coupon:form.kami,
            is_mobile:isMobile&& counter.setting.wechat_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'balance'){
        qr_load.value = false
        qr_show.value = false
        buy_vip({
            v_id:vip_ids.value,
            coupon:form.kami,
        }).then((res:any) => {
            charge_loading.value = false
            Message.success(res._rawValue.message)
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else{
        Message.error('请选择支付方式')
    }
}

const is_vipor_charge = () => {
    if (activeName.value == 'first') {
        send_charge()
    }else{
        up_to_vip()
    }
}

const dialogm = ()=>{
    dialogFormVisible.value = false
}
</script>

<style scoped>

</style>
