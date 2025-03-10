(()=>{var e={};e.id=151,e.ids=[151],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},2209:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>d});var s=r(260),a=r(8203),l=r(5155),n=r.n(l),i=r(7292),o={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>i[e]);r.d(t,o);let d=["",{children:["wall-of-reviews",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,6100)),"/Users/twnguy/Documents/W@C/W-PRO-260-MAR-3-1-portfoliotitre-tanguy.gibrat/src/app/wall-of-reviews/page.tsx"]}]},{metadata:{icon:[],apple:[],openGraph:[],twitter:[],manifest:"/manifest.json"}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1354)),"/Users/twnguy/Documents/W@C/W-PRO-260-MAR-3-1-portfoliotitre-tanguy.gibrat/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[],apple:[],openGraph:[],twitter:[],manifest:"/manifest.json"}}],c=["/Users/twnguy/Documents/W@C/W-PRO-260-MAR-3-1-portfoliotitre-tanguy.gibrat/src/app/wall-of-reviews/page.tsx"],m={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/wall-of-reviews/page",pathname:"/wall-of-reviews",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},8403:(e,t,r)=>{Promise.resolve().then(r.bind(r,6100))},2475:(e,t,r)=>{Promise.resolve().then(r.bind(r,391))},391:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var s=r(5512),a=r(8009),l=r(6866),n=r(8784),i=r(5607);let o=()=>{let[e,t]=(0,a.useState)([]),[r,l]=(0,a.useState)({firstName:"",lastName:"",company:"",content:""}),[n,o]=(0,a.useState)({width:300,height:200}),d=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=()=>{if(d.current){let e={width:Math.min(300,.8*d.current.offsetWidth),height:200};o(e),t(t=>t.map(r=>({...r,position:m(e,t.filter(e=>e.id!==r.id))})))}};return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]);let c=(e,t,r)=>r.some(r=>{let s=Math.abs(e.x-r.position.x)<t.width+20,a=Math.abs(e.y-r.position.y)<t.height+20;return s&&a}),m=(e,t)=>{if(!d.current)return{x:0,y:0};let r=d.current.getBoundingClientRect(),s=[];for(let t=0;t<=r.width-e.width;t+=50)for(let a=0;a<=r.height-e.height;a+=50)s.push({x:t,y:a});for(let r of s.sort(()=>Math.random()-.5))if(!c(r,e,t))return r;return{x:0,y:0}},p=e=>{let{name:t,value:r}=e.target;l(e=>({...e,[t]:r}))};return(0,s.jsxs)("div",{className:"wall",children:[(0,s.jsxs)("div",{className:"wall__header",children:[(0,s.jsxs)("h1",{className:"wall__title",children:["Le mur des",(0,s.jsx)("br",{}),(0,s.jsx)("span",{className:"wall__title-accent",children:"collaborations"})]}),(0,s.jsx)("p",{className:"wall__description",children:"D\xe9couvrez les retours d'exp\xe9rience de mes collaborateurs et partenaires"})]}),(0,s.jsxs)("div",{className:"wall__content",ref:d,children:[(0,s.jsxs)("form",{className:"wall__form",onSubmit:s=>{s.preventDefault();let a=m(n,e),i=4*Math.random()-2,o={id:Date.now().toString(),...r,position:a,rotation:i};t(e=>[...e,o]),l({firstName:"",lastName:"",company:"",content:""})},children:[(0,s.jsxs)("div",{className:"wall__form-grid",children:[(0,s.jsxs)("div",{className:"wall__form-group",children:[(0,s.jsx)("label",{htmlFor:"firstName",className:"wall__form-label",children:"Pr\xe9nom"}),(0,s.jsx)("input",{type:"text",id:"firstName",name:"firstName",value:r.firstName,onChange:p,className:"wall__form-input",required:!0})]}),(0,s.jsxs)("div",{className:"wall__form-group",children:[(0,s.jsx)("label",{htmlFor:"lastName",className:"wall__form-label",children:"Nom"}),(0,s.jsx)("input",{type:"text",id:"lastName",name:"lastName",value:r.lastName,onChange:p,className:"wall__form-input",required:!0})]}),(0,s.jsxs)("div",{className:"wall__form-group",children:[(0,s.jsx)("label",{htmlFor:"company",className:"wall__form-label",children:"Entreprise"}),(0,s.jsx)("input",{type:"text",id:"company",name:"company",value:r.company,onChange:p,className:"wall__form-input",required:!0})]})]}),(0,s.jsxs)("div",{className:"wall__form-group",children:[(0,s.jsx)("label",{htmlFor:"content",className:"wall__form-label",children:"Votre message"}),(0,s.jsx)("textarea",{id:"content",name:"content",value:r.content,onChange:p,className:"wall__form-textarea",rows:4,required:!0})]}),(0,s.jsxs)("button",{type:"submit",className:"wall__form-submit",children:[(0,s.jsx)(i.A,{className:"wall__form-submit-icon"}),"Publier mon avis"]})]}),(0,s.jsx)("div",{className:"wall__reviews",children:e.map(e=>(0,s.jsx)("div",{className:"wall__card",style:{transform:`translate(${e.position.x}px, ${e.position.y}px) rotate(${e.rotation}deg)`},children:(0,s.jsxs)("div",{className:"wall__card-content",children:[(0,s.jsx)("p",{className:"wall__card-text",children:e.content}),(0,s.jsxs)("div",{className:"wall__card-author",children:[(0,s.jsxs)("div",{className:"wall__card-name",children:[e.firstName," ",e.lastName]}),(0,s.jsx)("div",{className:"wall__card-company",children:e.company})]})]})},e.id))})]})]})},d=()=>(0,s.jsxs)("div",{className:"layout",children:[(0,s.jsx)(l.A,{}),(0,s.jsx)(o,{}),(0,s.jsx)(n.A,{})]})},6100:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/twnguy/Documents/W@C/W-PRO-260-MAR-3-1-portfoliotitre-tanguy.gibrat/src/app/wall-of-reviews/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/twnguy/Documents/W@C/W-PRO-260-MAR-3-1-portfoliotitre-tanguy.gibrat/src/app/wall-of-reviews/page.tsx","default")}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,403,810],()=>r(2209));module.exports=s})();