"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[7301],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(r),f=o,g=d["".concat(i,".").concat(f)]||d[f]||p[f]||a;return r?n.createElement(g,u(u({ref:t},c),{},{components:r})):n.createElement(g,u({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,u=new Array(a);u[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,u[1]=s;for(var l=2;l<a;l++)u[l]=r[l];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9315:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return i},metadata:function(){return l},assets:function(){return c},toc:function(){return p},default:function(){return f}});var n=r(3117),o=r(102),a=(r(7294),r(3905)),u=["components"],s={title:"Deploying Docusaurus site to GitHub the easy way",tags:["docusaurus","blog"]},i=void 0,l={permalink:"/blog/2021/06/12/docusaurus-deploy",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2021-06-12-docusaurus-deploy.md",source:"@site/blog/2021-06-12-docusaurus-deploy.md",title:"Deploying Docusaurus site to GitHub the easy way",description:"Before, we need to run this command to deploy a Docusaurus site to GitHub Pages:",date:"2021-06-12T00:00:00.000Z",formattedDate:"June 12, 2021",tags:[{label:"docusaurus",permalink:"/blog/tags/docusaurus"},{label:"blog",permalink:"/blog/tags/blog"}],truncated:!0,authors:[],prevItem:{title:"Possible dirname bug in Webpack",permalink:"/blog/2021/06/13/possible-webpack-dirname-bug"},nextItem:{title:"Making a new blog with Docusaurus v2",permalink:"/blog/2021/06/12/docusaurus-install"}},c={authorsImageUrls:[]},p=[],d={toc:p};function f(e){var t=e.components,r=(0,o.Z)(e,u);return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Before, we need to run this command to deploy a Docusaurus site to GitHub Pages:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell-session"},"$ GIT_USER=wpyoga DEPLOYMENT_BRANCH=gh-pages USE_SSH=true yarn deploy\n")),(0,a.kt)("p",null,"If we don't use SSH, we will be prompted for a password. Right now I don't even know my own password (it's stored in my password manager), so this is not a good idea. And I already use SSH to work on GitHub repositories anyway. So this is not a good way to do things."))}f.isMDXComponent=!0}}]);