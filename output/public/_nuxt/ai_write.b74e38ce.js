import{_ as K}from"./nuxt-link.b5f02e4c.js";import{p as T,d as M,q as Z,s as B,x as J,o as v,c as N,n as q,y as Q,e,a as X,K as Y,u as ee,r as b,b as d,g as t,w as s,i as S,L as te,F as se,l as ne,t as R,h as g,N as oe,f as x,O as le,G as ae,P as ie,M as L}from"./entry.f78ca6a6.js";import{u as ce,p as re,q as _e,r as de,t as ue}from"./counter.a6829455.js";import{_ as pe,a as me,b as he,c as fe}from"./gousi.79d2858e.js";import{a as ge}from"./index.0076fffa.js";import{f as ve}from"./FileSaver.min.08c6a7a6.js";import{I as we}from"./index.c95ca7e3.js";const ke=M({name:"IconSwap",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:l=>["butt","round","square"].includes(l)},strokeLinejoin:{type:String,default:"miter",validator:l=>["arcs","bevel","miter","miter-clip","round"].includes(l)},rotate:Number,spin:Boolean},emits:{click:l=>!0},setup(l,{emit:r}){const c=Z("icon"),f=B(()=>[c,`${c}-swap`,{[`${c}-spin`]:l.spin}]),p=B(()=>{const i={};return l.size&&(i.fontSize=J(l.size)?`${l.size}px`:l.size),l.rotate&&(i.transform=`rotate(${l.rotate}deg)`),i});return{cls:f,innerStyle:p,onClick:i=>{r("click",i)}}}}),be=["stroke-width","stroke-linecap","stroke-linejoin"],xe=e("path",{d:"M5 17h35.586c.89 0 1.337-1.077.707-1.707L33 7M43 31H7.414c-.89 0-1.337 1.077-.707 1.707L15 41"},null,-1),Ce=[xe];function ye(l,r,c,f,p,w){return v(),N("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:q(l.cls),style:Q(l.innerStyle),"stroke-width":l.strokeWidth,"stroke-linecap":l.strokeLinecap,"stroke-linejoin":l.strokeLinejoin,onClick:r[0]||(r[0]=(...i)=>l.onClick&&l.onClick(...i))},Ce,14,be)}var j=T(ke,[["render",ye]]);const $e=Object.assign(j,{install:(l,r)=>{var c;const f=(c=r==null?void 0:r.iconPrefix)!=null?c:"";l.component(f+j.name,j)}}),Ie=""+new URL("text.95a1ad70.png",import.meta.url).href,Se=""+new URL("ai_chat.1892573e.png",import.meta.url).href,Le=""+new URL("file.e2086035.png",import.meta.url).href,je={class:"main overflow-auto ai-write"},Ne=te('<h1 class="mx-auto text-center max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"> Ai <span class="relative whitespace-nowrap text-blue-600"><svg aria-hidden="true" viewBox="0 0 418 42" class="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg><span class="relative">写作</span></span>便利服务 <span class="block mt-5 text-center font-18">AI写作便利服务是一种基于人工智能技术的解决方案，旨在为用户提供高效、便捷的写作帮助。该服务通过深度学习和自然语言处理技术，具备智能理解、创作和优化文本的能力。</span></h1>',1),ze={class:"content_tencent m-6"},Ve=e("h3",{class:"mb-3"},"快速访问",-1),Ae={class:"content_card mb-4"},Be={class:"flex items-center justify-between"},Re={class:"flex items-center"},Me=e("img",{src:Ie,alt:"新建文稿",class:"mr-3 w-14"},null,-1),qe=e("h5",null,"新建文稿",-1),Ue=e("p",null,"新建空白文档进行创作",-1),Pe={class:"flex items-center justify-between"},Oe={class:"flex items-center"},De=e("img",{src:Se,alt:"Ai快速稿件",class:"mr-3 w-14"},null,-1),Ee=e("h5",null,"AI功能稿",-1),Fe=e("p",null,"使用AI功能进行辅助开放思维",-1),He=e("h3",{class:"mb-3"},"热门模版",-1),We={class:"content_mode mb-4"},Ge={class:"flex items-center justify-between"},Ke={class:"flex item-center"},Te=e("img",{src:pe,alt:"内容修改",class:"mr-3 w-14"},null,-1),Ze=e("h5",null,"内容修改",-1),Je=e("p",null,"修改某段文章段落内容，保留原意操作",-1),Qe={class:"flex items-center justify-between"},Xe={class:"flex items-center"},Ye=e("img",{src:me,alt:"句子续写",class:"mr-3 w-14"},null,-1),et=e("h5",null,"句子续写",-1),tt=e("p",null,"根据上下文句子延续写作创新",-1),st={class:"flex items-center justify-between"},nt={class:"flex items-center"},ot=e("img",{src:he,alt:"风格润色",class:"mr-3 w-14"},null,-1),lt=e("h5",null,"风格润色",-1),at=e("p",null,"修改当前内容的整体写作风格",-1),it={class:"flex items-center justify-between"},ct={class:"flex items-center"},rt=e("img",{src:fe,alt:"创意故事",class:"mr-3 w-14"},null,-1),_t=e("h5",null,"创意故事",-1),dt=e("p",null,"帮你构思一个创意",-1),ut=e("h3",{class:"mb-3"},"最近文件",-1),pt={class:"content_me"},mt={class:"flex items-center justify-between"},ht={class:"flex items-center"},ft=e("img",{src:Le,alt:"未命名标题",class:"mr-3 w-14"},null,-1),gt={class:"text-gray-400"},$t=M({__name:"ai_write",setup(l){const r=ce();X({title:"AI写作 - "+r.setting.title,meta:[{name:"description",content:r.setting.description},{name:"keywords",content:r.setting.keywords}]});const c=Y(),f=ee("token"),p=b(0),w=b([]),i=o=>{console.log(o),_e().then(n=>{p.value=n._rawValue.data,o=="new"?c.push({path:"/editor/"+p.value.id}):o=="ai_write"&&c.push({path:"/editor/"+p.value.id,query:{ai_write:"true"}}),(o==="content_change"||o==="content_long"||o==="content_color"||o==="content_think")&&c.push({path:"/editor/"+p.value.id,query:{ai_write:"true",ai_write_type:o}})}).catch(n=>{console.log(n)})},z=(o,n)=>{n=="in"?c.push({path:"/editor/"+o}):window.open("/editor/"+o)},V=b(0),C=b(!1),y=b(""),U=o=>{V.value=o,C.value=!0},P=(o,n)=>{if(n==null||n==""){L.error("内容为空");return}ge(n).then(_=>{ve.saveAs(_,o||"未命名.docx")})},O=o=>{de({id:o}).then(n=>{L.success("删除成功"),$()}).catch(n=>{console.log(n)})},D=()=>{ue({id:V.value,title:y.value}).then(o=>{L.success("修改成功"),$()}).catch(o=>{console.log(o)})},$=()=>{re().then(o=>{w.value=o._rawValue.data}).catch(o=>{console.log(o)})};return f.value&&$(),(o,n)=>{const _=d("a-typography-text"),m=d("a-card"),h=d("a-col"),I=d("a-row"),k=d("a-doption"),E=d("a-dropdown"),F=d("a-input"),H=d("a-modal"),W=K,G=d("a-empty");return v(),N("main",je,[Ne,e("div",ze,[Ve,e("div",Ae,[t(I,{gutter:20},{default:s(()=>[t(h,{xs:{span:24},lg:{span:6},class:"cursor-pointer mb-2",onClick:n[0]||(n[0]=a=>i("new"))},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3"},{default:s(()=>[e("div",Be,[e("span",Re,[Me,t(_,null,{default:s(()=>[qe,Ue]),_:1})])])]),_:1})]),_:1}),t(h,{xs:{span:24},lg:{span:6},class:"cursor-pointer mb-2"},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3",onClick:n[1]||(n[1]=a=>i("ai_write"))},{default:s(()=>[e("div",Pe,[e("span",Oe,[De,t(_,null,{default:s(()=>[Ee,Fe]),_:1})])])]),_:1})]),_:1})]),_:1})]),He,e("div",We,[t(I,{gutter:20},{default:s(()=>[t(h,{xs:{span:24},lg:{span:6},class:"cursor-pointer mb-2"},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3",onClick:n[2]||(n[2]=a=>i("content_change"))},{default:s(()=>[e("div",Ge,[e("span",Ke,[Te,t(_,null,{default:s(()=>[Ze,Je]),_:1})])])]),_:1})]),_:1}),t(h,{xs:{span:24},lg:{span:6},class:"cursor-pointer mb-2"},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3",onClick:n[3]||(n[3]=a=>i("content_long"))},{default:s(()=>[e("div",Qe,[e("span",Xe,[Ye,t(_,null,{default:s(()=>[et,tt]),_:1})])])]),_:1})]),_:1}),t(h,{xs:{span:24},lg:{span:6},class:"cursor-pointer mb-2"},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3",onClick:n[4]||(n[4]=a=>i("content_color"))},{default:s(()=>[e("div",st,[e("span",nt,[ot,t(_,null,{default:s(()=>[lt,at]),_:1})])])]),_:1})]),_:1}),t(h,{xs:{span:24},lg:{span:6},class:"cursor-pointer mb-2"},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3",onClick:n[5]||(n[5]=a=>i("content_think"))},{default:s(()=>[e("div",it,[e("span",ct,[rt,t(_,null,{default:s(()=>[_t,dt]),_:1})])])]),_:1})]),_:1})]),_:1})]),ut,e("div",pt,[w.value.length>0?(v(),S(I,{key:0,gutter:20},{default:s(()=>[(v(!0),N(se,null,ne(w.value,(a,A)=>(v(),S(h,{xs:{span:24},lg:{span:6},class:q(["cursor-pointer mb-2 list-animation-leftIn","delay-"+A]),key:A},{default:s(()=>[t(W,{to:"/editor/"+a.id},{default:s(()=>[t(m,{hoverable:"",class:"bg-white rounded-3"},{default:s(()=>[e("div",mt,[e("span",ht,[ft,t(_,null,{default:s(()=>[e("h5",null,R(a.title?a.title:"未命名"),1),e("p",gt,R(a.created_at),1)]),_:2},1024)]),t(E,{trigger:"hover"},{content:s(()=>[t(k,{onClick:u=>z(a.id,"in")},{default:s(()=>[t(g(oe),{class:"mr-1"}),x("当前标签页打开")]),_:2},1032,["onClick"]),t(k,{onClick:u=>z(a.id,"out")},{default:s(()=>[t(g(we),{class:"mr-1"}),x("新建标签页打开")]),_:2},1032,["onClick"]),t(k,{onClick:u=>U(a.id)},{default:s(()=>[t(g(le),{class:"mr-1"}),x("重命名")]),_:2},1032,["onClick"]),t(k,{onClick:u=>P(a.title,a.content)},{default:s(()=>[t(g($e),{class:"mr-1"}),x("导出word")]),_:2},1032,["onClick"]),t(k,{onClick:u=>O(a.id)},{default:s(()=>[t(g(ae),{class:"mr-1"}),x("删除")]),_:2},1032,["onClick"])]),default:s(()=>[t(g(ie))]),_:2},1024),t(H,{visible:C.value,"onUpdate:visible":n[7]||(n[7]=u=>C.value=u),title:"修改名称",onOk:D},{default:s(()=>[t(F,{modelValue:y.value,"onUpdate:modelValue":n[6]||(n[6]=u=>y.value=u),placeholder:"输入新的名称"},null,8,["modelValue"])]),_:1},8,["visible"])])]),_:2},1024)]),_:2},1032,["to"])]),_:2},1032,["class"]))),128))]),_:1})):(v(),S(G,{key:1}))])])])}}});export{$t as default};