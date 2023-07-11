import{r as v,aj as j,ak as O,al as C,A as E,ad as B,h as b,am as M,an as R,ao as $,s as q,Z as A,u as F,M as x,J as H,ap as U,aq as z}from"./entry.f78ca6a6.js";const S=()=>null;function T(...e){const o=typeof e[e.length-1]=="string"?e.pop():void 0;typeof e[0]!="string"&&e.unshift(o);let[a,i,r={}]=e;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof i!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");r.server=r.server??!0,r.default=r.default??S,r.lazy=r.lazy??!1,r.immediate=r.immediate??!0;const s=B(),g=()=>s.isHydrating?s.payload.data[a]:s.static.data[a],_=()=>g()!==void 0;s._asyncData[a]||(s._asyncData[a]={data:v(g()??r.default()),pending:v(!_()),error:j(s.payload._errors,a),status:v("idle")});const n={...s._asyncData[a]};n.refresh=n.execute=(c={})=>{if(s._asyncDataPromises[a]){if(c.dedupe===!1)return s._asyncDataPromises[a];s._asyncDataPromises[a].cancelled=!0}if((c._initial||s.isHydrating&&c._initial!==!1)&&_())return g();n.pending.value=!0,n.status.value="pending";const l=new Promise((p,u)=>{try{p(i(s))}catch(y){u(y)}}).then(p=>{if(l.cancelled)return s._asyncDataPromises[a];let u=p;r.transform&&(u=r.transform(p)),r.pick&&(u=L(u,r.pick)),n.data.value=u,n.error.value=null,n.status.value="success"}).catch(p=>{if(l.cancelled)return s._asyncDataPromises[a];n.error.value=p,n.data.value=b(r.default()),n.status.value="error"}).finally(()=>{l.cancelled||(n.pending.value=!1,s.payload.data[a]=n.data.value,n.error.value&&(s.payload._errors[a]=M(n.error.value)),delete s._asyncDataPromises[a])});return s._asyncDataPromises[a]=l,s._asyncDataPromises[a]};const d=()=>n.refresh({_initial:!0}),k=r.server!==!1&&s.payload.serverRendered;{const c=R();if(c&&!c._nuxtOnBeforeMountCbs){c._nuxtOnBeforeMountCbs=[];const p=c._nuxtOnBeforeMountCbs;c&&(O(()=>{p.forEach(u=>{u()}),p.splice(0,p.length)}),C(()=>p.splice(0,p.length)))}k&&s.isHydrating&&_()?(n.pending.value=!1,n.status.value=n.error.value?"error":"success"):c&&(s.payload.serverRendered&&s.isHydrating||r.lazy)&&r.immediate?c._nuxtOnBeforeMountCbs.push(d):r.immediate&&d(),r.watch&&E(r.watch,()=>n.refresh());const l=s.hook("app:data:refresh",p=>{if(!p||p.includes(a))return n.refresh()});c&&C(l)}const h=Promise.resolve(s._asyncDataPromises[a]).then(()=>n);return Object.assign(h,n),h}function L(e,o){const a={};for(const i of o)a[i]=e[i];return a}function W(e,o,a){const[i={},r]=typeof o=="string"?[{},o]:[o,a],s=i.key||$([r,b(i.baseURL),typeof e=="string"?e:"",b(i.params||i.query)]);if(!s||typeof s!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+s);if(!e)throw new Error("[nuxt] [useFetch] request is missing.");const g=s===r?"$f"+s:s,_=q(()=>{let m=e;return typeof m=="function"&&(m=m()),b(m)});if(!i.baseURL&&typeof _.value=="string"&&_.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:n,lazy:d,default:k,transform:h,pick:c,watch:l,immediate:p,...u}=i,y=A({...u,cache:typeof i.cache=="boolean"?void 0:i.cache}),P={server:n,lazy:d,default:k,transform:h,pick:c,immediate:p,watch:l===!1?[]:[y,_,...l||[]]};let f;return T(g,()=>{var D;return(D=f==null?void 0:f.abort)==null||D.call(f),f=typeof AbortController<"u"?new AbortController:{},typeof _.value=="string"&&_.value.startsWith("/"),(i.$fetch||globalThis.$fetch)(_.value,{signal:f.signal,...y})},P)}const w=(e,o)=>{const i={Authorization:`Bearer ${F("token").value}`},{public:{baseUrl:r}}=H(),s=r+e;return new Promise(async(g,_)=>{W(s,{...o,headers:i},"$nIfBrkE4uq").then(({data:n,error:d})=>{n._rawValue?g(v(n)):(d.value.status==500?x.error("服务器错误"):x.error(d.value.data.message),_(d))}).catch(n=>{_(n)})})},t=new class{get(o,a){return w(o,{method:"get",params:a})}post(o,a){return w(o,{method:"post",params:a})}put(o,a){return w(o,{method:"put",body:a})}delete(o,a){return w(o,{method:"delete",body:a})}},N=e=>t.post("api/web_login",e),V=e=>t.post("api/register",e),Z=e=>t.post("api/get_message",e),G=e=>t.post("api/get_scene_f",e),Q=e=>t.post("api/check_message",e),X=e=>t.post("api/searchs",e),Y=e=>t.post("api/del_msg",e),ee=e=>t.post("api/update_user",e),te=()=>t.post("api/get_user"),se=e=>t.post("api/change_password",e),ae=e=>t.post("api/send_email",e),ne=e=>t.post("api/reset_password",e),re=e=>t.post("api/reset_password_phone",e),oe=e=>t.post("api/alipay",e),ie=e=>t.post("api/wechat",e),pe=()=>t.post("api/get_vip_level"),ce=e=>t.post("api/ai_draw_openai",e),_e=e=>t.post("api/ai_draw_dream",e),ue=e=>t.post("api/get_me_draw",e),le=e=>t.post("api/get_public_draw",e),de=e=>t.post("api/send_public",e),ge=e=>t.post("api/del_me_draw",e),fe=()=>t.post("api/invite_code"),me=e=>t.post("api/kami_check",e),he=()=>t.post("api/get_setting"),ye=e=>t.post("api/send_sms",e),we=e=>t.post("api/change_phone",e),ve=e=>t.post("api/change_email",e),be=e=>t.post("api/get_all_app",e),ke=e=>t.post("api/search_app",e),De=e=>t.post("api/app_like",e),Ce=e=>t.post("api/create_app",e),xe=e=>t.post("api/get_appid",e),Pe=()=>t.post("api/get_normal"),je=()=>t.post("api/get_app_qs"),Oe=e=>t.post("api/buy_vip",e),Ee=e=>t.post("api/scene_searchs",e),Be=e=>t.post("api/midjourney_ai",e),Me=e=>t.post("api/c_session_name",e),Re=()=>t.post("api/del_all"),$e=e=>t.post("api/get_ai_cate",e),qe=()=>t.post("api/signin_me"),Ae=()=>t.post("api/get_signin_info"),Fe=e=>t.post("api/up_midjourney",e),He=e=>t.post("api/vi_midjourney",e),Ue=e=>t.post("api/online",e),ze=()=>t.post("api/signin_check"),Se=()=>t.post("api/get_app_cate"),Te=()=>t.post("api/get_agreement_f"),Le=()=>t.post("api/get_user_limit"),We=e=>t.post("api/ai_collect",e),Ie=e=>t.post("api/get_me_all_app",e),Ke=e=>t.post("api/midjourney_ai_get",e),Je=()=>t.post("api/get_now_money"),Ne=()=>t.post("api/send_siwei_html"),Ve=()=>t.post("api/get_avatar_preset"),Ze=e=>t.post("api/c_avatar_session",e),Ge=e=>t.post("api/socials/wechat",e),Qe=()=>t.post("api/get_consum_limit"),Xe=e=>t.post("api/wechat_login_status",e),Ye=e=>t.post("api/wechat_bind_status",e),et=e=>t.post("api/generatePdf",e),tt=e=>t.post("api/gptpdf_generate",e),st=e=>t.post("api/pdf_message",e),at=e=>t.post("api/pdf_message_all",e),nt=e=>t.post("api/pdf_message_search",e),rt=e=>t.post("api/pdf_message_check",e),ot=()=>t.post("api/pdf_listdel_all"),it=()=>t.post("api/pdf_scene"),pt=()=>t.post("api/get_pdf_limit"),ct=e=>t.post("api/pdf_message_delete",e),_t=e=>t.post("api/c_pdf_title",e),ut=()=>t.post("api/get_nowContent"),lt=()=>t.post("api/get_allContent"),dt=e=>t.post("api/save_content",e),gt=e=>t.post("api/get_content",e),ft=e=>t.post("api/delete_content",e),mt=e=>t.post("api/rename_content",e),ht=e=>t.post("api/delete_message",e),yt=U("counter",{state:()=>({setting:{}}),actions:{increment(){this.setting}},getters:{doubleCount(){return this.setting}},persist:{storage:z.cookiesWithOptions({sameSite:"strict"}),paths:["setting"]}});export{ct as $,oe as A,ie as B,Oe as C,Z as D,Le as E,G as F,Pe as G,Me as H,et as I,Ze as J,X as K,ht as L,Ee as M,Q as N,Ue as O,Y as P,Re as Q,Ve as R,Ne as S,Ie as T,_t as U,pt as V,at as W,it as X,st as Y,nt as Z,rt as _,je as a,ot as a0,tt as a1,Se as a2,Ce as a3,he as a4,ne as a5,re as a6,ae as a7,ye as a8,Ge as a9,Ye as aa,te as ab,ze as ac,Qe as ad,Ae as ae,ee as af,se as ag,fe as ah,me as ai,we as aj,ve as ak,qe as al,N as am,Xe as an,V as ao,Te as ap,$e as b,De as c,We as d,Je as e,ue as f,be as g,le as h,ce as i,de as j,_e as k,Ke as l,Be as m,Fe as n,ge as o,lt as p,ut as q,ft as r,ke as s,mt as t,yt as u,He as v,xe as w,gt as x,dt as y,pe as z};
