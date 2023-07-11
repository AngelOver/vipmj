import{_ as T}from"./nuxt-link.b5f02e4c.js";import{d as $,u as q,r as m,Z as z,b as _,o as b,c as y,e,g as o,w as d,h as N,j as W,M as i,f as B,O as D,I as E,F as Z,l as K,i as Q,J as X}from"./entry.f78ca6a6.js";import{u as Y,a2 as ee,a3 as te}from"./counter.a6829455.js";import{m as F,H as G}from"./index.08a9178a.js";const se={class:"main overflow-auto ai-app-product"},ae={class:"w-full bg-slate-50 pb-20"},le={class:"mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8"},oe={class:"flex","aria-label":"Breadcrumb"},ie={role:"list",class:"flex items-center space-x-4"},ne=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",class:"h-5 w-5 flex-shrink-0"},[e("path",{"fill-rule":"evenodd",d:"M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z","clip-rule":"evenodd"})],-1),re=e("span",{class:""},"应用列表",-1),ce={class:"flex items-center"},de=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",class:"h-5 w-5 flex-shrink-0 text-gray-400"},[e("path",{"fill-rule":"evenodd",d:"M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z","clip-rule":"evenodd"})],-1),ue={class:"bg-slate-50 pt-10"},pe={class:"mx-auto min-h-screen max-w-xl"},me=e("h1",{class:"py-10 text-center text-2xl font-semibold text-gray-900"},"创建应用",-1),_e={class:"space-y-6"},fe={class:"bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6"},ge={class:"mt-5 space-y-6 md:col-span-2 md:mt-0"},he={class:"grid grid-cols-3 gap-6"},ve={class:"col-span-3 sm:col-span-2"},xe=e("label",{class:"block text-sm font-medium leading-6 text-gray-900"},"图标",-1),be={class:"relative","data-headlessui-state":""},we={type:"button","aria-expanded":"false","data-headlessui-state":"",id:"headlessui-popover-button-:r2f:"},ye={class:"inline-flex rounded-lg"},ke={class:"flex h-100 w-100 items-center justify-center","aria-hidden":"true"},Ve={key:0,class:"arco-upload-list-picture custom-upload-avatar"},Ne=["src"],Be={class:"arco-upload-list-picture-mask"},Ce={key:1,class:"arco-upload-picture-card"},Ue={class:"arco-upload-picture-card-text"},Je=e("div",{style:{"margin-top":"10px","font-weight":"600"}},"Upload",-1),Pe=e("p",{class:"mt-2 text-sm text-red-500"},null,-1),ze=e("p",{class:"mt-2 text-sm text-gray-500"},"仅支持PNG/JPG/GIF图片",-1),Fe={class:"grid grid-cols-3 gap-6"},Ge={class:"col-span-3 sm:col-span-2"},Ie=e("label",{class:"block text-sm font-medium leading-6 text-gray-900"},"应用名称",-1),Me={class:"mt-2 flex rounded-md shadow-sm"},Re=e("p",{class:"mt-2 text-sm text-red-500"},null,-1),je={class:"grid grid-cols-3 gap-6"},He={class:"col-span-3 sm:col-span-2"},Le=e("label",{class:"block text-sm font-medium leading-6 text-gray-900"},"选择分类",-1),Se={class:"mt-2 flex"},Oe={class:"grid grid-cols-1 gap-6"},Ae={class:"col-span-6 sm:col-span-6"},Te=e("label",{class:"block text-sm font-medium leading-6 text-gray-900"},"应用描述",-1),$e={class:"mt-2"},qe=e("p",{class:"mt-2 text-sm text-red-500"},null,-1),We={class:"grid grid-cols-3 gap-6"},De={class:"col-span-3 sm:col-span-2"},Ee=e("label",{class:"block text-sm font-medium leading-6 text-gray-900"},"指令",-1),Ze={class:"mt-2 flex rounded-md shadow-sm"},Ke=e("p",{class:"mt-2 text-sm text-red-500"},null,-1),Qe=e("p",{class:"mt-2 text-sm text-gray-500"}," 指令需清晰易懂，明确且有逻辑。",-1),Xe={class:"grid grid-cols-3 gap-6"},Ye={class:"col-span-3 sm:col-span-2"},et=e("label",{class:"block text-sm font-medium leading-6 text-gray-900"},"示例输入",-1),tt={class:"mt-2 flex rounded-md shadow-sm"},st=e("p",{class:"mt-2 text-sm text-red-500"},null,-1),at={class:"flex justify-end gap-3 px-4 sm:px-0"},lt=e("div",{class:"my-10 w-full space-y-10"},null,-1),ot=["innerHTML"],mt=$({__name:"product",setup(it){const C=q("token"),I=Y().setting.APP_URL+"/api/upload_icon",f=m(""),U=m(),M=t=>F({highlight:(s,u)=>{if(u&&G.getLanguage(u))try{return`<pre class="hljs"><code>${G.highlight(s,{language:u,ignoreIllegals:!0}).value}</code></pre>`}catch{}return`<pre class="hljs"><code>${F().utils.escapeHtml(s)}</code></pre>`},breaks:!0}).render(t),g=m(""),l=z({title:"",description:"",code:"",cate:""});z({title:[{required:!0,message:"请输入应用名称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],description:[{min:2,max:300,message:"长度在 2 到 300 个字符",trigger:"blur"}],code:[{required:!0,message:"请输入指令",trigger:"blur"},{min:2,max:300,message:"长度在 2 到 300 个字符",trigger:"blur"}],cate:[{required:!0,message:"请选择分类",trigger:"blur"}]});const w=m(""),J=m([]);(()=>{ee().then(t=>{J.value=t._rawValue.data}).catch(t=>{console.log(t)})})();const R=t=>{const s=t.type==="image/jpeg",u=t.type==="image/png",v=t.type==="image/gif",x=t.size/1024/1024<5;return!s&&!u&&!v?(i.error("上传图片只能是 JPG/PNG/GIF 格式!"),!1):x?!0:(i.error("上传图片大小不能超过 5MB!"),!1)},j=t=>{if(t.response.status!=200){i.error("上传失败!");return}i.success("上传成功!"),f.value=t.response.data,console.log(f.value)},H=()=>{if(!f.value){i.error("请上传图标!");return}if(!l.title){i.error("请输入应用名称!");return}if(!l.description){i.error("请输入应用描述!");return}if(!l.code){i.error("请输入指令!");return}if(!l.cate){i.error("请选择分类!");return}if(!g.value)return i.error("请输入示例输入"),!1;te({title:l.title,description:l.description,code:l.code,icon:f.value,test_input:g.value,cate:JSON.stringify(l.cate)}).then(t=>{i.success(t._rawValue.message),f.value="",U.value.resetFields(),g.value=""}).catch(t=>{console.log(t)})};m(1);const{public:{baseUrl:L}}=X(),S={Authorization:`Bearer ${C.value}`,Accept:"text/event-stream"},k=m(),h=m(!1),O=async()=>{var x;if(!l.code)return i.error("请输入指令"),!1;if(!g.value)return i.error("请输入示例输入"),!1;w.value="",h.value=!0;const t=await fetch(`${L}api/test_app`,{method:"POST",headers:S,body:JSON.stringify({code:l.code,test_input:g.value})});if(t.status==500)return h.value=!1,i.error("服务器错误"),!1;if(t.status==401)return h.value=!1,i.error("请先登录"),!1;if(t.status==402)return h.value=!1,i.error("发送次数已达上限或余额不足"),!1;if(t.status==403)return h.value=!1,i.error("禁止发送违禁词"),!1;const s=(x=t.body)==null?void 0:x.getReader(),u=({value:c})=>{let n=new TextDecoder().decode(c).split(`

`).map(a=>a.replace(/\n/g,"")),p=[];for(let a=0;a<n.length;a++)if(n[a].slice(-2)=="]}"&&n[a].startsWith("data:"))p.push(JSON.parse(n[a].replace("data:","")));else if(n[a].startsWith("data:")&&n[a].slice(-2)!="]}")k.value=n[a].replace("data:","");else if(n[a].slice(-2)=="]}"&&n[a].startsWith("data:")==!1){let V=k.value+=n[a];p.push(JSON.parse(V.replace("data:",""))),k.value=""}else n[a].includes('"error"')&&(w.value=JSON.parse(n[a]).error.message),k.value="";for(let a=0;a<p.length;a++)setTimeout(()=>{p[a].choices[0].delta.content&&(w.value+=p[a].choices[0].delta.content)},100)},v=async()=>{const c=await(s==null?void 0:s.read());c!=null&&c.done?(h.value=!1,console.log("done")):(u(c),await v())};await v()};return(t,s)=>{const u=T,v=_("a-upload"),x=_("a-input"),c=_("a-form-item"),P=_("a-option"),n=_("a-select"),p=_("a-textarea"),a=_("a-form"),V=_("a-button");return b(),y("main",se,[e("div",ae,[e("div",le,[e("div",null,[e("nav",oe,[e("ol",ie,[e("li",null,[e("div",null,[o(u,{class:"flex items-center gap-2 text-sm text-gray-400 hover:text-gray-500",to:"/ai_application"},{default:d(()=>[ne,re]),_:1})])]),e("li",null,[e("div",ce,[de,o(u,{to:"/users/product",class:"ml-4 text-sm font-medium text-gray-500 hover:text-gray-700","aria-current":"page"},{default:d(()=>[B("创建应用 ")]),_:1})])])])]),e("div",ue,[e("div",pe,[me,e("form",_e,[e("div",fe,[e("div",ge,[e("div",he,[e("div",ve,[xe,e("div",be,[e("button",we,[e("span",ye,[e("div",ke,[o(v,{class:"avatar-uploader",action:I,"show-file-list":!1,headers:{Authorization:"Bearer "+N(C)},onBeforeUpload:R,onSuccess:j},{"upload-button":d(()=>[e("div",null,[f.value?(b(),y("div",Ve,[e("img",{src:f.value},null,8,Ne),e("div",Be,[o(N(D))])])):(b(),y("div",Ce,[e("div",Ue,[o(N(E)),Je])]))])]),_:1},8,["headers"])])])])]),Pe,ze])]),o(a,{ref_key:"ruleFormRef",ref:U,model:l,class:"demo-ruleForm","status-icon":""},{default:d(()=>[o(c,{"hide-label":!0,field:"title"},{default:d(()=>[e("div",Fe,[e("div",Ge,[Ie,e("div",Me,[o(x,{modelValue:l.title,"onUpdate:modelValue":s[0]||(s[0]=r=>l.title=r),class:"block w-full flex-1 bg-white shadow-sm",placeholder:"智能翻译助手",name:"name"},null,8,["modelValue"])]),Re])])]),_:1}),o(c,{"hide-label":!0,field:"cate"},{default:d(()=>[e("div",je,[e("div",He,[Le,e("div",Se,[o(n,{modelValue:l.cate,"onUpdate:modelValue":s[1]||(s[1]=r=>l.cate=r),multiple:"",placeholder:"选择分类",style:{width:"240px"}},{default:d(()=>[(b(!0),y(Z,null,K(J.value,(r,A)=>(b(),Q(P,{key:A,label:r.title,value:r.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])])]),_:1}),o(c,{"hide-label":!0,field:"description"},{default:d(()=>[e("div",Oe,[e("div",Ae,[Te,e("div",$e,[o(p,{"auto-size":{minRows:3,maxRows:5},modelValue:l.description,"onUpdate:modelValue":s[2]||(s[2]=r=>l.description=r),class:"block w-full flex-1 bg-white shadow-sm",placeholder:"这款 App 可以将任意语言的内容，翻译成中文",name:"description"},null,8,["modelValue"])]),qe])])]),_:1}),o(c,{"hide-label":!0,field:"code"},{default:d(()=>[e("div",We,[e("div",De,[Ee,e("div",Ze,[o(p,{"auto-size":{minRows:3,maxRows:5},modelValue:l.code,"onUpdate:modelValue":s[3]||(s[3]=r=>l.code=r),class:"block w-full flex-1 bg-white shadow-sm",placeholder:"你是一个翻译官，无论接下来输入什么，你都要翻译成中文。内容是：",name:"prompt"},null,8,["modelValue"])]),Ke,Qe])])]),_:1}),e("div",Xe,[e("div",Ye,[et,e("div",tt,[o(x,{modelValue:g.value,"onUpdate:modelValue":s[4]||(s[4]=r=>g.value=r),class:"block w-full flex-1 bg-white shadow-sm",placeholder:"你会说中文吗？",name:"demoInput"},null,8,["modelValue"])]),st])])]),_:1},8,["model"])])]),e("div",at,[o(V,{onClick:s[5]||(s[5]=r=>O()),loading:h.value,size:"large",type:"info",class:"group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"},{default:d(()=>[B("测试 ")]),_:1},8,["loading"]),o(V,{onClick:s[6]||(s[6]=r=>H()),class:"group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",size:"large",type:"primary"},{default:d(()=>[B("创建 ")]),_:1})]),lt,w.value?(b(),y("div",{key:0,class:"bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6",innerHTML:M(w.value).replace(/\\n/g,`
`)},null,8,ot)):W("",!0)])])])])])])])}}});export{mt as default};
