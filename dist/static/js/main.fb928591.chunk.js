(this["webpackJsonpfacebook-lite"]=this["webpackJsonpfacebook-lite"]||[]).push([[0],{126:function(e,c,t){"use strict";t.r(c);var n=t(0),a=t.n(n),r=t(8),o=t.n(r),i=(t(88),t(89),t(80)),l=(t(90),t(133)),m=t(130),s=t(131),u=t(132),d=t(59);function f(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(c){e(c[0])}))}var h=function(e){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};f((function(t){chrome.runtime.sendMessage({type:e,tabId:t.id},(function(e){c(Object(d.a)(Object(d.a)({},e),t))}))}))},E=t(129),p=t(134);var b=function(){var e=Object(n.useState)({}),c=Object(i.a)(e,2),t=(c[0],c[1]);Object(n.useEffect)((function(){return h("init",(function(e){t(e)})),function(){}}),[]);var r=function(e){e?l.b.success("Done"):l.b.warn("Fail")},o=function(){return a.a.createElement("svg",{width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 1024 1024"},a.a.createElement("path",{d:"M662.688,13.546L491.347,345.754c0.983,0.276,1.964,0.569,2.938,0.883c7.235,2.33,14.028,5.17,20.353,8.499 c7.646,4.025,14.597,8.771,20.807,14.198L707.126,36.466c6.329-12.271,1.513-27.35-10.759-33.679 C684.095-3.543,669.018,1.274,662.688,13.546z"}),a.a.createElement("path",{d:"M96.597,629.659c27.24,24.567,60.687,45.974,99.412,63.623c65.396,29.808,122.948,38.61,125.365,38.971 c0.067,0.01,0.135,0.019,0.201,0.028c0.763,0.104,1.53,0.156,2.299,0.156c0.186,0,0.371-0.003,0.557-0.009 c68.797-2.246,122.417-25.158,159.368-68.1c48.598-56.477,66.162-141.396,62.748-214.401 c-0.979-20.902-8.423-42.237-23.035-57.459c-1.089-1.134-2.208-2.242-3.376-3.306c-5.127-4.665-10.862-8.566-16.964-11.798 c-5.289-2.801-10.854-5.099-16.55-6.933c-2.365-0.762-4.732-1.338-7.096-1.762c-3.281-0.589-6.555-0.875-9.811-0.875 c-24.122,0-47.247,15.161-64.911,30.646c-18.24,15.992-36.755,33.421-57.363,47.073c-22.585,14.962-47.38,22.497-73.202,29.851 c-33.351,9.498-67.641,15.564-102.078,19.429c-30.618,3.435-61.647,5.433-92.587,5.433c-12.28,0-24.541-0.315-36.763-0.979 c-0.709-0.038-1.418-0.073-2.126-0.122c-0.394-0.027-0.789-0.041-1.181-0.041c-5.256,0-10.244,2.438-13.47,6.645 c-3.467,4.52-4.438,10.476-2.584,15.862C37.39,562.098,62,598.457,96.597,629.659z M72.798,534.07c0.01,0,0.02,0,0.031,0 c1.718,0.011,3.495,0.018,5.319,0.018c25.01,0,59.86-1.107,98.956-5.557c82.72-9.414,150.153-29.545,201.203-59.971 c1.45-0.864,3.079-1.296,4.711-1.296c1.541,0,3.083,0.384,4.479,1.151c29.672,16.308,75.781,40.474,108.659,52.206 c4.069,1.452,6.587,5.529,6.095,9.821c-3.927,34.31-15.064,77.974-44.329,111.89c-29.974,34.736-74.236,53.582-131.601,56.039 c-0.179,0.009-0.358,0.012-0.537,0.012c-0.744,0-1.485-0.066-2.22-0.195c-5.781-1.021-20.042-3.771-39.179-9.039 c5.455-2.409,11.098-5.297,16.801-8.518c5.106-2.885,10.256-6.028,15.354-9.318c15.771-10.173,31.043-21.723,42.925-31.227 c2.749-2.197,0.17-6.491-3.076-5.13c-25.975,10.898-59.161,18.186-88.854,22.977c-9.333,1.506-18.315,2.763-26.625,3.811 c-9.72,1.226-18.508,2.161-25.841,2.861c-1.911-0.843-3.827-1.699-5.75-2.581c-16.525-7.57-31.943-15.86-46.199-24.798 c6.222-0.576,12.76-1.608,19.391-2.957c6.024-1.226,12.117-2.71,18.114-4.339c17.659-4.796,34.451-10.852,45.937-15.312 c2.186-0.849,1.407-4.11-0.928-3.886c-20.907,2.012-49.906,2.197-74.67,1.833c-8.112-0.119-15.767-0.297-22.536-0.489 c-8.902-0.253-16.264-0.528-21.108-0.728c-2.841-2.377-5.625-4.782-8.326-7.227c-3.495-3.163-6.861-6.389-10.119-9.666 c5.027-0.51,10.246-1.31,15.546-2.324c4.956-0.949,9.976-2.083,14.969-3.344c19.719-4.976,38.959-11.876,51.687-16.817 c2.186-0.85,1.407-4.111-0.928-3.887c-19.628,1.89-46.387,2.168-70.079,1.894c-5.844-0.068-11.499-0.168-16.816-0.287 c-5.917-0.132-11.414-0.286-16.278-0.44c-6.884-9.15-12.967-18.648-18.219-28.478C67.136,537.741,69.365,534.07,72.798,534.07z"}),a.a.createElement("circle",{cx:"621.247",cy:"619.725",r:"40.132"}),a.a.createElement("circle",{cx:"534.692",cy:"711.631",r:"20.275"}),a.a.createElement("circle",{cx:"644.636",cy:"706.954",r:"20.275"}))},d=function(e){return a.a.createElement(E.a,Object.assign({component:o},e))};return a.a.createElement("div",{style:{width:400},className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(m.a,null,a.a.createElement(m.a.Header,{style:{color:"white"}},"Facebook Lite"),a.a.createElement(m.a.Content,{style:{flexDirection:"column"}},a.a.createElement(s.a,{style:{padding:0}}),a.a.createElement(u.a,{mode:"inline",theme:"dark"},a.a.createElement(s.a,{style:{padding:0}}),a.a.createElement(u.a.Item,{key:"2",onClick:function(){h("clearFB",r)},icon:a.a.createElement(d,null)},"Clear FB"),a.a.createElement(s.a,{style:{padding:0}}),a.a.createElement(u.a.Item,{key:"3",onClick:function(){h("removeAds",r)},icon:a.a.createElement(p.a,null)},"Remove Ads"))),a.a.createElement(m.a.Footer,{style:{height:80}},"Facebook Lite \xa92020 Created by Minhchienwikipedia"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},83:function(e,c,t){e.exports=t(126)},88:function(e,c,t){},90:function(e,c,t){}},[[83,1,2]]]);