(this["webpackJsonpfacebook-lite"]=this["webpackJsonpfacebook-lite"]||[]).push([[0],{112:function(e,t,a){e.exports=a(182)},117:function(e,t,a){},119:function(e,t,a){},182:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(9),l=a.n(o),i=(a(117),a(118),a(42)),r=a(107),s=(a(119),a(187)),m=a(184),d=a(188),u=a(189),f=a(185),g=a(190),p=a(186),E=a(81);var h=function(){var e=Object(n.useState)({}),t=Object(r.a)(e,2),a=t[0],o=t[1],l=Object(n.useRef)({});Object(n.useEffect)((function(){return chrome.storage.sync.get("facebookLite",(function(e){l.current=(null===e||void 0===e?void 0:e.facebookLite)||{},o((null===e||void 0===e?void 0:e.facebookLite)||{})})),function(){}}),[]);var h=function(e){o(e),chrome.storage.sync.set({facebookLite:e})};return c.a.createElement("div",{style:{width:350},className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement(s.a,null,c.a.createElement(s.a.Header,{style:{color:"white",fontWeight:"bold"}},"Facebook Lite"),c.a.createElement(s.a.Content,{style:{flexDirection:"column",backgroundColor:"#1f1f1f"}},c.a.createElement(m.a,{style:{margin:0}}),c.a.createElement(d.a,{style:{padding:12},align:"middle",justify:"space-between"},c.a.createElement(u.a,{span:16},c.a.createElement(f.a.Text,null,"Clear FB")),c.a.createElement(u.a,{span:4},c.a.createElement(g.a,{checked:a.clearFB,onChange:function(e){var t=Object(i.a)(Object(i.a)({},a),{},{clearFB:e});h(t)}}))),c.a.createElement(d.a,{style:{padding:12},align:"middle",justify:"space-between"},c.a.createElement(u.a,{span:16},c.a.createElement(f.a.Text,null,"Remove Ads")),c.a.createElement(u.a,{span:4},c.a.createElement(g.a,{checked:a.removeAds,onChange:function(e){var t=Object(i.a)(Object(i.a)({},a),{},{removeAds:e});h(t)}}))),c.a.createElement(d.a,{style:{padding:12},align:"middle",justify:"space-between"},c.a.createElement(u.a,{span:16},c.a.createElement(f.a.Text,null,"Remove Suggestion Posts")),c.a.createElement(u.a,{span:4},c.a.createElement(g.a,{checked:a.removeSuggestionPosts,onChange:function(e){var t=Object(i.a)(Object(i.a)({},a),{},{removeSuggestionPosts:e});h(t)}}))),c.a.createElement(d.a,{style:{padding:12},align:"middle",justify:"space-between"},c.a.createElement(u.a,{span:12},c.a.createElement(f.a.Text,null,"Post width")),c.a.createElement(u.a,{span:12},c.a.createElement(p.a,{value:a.postSize,onChange:function(e){var t=Object(i.a)(Object(i.a)({},a),{},{postSize:e.target.value});h(t)}}))),Object(E.isEqual)(l.current,a)?null:c.a.createElement(d.a,{style:{padding:12},align:"middle",justify:"center"},c.a.createElement(f.a.Text,{style:{fontSize:12},type:"danger"},"Please refresh your Facebook Website after change to active it"))),c.a.createElement(s.a.Footer,{style:{paddingTop:24,paddingBottom:24,fontSize:12,width:350}},c.a.createElement(f.a.Text,null,"\xa92021 ",c.a.createElement(f.a.Link,{onClick:function(){window.open("https://github.com/minhchienwikipedia")}},"minhchienwikipedia"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[112,1,2]]]);