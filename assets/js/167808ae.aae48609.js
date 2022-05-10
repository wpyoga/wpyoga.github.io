"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[5339],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),f=s(n),d=o,m=f["".concat(c,".").concat(d)]||f[d]||p[d]||a;return n?r.createElement(m,i(i({ref:t},l),{},{components:n})):r.createElement(m,i({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6096:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return c},metadata:function(){return s},assets:function(){return l},toc:function(){return p},default:function(){return d}});var r=n(3117),o=n(102),a=(n(7294),n(3905)),i=["components"],u={title:"When My Server's Wi-Fi Got Disconnected",tags:["wifi","NetworkManager"]},c=void 0,s={permalink:"/blog/2022/01/22/server-wifi-disconnected",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2022-01-22-server-wifi-disconnected.md",source:"@site/blog/2022-01-22-server-wifi-disconnected.md",title:"When My Server's Wi-Fi Got Disconnected",description:"A few days ago, I just installed an NVMe SSD on my home server. Then I went on a quick trip, and found out that I couldn't access my server anymore. I had thought to myself, could it be that the SSD was bad? (I bought it used, but barely)",date:"2022-01-22T00:00:00.000Z",formattedDate:"January 22, 2022",tags:[{label:"wifi",permalink:"/blog/tags/wifi"},{label:"NetworkManager",permalink:"/blog/tags/network-manager"}],truncated:!0,authors:[],prevItem:{title:"Vaccination Certificate Download Via PeduliLindungi",permalink:"/blog/2022/01/24/vaccine-certrificate"},nextItem:{title:"Deciphering Aptitude Search Results",permalink:"/blog/2022/01/19/deciphering-aptitude-search-results"}},l={authorsImageUrls:[]},p=[],f={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A few days ago, I just installed an NVMe SSD on my home server. Then I went on a quick trip, and found out that I couldn't access my server anymore. I had thought to myself, could it be that the SSD was bad? (I bought it used, but barely)"),(0,a.kt)("p",null,"It turns out that the default NetworkManager settings are not suitable for my use-case, as described by ",(0,a.kt)("a",{parentName:"p",href:"https://community.home-assistant.io/t/wifi-does-not-reconnect-if-router-was-gone/247532/5"},"this forum post"),":"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"The ",(0,a.kt)("a",{parentName:"p",href:"https://developer.gnome.org/NetworkManager/stable/settings-connection.html"},"nmcli docs")," state:"),(0,a.kt)("blockquote",{parentName:"blockquote"},(0,a.kt)("p",{parentName:"blockquote"},"The number of times a connection should be tried when autoactivating before giving up. Zero means forever, -1 means the global default (4 times if not overridden).")),(0,a.kt)("p",{parentName:"blockquote"},"Four? Why four? Why not 42? What kind of default is that supposed to be?\nKind of \u201cPlease try, but not that hard.\u201d \ud83d\ude42")),(0,a.kt)("p",null,"Before you say anything, yes I use a Wi-Fi adapter for my home server. It's just an educational server running a few VM's, so Wi-Fi makes sense here. Running a cable between the server and the router would have complicated the installation."))}d.isMDXComponent=!0}}]);