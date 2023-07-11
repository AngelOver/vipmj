import Http from '@/utils/request'

export const send = (params: any) => {
    return Http.post('api/send_bot', params)
}



export const logins = (params: any) => {
    return Http.post('api/web_login', params)
}
export const register = (params: any) => {
    return Http.post('api/register', params)
}

export const get_message = (params: any) => {
    return Http.post('api/get_message',params)
}

export const get_scene_f = (params: any) => {
    return Http.post('api/get_scene_f',params)
}
export const c_message = (params: any) => {
    return Http.post('api/check_message', params)
}

export const searchs = (params: any) => {
    return Http.post('api/searchs', params)
}

export const del_msg = (params: any) => {
    return Http.post('api/del_msg', params)
}

export const update_user = (params: any) => {
    return Http.post('api/update_user', params)
}

export const get_user = () => {
    return Http.post('api/get_user')
}
export const change_password = (params: any) => {
    return Http.post('api/change_password', params)
}

export const send_email = (params: any) => {
    return Http.post('api/send_email', params)
}

export const reset_password = (params: any) => {
    return Http.post('api/reset_password', params)
}
export const reset_password_phone = (params: any) => {
    return Http.post('api/reset_password_phone', params)
}
export const alipay = (params: any) => {
    return Http.post('api/alipay', params)
}


export const wechat = (params: any) => {
    return Http.post('api/wechat', params)
}

export const get_vip_show = () => {
    return Http.post('api/get_vip_level')
}

export const ai_draw_openai = (params:any) => {
    return Http.post('api/ai_draw_openai',params)
}

export const ai_draw_dream = (params:any) => {
    return Http.post('api/ai_draw_dream',params)
}
export const get_me_draw = (params:any) => {
    return Http.post('api/get_me_draw',params)
}

export const get_public_draw = (params:any) => {
    return Http.post('api/get_public_draw',params)
}

export const send_public = (params:any) => {
    return Http.post('api/send_public',params)
}

export const del_me_d = (params:any) => {
    return Http.post('api/del_me_draw',params)
}




export const invite_code_send = () => {
    return Http.post('api/invite_code')
}

export const kami_send = (params:any) => {
    return Http.post('api/kami_check',params)
}


export const get_nav_config = () => {
    return Http.post('api/get_setting')
}

export const send_phone_code = (params:any) => {
    return Http.post('api/send_sms',params)
}

export const change_phone = (params:any) => {
    return Http.post('api/change_phone',params)
}

export const change_email = (params:any) => {
    return Http.post('api/change_email',params)
}


export const get_all_app = (params:any) => {
    return Http.post('api/get_all_app',params)
}

export const search_app = (params:any) => {
    return Http.post('api/search_app',params)
}

export const app_like = (params:any) => {
    return Http.post('api/app_like',params)
}

export const create_apps = (params:any) => {
    return Http.post('api/create_app',params)
}

export const get_appid = (params:any) => {
    return Http.post('api/get_appid',params)
}

export const get_normal = () => {
    return Http.post('api/get_normal')
}

export const get_app_qs = () => {
    return Http.post('api/get_app_qs')
}

export const buy_vip = (params:any) => {
    return Http.post('api/buy_vip',params)
}

export const scene_searchs = (params:any) => {
    return Http.post('api/scene_searchs',params)
}

export const midj_ai_draw = (params:any) => {
    return Http.post('api/midjourney_ai',params)
}

export const c_session_name = (params:any) => {
    return Http.post('api/c_session_name',params)
}

export const del_all = () => {
    return Http.post('api/del_all')
}

export const get_ai_cate = (params:any) => {
    return Http.post('api/get_ai_cate',params)
}
export const get_all_aicate = () => {
    return Http.post('api/get_all_aicate')
}

export const signin_me = () => {
    return Http.post('api/signin_me')
}

export const get_signin_info = () => {
    return Http.post('api/get_signin_info')
}

export const up_midj_index = (params:any) => {
    return Http.post('api/up_midjourney',params)
}

export const v_midj_index = (params:any) => {
    return Http.post('api/vi_midjourney',params)
}

export const chat_online = (params:any) => {
    return Http.post('api/online',params)
}

export const signin_check = () => {
    return Http.post('api/signin_check')
}

export const get_app_cate = () => {
    return Http.post('api/get_app_cate')
}


export const get_agreement_f = () => {
    return Http.post('api/get_agreement_f')
}
export const get_user_limit = () => {
    return Http.post('api/get_user_limit')
}

export const ai_collect = (params:any) => {
    return Http.post('api/ai_collect',params)
}


export const get_me_all_app = (params:any) => {
    return Http.post('api/get_me_all_app',params)
}

export const midj_ai_check = (params:any) => {
    return Http.post('api/midjourney_ai_get',params)
}

export const get_siwei_limit = () => {
    return Http.post('api/get_now_money')
}

export const send_siwei_html = () => {
    return Http.post('api/send_siwei_html')
}
export const weixin_login = () => {
    return Http.post('api/socials/wechat')
}

export const get_avatar_preset = () => {
    return Http.post('api/get_avatar_preset')
}

export const c_avatar_session = (params:any) => {
    return Http.post('api/c_avatar_session',params)
}
export const wechat_login_url = (params:any) => {
    return Http.post('api/socials/wechat',params)
}


export const get_consum_limit = () => {
    return Http.post('api/get_consum_limit')
}
export const wechat_login_status = (params:any) => {
    return Http.post('api/wechat_login_status',params)
}

export const wechat_bind_status = (params:any) => {
    return Http.post('api/wechat_bind_status',params)
}

export const generatePdf = (params:any) => {
    return Http.post('api/generatePdf',params)
}

export const gptpdf_generate = (params:any) => {
    return Http.post('api/gptpdf_generate',params)
}

export const pdf_message = (params:any) => {
    return Http.post('api/pdf_message',params)
}

export const pdf_message_all = (params:any) => {
    return Http.post('api/pdf_message_all',params)
}
export const pdf_message_search = (params:any) => {
    return Http.post('api/pdf_message_search',params)
}

export const pdf_message_check = (params:any) => {
    return Http.post('api/pdf_message_check',params)
}


export const pdf_listdel_all = () => {
    return Http.post('api/pdf_listdel_all')
}
export const pdf_scene = () => {
    return Http.post('api/pdf_scene')
}

export const get_pdf_limit = () => {
    return Http.post('api/get_pdf_limit')
}

export const pdf_message_delete = (params:any) => {
    return Http.post('api/pdf_message_delete',params)
}
export const c_pdf_title = (params:any) => {
    return Http.post('api/c_pdf_title',params)
}

export const get_nowContent = () => {
    return Http.post('api/get_nowContent')
}

export const get_allContent = () => {
    return Http.post('api/get_allContent')
}

export const save_content = (params:any) => {
    return Http.post('api/save_content',params)
}

export const get_content = (params:any) => {
    return Http.post('api/get_content',params)
}

export const delete_content = (params:any) => {
    return Http.post('api/delete_content',params)
}

export const rename_content = (params:any) => {
    return Http.post('api/rename_content',params)
}

export const delete_message = (params:any) => {
    return Http.post('api/delete_message',params)
}
