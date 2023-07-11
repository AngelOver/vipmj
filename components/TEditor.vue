<template>
    <main>
        <p>{{ props.value }}</p>

        <editor placeholder="输入文本内容" v-model="content" :init="init" :disabled="disabled" :id="tinymceId"></editor>
    </main>
</template>
<script setup>
import {reactive,ref,onMounted,watch} from 'vue'

import  tinymce from 'tinymce/tinymce'
// import 'tinymce/skins/content/default/content.css'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'

import "tinymce/icons/default/icons"
import "tinymce/plugins/table"
import "tinymce/plugins/lists"
import "tinymce/plugins/wordcount"
import "tinymce/plugins/code"
const props = defineProps({
    content: {
        type: String,
        default: ""
    },
    select_text: {
        type: String,
        default: ""
    },
    ai_write_type: {
        type: String,
        default: ""
    },
    baseUrl: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    plugins: {
        type: [String, Array],
        default: "lists  table",
    },//必填
    toolbar: {
        type: [String, Array],
        default:
            "undo redo removeformat | codesample bold italic  underline | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify bullist numlist outdent indent | formatselect | fontselect | fontsizeselect | forecolor backcolor   ",
    },//必填
})
const emit = defineEmits(['getContent','selectText','aiType']) // 定义emit

//用于接收外部传递进来的富文本
const content = computed({
    get() {
        return props.content
    },
    set(val) {
        emit('getContent', val)
    }
})
const getContent = (v) => {
    content.value = v
}
const select_text = computed({
    get() {
        return props.select_text
    },
    set(val) {
        emit('selectText', val)
    }
})
const selectText = (v) => {
    select_text.value = v
}

const ai_write_type = computed({
    get() {
        return props.ai_write_type
    },
    set(val) {
        emit('aiType', val)
    }
})

const aiType = (v) => {
    ai_write_type.value = v
}
const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""))
//定义一个对象 init初始化
const init = reactive({
    selector: '#' + tinymceId.value, //富文本编辑器的id,
    language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
    language: "zh-Hans", //语言
    skin_url: "/tinymce/skins/ui/oxide", // skin路径，具体路径看自己的项目
    height: 400, //编辑器高度
    branding: false, //是否禁用“Powered by TinyMCE”
    menubar: false, //顶部菜单栏显示
    promotion: false,
    image_dimensions: false, //去除宽高属性
    plugins: props.plugins,  //这里的数据是在props里面就定义好了的
    toolbar: props.toolbar, //这里的数据是在props里面就定义好了的
    font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;', //字体
    fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
// paste_convert_word_fake_lists: false, // 插入word文档需要该属性
    paste_webkit_styles: "all",
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    file_picker_types: 'file',
    content_css: '/tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
    contextmenu: ['customMenu','customMenu2'], // 设置右键菜单为自定义菜单
    setup: function (editor) {
        // 其他设置

        // 添加自定义菜单项
        editor.ui.registry.addMenuItem("customMenu", {
            icon: "edit-block",
            text: "改写",
            onAction: function () {
                select_text.value = editor.selection.getContent({ format: "text" });
                ai_write_type.value = "content_change"
            },
        });
        editor.ui.registry.addMenuItem("customMenu2", {
            icon: "duplicate",
            text: "续写",
            onAction: function () {
                select_text.value = editor.selection.getContent({ format: "text" });
                ai_write_type.value = "content_long"
            },
        });
    },

    //图片上传
    images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {

        if (blobInfo.blob().size / 1024 / 1024 > 2) {
            reject({ message: '上传失败，图片大小请控制在 2M 以内', remove: true })
            return
        } else {
            const ph = import.meta.env.VITE_BASE_PATH + ":" + import.meta.env.VITE_SERVER_PORT + "/"
            let params = new FormData()
            params.append('file', blobInfo.blob())

            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",

                }
            }

        }
    }),
// 文件上传
    file_picker_callback: (callback, value, meta) => {
        // Provide file and text for the link dialog
        if (meta.filetype == 'file') {
            callback('mypage.html', { text: 'My text' });
        }

        // Provide image and alt text for the image dialog
        if (meta.filetype == 'image') {
            callback('myimage.jpg', { alt: 'My alt text' });
        }

        // Provide alternative source and posted for the media dialog
        if (meta.filetype == 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
        }
    }
})

//在onMounted中初始化编辑器
onMounted(() => {
    tinymce.init({})
})
</script>
