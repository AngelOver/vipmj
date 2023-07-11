<template>
    <div style="width: 330px; margin-left: 1px;"
         class="relative pt-4 py-3flex h-full flex-col bg-[#fafbfc] draw-list-left flex justify-content-between pb-0"
    >

        <div class="ai-writer__left-panel p-2 overflow-auto">
            <div class="editor-panel__title-wrap"><h4 class="editor-panel__title">思维导图</h4></div>

            <div class="left-panel-setting-block">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 帮我写</div>
                </div>
                <a-textarea
                    v-model="mark_ai"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                    placeholder="请输入简单的描述，AI将智能输出markdown内容"
                />
                <a-button type="primary" class="w-100 mt-2 mb-2" :loading="up_des_load" @click="send_siwei()">
                    生成思维导图描述
                </a-button>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 内容需求</div>
                    <div class="ai-writer__panel-section__optional fs-6 cursor-pointer" @click="insertC()">
                        试试示例
                    </div>
                </div>
                <a-textarea
                    v-model="mark_value"
                    :auto-size="{ minRows: 10, maxRows: 20 }"
                    placeholder="请输入markdown的内容"
                />
            </div>
        </div>

        <div class="left-panel-footer  p-2">
            <div class="left-panel-footer__tips mb-2">
                <div class="left-panel-footer__spend-tip"><img
                    src="@/assets/images/jifen.png"
                    class="left-panel-footer__icon mr-2"> 消耗{{ siwei_limit }}额度（共{{ user_balance }}额度）
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
            <div class="left-panel-footer__button-group">
                <a-button @click="saveHtml()" type="primary" size="large" :disabled="send_load">导出HTML
                </a-button>
                <a-button @click="savePNG()" type="primary" status="warning" size="large" :disabled="send_load">导出PNG
                </a-button>
                <a-button @click="saveJPG()" type="primary" status="danger" size="large" :disabled="send_load">导出JPG
                </a-button>
            </div>
        </div>

    </div>
    <div class="editor-panel__content flex-1 mark_ai">
        <div class="main xl:pb-0 ai-siwei">
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
            <!--new mark me-->
            <div class="editor-panel">
                <div class="editor-panel__right-panel">
                    <div class="ai-generate-area">
                        <div class="generate-result-area">
                            <div class="generate-result-area__container">
                                <div class="generate-empty absolute" v-show="!mark_value"><img
                                    src="@/assets/images/siwei.svg"
                                    class="generate-empty__img">
                                    <div class="generate-empty__title">暂无思维导图生成</div>
                                    <div class="generate-empty__desc">快去左侧输入你的思维描述吧~</div>
                                </div>
                                <div class="relative h-full w-full">
                                    <client-only>
                                        <svg id="markmap" class="w-full h-full markmap mm-dwm9rn-1"></svg>
                                    </client-only>
                                </div>


                                <div
                                    class="generate-result-area__text-input-area generate-result-area__text-input-area--result"
                                    style="display: none;"><textarea readonly="readonly"></textarea></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a-drawer
                v-model:visible="drawer"
                title="配置"
                placement="left"
                class="left_siwei"
                width="80%"
            >
                <div class="editor-panel__title-wrap p-2"><h4 class="editor-panel__title">思维导图</h4></div>
                <div class="ai-writer__left-panel p-2 overflow-auto">
                    <div class="left-panel-setting-block">
                        <div class="left-panel-setting-block__header">
                            <div class="left-panel-setting-block__title fs-5"> 帮我写</div>
                        </div>
                        <a-textarea
                            v-model="mark_ai"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            placeholder="请输入简单的描述，AI将智能输出markdown内容"
                        />
                        <a-button type="primary" class="w-100 mt-2 mb-2" :loading="up_des_load" @click="send_siwei()">
                            生成思维导图描述
                        </a-button>
                        <div class="left-panel-setting-block__header">
                            <div class="left-panel-setting-block__title fs-5"> 内容需求</div>
                            <div class="ai-writer__panel-section__optional fs-6 cursor-pointer" @click="insertC()">
                                试试示例
                            </div>
                        </div>
                        <a-textarea
                            v-model="mark_value"
                            :auto-size="{ minRows: 10, maxRows: 20 }"
                            placeholder="请输入markdown的内容"
                        />
                    </div>
                </div>
                <template #footer>
                    <div class="left-panel-footer  p-2">
                        <div class="left-panel-footer__tips mb-2">
                            <div class="left-panel-footer__spend-tip"><img
                                src="@/assets/images/jifen.png"
                                class="left-panel-footer__icon mr-2"> 消耗{{ siwei_limit }}额度（共{{ user_balance }}额度）
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
                        <div class="left-panel-footer__button-group">
                            <a-button @click="saveHtml()" type="primary" size="large" :disabled="send_load">导出HTML
                            </a-button>
                            <a-button @click="savePNG()" type="primary" status="warning" size="large"
                                      :disabled="send_load">导出PNG
                            </a-button>
                            <a-button @click="saveJPG()" type="primary" status="danger" size="large"
                                      :disabled="send_load">导出JPG
                            </a-button>
                        </div>
                    </div>

                </template>

            </a-drawer>
            <!--end-->
        </div>
    </div>

