"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[3889],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,k=c["".concat(p,".").concat(d)]||c[d]||m[d]||i;return n?r.createElement(k,o(o({ref:t},s),{},{components:n})):r.createElement(k,o({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8146:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return u},assets:function(){return s},toc:function(){return m},default:function(){return d}});var r=n(3117),a=n(102),i=(n(7294),n(3905)),o=["components"],l={title:"ThinkPad T14",tags:["thinkpad","t14","linux","windows"]},p=void 0,u={permalink:"/blog/2022/04/27/thinkpad-t14",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2022-04-27-thinkpad-t14.md",source:"@site/blog/2022-04-27-thinkpad-t14.md",title:"ThinkPad T14",description:"I just got a ThinkPad T14 Gen 1 AMD.",date:"2022-04-27T00:00:00.000Z",formattedDate:"April 27, 2022",tags:[{label:"thinkpad",permalink:"/blog/tags/thinkpad"},{label:"t14",permalink:"/blog/tags/t-14"},{label:"linux",permalink:"/blog/tags/linux"},{label:"windows",permalink:"/blog/tags/windows"}],truncated:!0,authors:[],prevItem:{title:"ThinkPad T14 TrackPoint & Linux",permalink:"/blog/2022/04/27/thinkpad-t14-trackpoint-linux"},nextItem:{title:"Migrating Windows 10 from HDD to SSD using Linux",permalink:"/blog/2022/03/17/migrating-windows-10"}},s={authorsImageUrls:[]},m=[],c={toc:m};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"I just got a ThinkPad T14 Gen 1 AMD."),(0,i.kt)("h1",{id:"issues"},"Issues"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Sleep mode drains the battery",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'The T14 has S0ix ("Windows") and S3 ("Linux") sleep modes'),(0,i.kt)("li",{parentName:"ul"},"S3 sleep drains more power than S0ix (",(0,i.kt)("strong",{parentName:"li"},"Fixed in UEFI Firmware 1.40"),")"))),(0,i.kt)("li",{parentName:"ul"},"Sleep mode sometimes doesn't work",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This seems to be a kernel version problem (",(0,i.kt)("strong",{parentName:"li"},"Fixed in kernel 5.14"),")"),(0,i.kt)("li",{parentName:"ul"},"Sometimes the laptop does not go to sleep, even if the lid is closed, this seems to be a distro / power management problem"))),(0,i.kt)("li",{parentName:"ul"},"Waking up from S0ix sleep takes ~10 seconds",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Waking up from sleep is instantaneous on Windows"),(0,i.kt)("li",{parentName:"ul"},"Waking up from S3 sleep with UEFI Firmware 1.40 and kernel 5.14 is instantaneous"))),(0,i.kt)("li",{parentName:"ul"},"TrackPoint stutters",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"There is a workaround"))),(0,i.kt)("li",{parentName:"ul"},"Screen ghosting / burn-in",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Only visible on a gray screen"))),(0,i.kt)("li",{parentName:"ul"},"Edges of the palmrest are sharp, unlike previous ThinkPads where the palmrest edges are slightly curved")),(0,i.kt)("h1",{id:"improvements-over-previous-thinkpads"},"Improvements over previous ThinkPads"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Battery charge control now works by firmware",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"works without booting into the system"),(0,i.kt)("li",{parentName:"ul"},"can be configured under ",(0,i.kt)("inlineCode",{parentName:"li"},"/sys/class/power_supply/BAT0"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"charge_control_end_threshold")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"charge_control_start_threshold")))))),(0,i.kt)("li",{parentName:"ul"},"Thinner and lighter")))}d.isMDXComponent=!0}}]);