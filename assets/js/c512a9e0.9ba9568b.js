"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[3038],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,b=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(b,a(a({ref:t},c),{},{components:n})):r.createElement(b,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9111:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},assets:function(){return c},toc:function(){return p},default:function(){return m}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),a=["components"],l={title:"Possible dirname bug in Webpack",tags:["docusaurus","blog"]},s=void 0,u={permalink:"/blog/2021/06/13/possible-webpack-dirname-bug",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2021-06-13-possible-webpack-dirname-bug.md",source:"@site/blog/2021-06-13-possible-webpack-dirname-bug.md",title:"Possible dirname bug in Webpack",description:"I got an error while trying to build this blog in a temporary directory. This might be a webpack bug -- or not.",date:"2021-06-13T00:00:00.000Z",formattedDate:"June 13, 2021",tags:[{label:"docusaurus",permalink:"/blog/tags/docusaurus"},{label:"blog",permalink:"/blog/tags/blog"}],truncated:!0,authors:[],prevItem:{title:"GitHub `main` branch",permalink:"/blog/2021/06/16/github-main-branch"},nextItem:{title:"Deploying Docusaurus site to GitHub the easy way",permalink:"/blog/2021/06/12/docusaurus-deploy"}},c={authorsImageUrls:[]},p=[{value:"Possibly a feature",id:"possibly-a-feature",children:[],level:2}],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"I got an error while trying to build this blog in a temporary directory. This might be a webpack bug -- or not."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell-session"},"$ yarn build --out-dir \"${TMPDIR}\"\nyarn run v1.22.10\n$ docusaurus build --out-dir /tmp/tmp.pEBNPFYg2h\n\n[en] Creating an optimized production build...\n\n\u2714 Client\n  \n\n\u25cf Server \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 cache (99%) shutdown IdleFileCachePlugin\n stored\n\nError: EISDIR: illegal operation on a directory, open '/tmp/tmp.pEBNPFYg2h'\nerror building locale=en\nError: EISDIR: illegal operation on a directory, open '/tmp/tmp.pEBNPFYg2h'\nerror Command failed with exit code 1.\ninfo Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.\n")),(0,i.kt)("p",null,"So I started investigating -- first figuring out where the problem is.\nI thought it was due to permissions, but I changed the directory permissions to ",(0,i.kt)("inlineCode",{parentName:"p"},"0775")," and it still didn't work.\nI thought it was due to the temporary directory being outside of the source directory, so I tried using ",(0,i.kt)("inlineCode",{parentName:"p"},"mktemp -d -p .")," to make the temporary in the current directory instead -- but it still failed. This is when I realized that the trigger is the dot character in the directory name."),(0,i.kt)("p",null,"I found the script executing the ",(0,i.kt)("inlineCode",{parentName:"p"},"build")," command at ",(0,i.kt)("inlineCode",{parentName:"p"},"node_modules/@docusaurus/core/lib/commands/build.js"),". I added a few checkpoints, and re-ran the script:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell-session"},"$ yarn build --out-dir test.dir\nyarn run v1.22.10\n$ docusaurus build --out-dir test.dir\n\n[en] Creating an optimized production build...\ncheck 100\ncheck 200\ncheck 300\n\n\u2714 Client\n\n\u25cf Client \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 cache (99%)  \n\n\u2714 Client\n  \n\n\u25cf Server \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 cache (99%) shutdown IdleFileCachePlugin\n stored\n\nError: EISDIR: illegal operation on a directory, open '/home/william/Documents/wpyoga/wpyoga.github.io/test.dir'\nerror building locale=en\nError: EISDIR: illegal operation on a directory, open '/home/william/Documents/wpyoga/wpyoga.github.io/test.dir'\nerror Command failed with exit code 1.\ninfo Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.\n")),(0,i.kt)("p",null,"This is where it failed:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'console.log("check 300");\n    // Run webpack to build JS bundle (client) and static html files (server).\n    await utils_1.compile([clientConfig, serverConfig]);\nconsole.log("check 350");\n')),(0,i.kt)("p",null,"It turned out, ",(0,i.kt)("inlineCode",{parentName:"p"},"utils_1")," is a webpack wrapper (??? maybe, not sure, I don't know the pattern):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const utils_1 = require("../webpack/utils");\n')),(0,i.kt)("p",null,"In the file ",(0,i.kt)("inlineCode",{parentName:"p"},"node_modules/@docusaurus/core/lib/webpack/utils.js"),", there is a function ",(0,i.kt)("inlineCode",{parentName:"p"},"compile()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"function compile(config) {\n    return new Promise((resolve, reject) => {\n        const compiler = webpack_1.default(config);\n        compiler.run((err, stats) => {\n")),(0,i.kt)("p",null,"And ",(0,i.kt)("inlineCode",{parentName:"p"},"webpack_1")," is:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const webpack_1 = tslib_1.__importDefault(require("webpack"));\n')),(0,i.kt)("p",null,"It looks like a bug (or feature, keep reading) in webpack. I haven't tried to debug this yet."),(0,i.kt)("h2",{id:"possibly-a-feature"},"Possibly a feature"),(0,i.kt)("p",null,"Some googling led me to this page: ",(0,i.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/37070141/webpack-dev-server-allow-paths-with-dot-in-them"},"https://stackoverflow.com/questions/37070141/webpack-dev-server-allow-paths-with-dot-in-them")),(0,i.kt)("p",null,"It seems that webpack, or one of its plugins, try to differentiate files from directories by checking whether it has a dot in its name. So when it sees a dot, it assumes that the entity is a file instead of a directory."),(0,i.kt)("p",null,"These commands work though, because the file name does not contain a dot. Only the pathname does, and the preceding path components cannot be files."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell-session"},"$ yarn build --out-dir tmp.123/aaa\n$ yarn build --out-dir /tmp/tpm.123456/bbb\n")))}m.isMDXComponent=!0}}]);