"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[3643],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),f=u(r),m=o,g=f["".concat(c,".").concat(m)]||f[m]||s[m]||a;return r?n.createElement(g,i(i({ref:t},p),{},{components:r})):n.createElement(g,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5958:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return u},assets:function(){return p},toc:function(){return s},default:function(){return m}});var n=r(3117),o=r(102),a=(r(7294),r(3905)),i=["components"],l={title:"Manual Profiling of Bash Script Execution",tags:["bash","profiling"]},c=void 0,u={permalink:"/blog/2021/07/11/manual-profiling-bash-script",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2021-07-11-manual-profiling-bash-script.md",source:"@site/blog/2021-07-11-manual-profiling-bash-script.md",title:"Manual Profiling of Bash Script Execution",description:"Sometimes, we would like to know how long a command takes, and which part of the script takes the longest time to run.",date:"2021-07-11T00:00:00.000Z",formattedDate:"July 11, 2021",tags:[{label:"bash",permalink:"/blog/tags/bash"},{label:"profiling",permalink:"/blog/tags/profiling"}],truncated:!0,authors:[],prevItem:{title:"Bash Shell Slow Start-up",permalink:"/blog/2021/07/11/bash-slow-start"},nextItem:{title:"Using a `.bashrc.d` directory instead of just `.bashrc`",permalink:"/blog/2021/07/10/bashrc-directory"}},p={authorsImageUrls:[]},s=[],f={toc:s};function m(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Sometimes, we would like to know how long a command takes, and which part of the script takes the longest time to run."))}m.isMDXComponent=!0}}]);