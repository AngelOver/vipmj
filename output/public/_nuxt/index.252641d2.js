import{p as c,d,q as u,s as l,x as m,o as k,c as f,n as p,y as v,e as w}from"./entry.f78ca6a6.js";const y=d({name:"IconDownload",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:n}){const t=u("icon"),s=l(()=>[t,`${t}-download`,{[`${t}-spin`]:e.spin}]),r=l(()=>{const o={};return e.size&&(o.fontSize=m(e.size)?`${e.size}px`:e.size),e.rotate&&(o.transform=`rotate(${e.rotate}deg)`),o});return{cls:s,innerStyle:r,onClick:o=>{n("click",o)}}}}),C=["stroke-width","stroke-linecap","stroke-linejoin"],g=w("path",{d:"m33.072 22.071-9.07 9.071-9.072-9.07M24 5v26m16 4v6H8v-6"},null,-1),b=[g];function h(e,n,t,s,r,a){return k(),f("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:p(e.cls),style:v(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:n[0]||(n[0]=(...o)=>e.onClick&&e.onClick(...o))},b,14,C)}var i=c(y,[["render",h]]);const $=Object.assign(i,{install:(e,n)=>{var t;const s=(t=n==null?void 0:n.iconPrefix)!=null?t:"";e.component(s+i.name,i)}});export{$ as I};