</template>
<script setup lang="ts">
import {ref} from "vue";
import {Transformer} from 'markmap-lib';
import {Markmap, loadCSS, loadJS} from 'markmap-view';
import {Message} from "@arco-design/web-vue";

import html2canvas from 'html2canvas';
import fileSaver from 'file-saver';
import {useCounter} from '~/store/counter'
import {IconMenuUnfold} from "@arco-design/web-vue/es/icon";

const counter = useCounter()
useHead({
    title: '思维导图 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const mark_value = ref();
const transformer = new Transformer();
const {root, features} = transformer.transform(mark_value.value);
let mm;
const update = () => {
    const {root, features} = transformer.transform(mark_value.value);
    mm.setData(root);
    mm.fit();

};
const {styles, scripts} = transformer.getUsedAssets(features);

if (process.client) {
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, {getMarkmap: () => markmap});
}

watch(mark_value, (newVal, oldVal) => {
    if (newVal != '') {
        update();
    }
});
onMounted(async () => {
    await nextTick();
    mm = Markmap.create('#markmap'); // -> returns a Markmap instance
});
const insertC = () => {
    mark_value.value = `
---
markmap:
  color:
    - blue
  # other options
---
`;
}
const send_load = ref(false)
const up_des_load = ref(false)
const drawer = ref(false)
const mark_ai = ref('')
const saveHtml = () => {
    send_load.value = true
    send_siwei_html().then(res => {
        const svg = document.querySelector('#markmap');
        let html = svg.outerHTML;
        html += '<style>#markmap{height:100vh;width:100%}</style>';
        const blob = new Blob([html], {type: 'text/html'});
        const a = document.createElement('a');
        a.download = 'markmap.html';
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
        get_user_balance()
        send_load.value = false
        Message.success(res._rawValue.message)
    }).catch(err => {
        send_load.value = false
        console.log(err)
    })
}
const colorMode = useColorMode()

const savePNG = async () => {
    send_load.value = true
    send_siwei_html().then(async res => {
        const svg = document.querySelector('.generate-result-area__container');
        const html = svg.outerHTML;

        if (colorMode.preference == 'dark') {
            svg.style.backgroundColor = 'black';
        } else if (colorMode.preference == 'light'){
            svg.style.backgroundColor = '#fff';
        }
        const canvas = await html2canvas(<HTMLElement>svg); // 将SVG转换成Canvas元素
        canvas.toBlob((blob) => { // 将Canvas元素转换成Blob对象
            fileSaver.saveAs(blob, 'md.png'); // 使用file-saver库保存为PNG格式的图片文件
        });
        get_user_balance()
        send_load.value = false
        Message.success(res._rawValue.message)
    }).catch(err => {
        send_load.value = false
        console.log(err)
    })
}

const saveJPG = async () => {
    send_load.value = true
    send_siwei_html().then(async res => {

        const svg = document.querySelector('.generate-result-area__container');
        const html = svg.outerHTML;
        if (colorMode.preference == 'dark') {
            svg.style.backgroundColor = 'black';
        } else if (colorMode.preference == 'light'){
            svg.style.backgroundColor = '#fff';
        }
        const canvas = await html2canvas(<HTMLElement>svg); // 将SVG转换成Canvas元素
        canvas.toBlob((blob) => { // 将Canvas元素转换成Blob对象
            fileSaver.saveAs(blob, 'md.jpg'); // 使用file-saver库保存为PNG格式的图片文件
        });
        get_user_balance()
        send_load.value = false
        Message.success(res._rawValue.message)
    }).catch(err => {
        send_load.value = false
        console.log(err)
    })
}
const siwei_limit = ref(0)
const user_balance = ref(0)
const get_user_balance = () => {
    get_siwei_limit().then(res => {
        siwei_limit.value = res._rawValue.siwei
        user_balance.value = res._rawValue.data
    })
}
get_user_balance()
const change_drawer = () => {
    drawer.value = true
}
const token = useCookie('token')
const {public: {baseUrl}} = useRuntimeConfig()
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const streams = ref()
const last_content = ref('')
const send_siwei = async () => {
    if (mark_ai.value == '') {
        Message.error('请输入内容')
        return false
    }
    mark_value.value = ''
    last_content.value = ''
    up_des_load.value = true
    const res = await fetch(`${baseUrl}api/siwei_send`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            content: mark_ai.value,
            type: 'siwei'
        }),

    })

    if (res.status == 500) {
        up_des_load.value = false
        Message.error('服务器错误')
        return false
    }
    if (res.status == 401) {
        up_des_load.value = false
        Message.error('请先登录')
        return false
    }
    if (res.status == 402) {
        up_des_load.value = false
        Message.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status == 403) {
        up_des_load.value = false
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
                    last_content.value = JSON.parse(arr[i]).error.message
                }
                streams.value = ''
            }

        }


        // console.log(new_arr)
        for (let i = 0; i < new_arr.length; i++) {
            setTimeout(() => {
                if (new_arr[i].choices[0].delta.content) {
                    last_content.value += new_arr[i].choices[0].delta.content
                    mark_value.value = last_content.value
                }
            }, 100)

        }

    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            up_des_load.value = false
            mark_ai.value = ''
            console.log('done')

        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}
</script>
<style scoped>

</style>
