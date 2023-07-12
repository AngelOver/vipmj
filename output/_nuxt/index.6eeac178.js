import{p as c,d as u,q as d,s as a,x as k,o as m,c as f,n as p,y as h,e as v}from"./entry.fcfc6558.js";const y=u({name:"IconShareInternal",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:n}){const t=d("icon"),s=a(()=>[t,`${t}-share-internal`,{[`${t}-spin`]:e.spin}]),i=a(()=>{const r={};return e.size&&(r.fontSize=k(e.size)?`${e.size}px`:e.size),e.rotate&&(r.transform=`rotate(${e.rotate}deg)`),r});return{cls:s,innerStyle:i,onClick:r=>{n("click",r)}}}}),C=["stroke-width","stroke-linecap","stroke-linejoin"],S=v("path",{d:"M40 35v6H8v-6m1.108-4c1.29-8.868 13.917-15.85 29.392-15.998M30 6l9 9-9 9"},null,-1),g=[S];function b(e,n,t,s,i,l){return m(),f("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:p(e.cls),style:h(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:n[0]||(n[0]=(...r)=>e.onClick&&e.onClick(...r))},g,14,C)}var o=c(y,[["render",b]]);const $=Object.assign(o,{install:(e,n)=>{var t;const s=(t=n==null?void 0:n.iconPrefix)!=null?t:"";e.component(s+o.name,o)}});export{$ as I};