"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[4515],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,g=u["".concat(s,".").concat(m)]||u[m]||c[m]||a;return n?o.createElement(g,i(i({ref:t},d),{},{components:n})):o.createElement(g,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4098:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},assets:function(){return d},toc:function(){return c},default:function(){return m}});var o=n(3117),r=n(102),a=(n(7294),n(3905)),i=["components"],l={title:"Show Items in Folder",tags:["gui","file manager","dbus"]},s=void 0,p={permalink:"/blog/2022/02/14/show-in-folder",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2022-02-14-show-in-folder.md",source:"@site/blog/2022-02-14-show-in-folder.md",title:"Show Items in Folder",description:'When we download a file in the browser, there is usually an option to "Show in folder". For the longest time, I\'ve been looking for a way to do replicate this functionality on the command line.',date:"2022-02-14T00:00:00.000Z",formattedDate:"February 14, 2022",tags:[{label:"gui",permalink:"/blog/tags/gui"},{label:"file manager",permalink:"/blog/tags/file-manager"},{label:"dbus",permalink:"/blog/tags/dbus"}],truncated:!0,authors:[],prevItem:{title:"Migrating Windows 10 from HDD to SSD using Linux",permalink:"/blog/2022/03/17/migrating-windows-10"},nextItem:{title:"Vaccination Certificate Download Via PeduliLindungi",permalink:"/blog/2022/01/24/vaccine-certrificate"}},d={authorsImageUrls:[]},c=[{value:"It&#39;s not xdg-open",id:"its-not-xdg-open",children:[],level:2},{value:"It&#39;s related to the file manager",id:"its-related-to-the-file-manager",children:[],level:2},{value:"Monitoring all process invocations",id:"monitoring-all-process-invocations",children:[],level:2},{value:"Of course it had to be D-Bus",id:"of-course-it-had-to-be-d-bus",children:[],level:2}],u={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,'When we download a file in the browser, there is usually an option to "Show in folder". For the longest time, I\'ve been looking for a way to do replicate this functionality on the command line.'),(0,a.kt)("h2",{id:"its-not-xdg-open"},"It's not xdg-open"),(0,a.kt)("p",null,"We know that we can use ",(0,a.kt)("inlineCode",{parentName:"p"},"xdg-open"),' to open a file from the command line. By "open" I mean call the associated application and have it open the file requested. So I tried to monitor invocations of ',(0,a.kt)("inlineCode",{parentName:"p"},"xdg-open")," by using the stupidest method there is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:'language-title="xdg-open"'},'#!/bin/sh\necho "$0" "$@" >>/tmp/xdg-open-invocations.log\nxdg-open-real "$@"\n')),(0,a.kt)("p",null,"Of course, I've renamed the original ",(0,a.kt)("inlineCode",{parentName:"p"},"xdg-open")," binary to ",(0,a.kt)("inlineCode",{parentName:"p"},"xdg-open-real"),"."),(0,a.kt)("p",null,"But I found nothing, no logs."),(0,a.kt)("h2",{id:"its-related-to-the-file-manager"},"It's related to the file manager"),(0,a.kt)("p",null,'I applied the "monitoring" process to Thunar, but I only see a line like this in the log:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"/usr/bin/Thunar --daemon\n")),(0,a.kt)("p",null,"Something's calling ",(0,a.kt)("inlineCode",{parentName:"p"},"Thunar")," and making it run as a daemon (presumably for faster start-up performance for subsequent calls). But I don't see anything related to the file I was viewing. Apparently ",(0,a.kt)("inlineCode",{parentName:"p"},"Thunar")," doesn't have an option to do that, either."),(0,a.kt)("h2",{id:"monitoring-all-process-invocations"},"Monitoring all process invocations"),(0,a.kt)("p",null,"So I googled a bit and found ",(0,a.kt)("a",{parentName:"p",href:"https://unix.stackexchange.com/questions/260162/how-to-track-newly-created-processes-in-linux"},"this"),". The proper solution is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ sudo bpftrace -e 'tracepoint:syscalls:sys_enter_exec*{ printf(\"pid: %d, comm: %s, args: \", pid, comm); join(args->argv); }'\n")),(0,a.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"DO NOT copy solutions blindly from StackOverflow / Google / etc. Understand what it does first, then adapt it or use it accordingly."))),(0,a.kt)("p",null,"However, it doesn't show any process invocations other than the ",(0,a.kt)("inlineCode",{parentName:"p"},"Thunar --daemon")," one."),(0,a.kt)("h2",{id:"of-course-it-had-to-be-d-bus"},"Of course it had to be D-Bus"),(0,a.kt)("p",null,"Then it dawned on me that this should concern D-Bus. Using ",(0,a.kt)("inlineCode",{parentName:"p"},"dbus-monitor"),", we can see this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'method call time=1644810719.430850 sender=:1.640 -> destination=org.freedesktop.FileManager1 serial=12 path=/org/freedesktop/FileManager1; interface=org.freedesktop.FileManager1; member=ShowItems\n   array [\n      string "file:///home/william/Downloads/download.pdf"\n   ]\n   string ""\n')),(0,a.kt)("p",null,"So I can replay it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'$ dbus-send --type=method_call --dest=org.freedesktop.FileManager1 /org/freedesktop/FileManager1 org.freedesktop.FileManager1.ShowItems array:string:"file:///home/william/Downloads/download.pdf" string:""\n')),(0,a.kt)("p",null,"And it works! So I created this script to help me:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:'language-title="bin/show-in-folder"'},'#!/bin/sh\n\nPATH_ARRAY=\nfor x in "$@"; do\n  PATH_ARRAY="$PATH_ARRAY","file://$(pwd)/$x"\ndone\n\ndbus-send \\\n  --type=method_call \\\n  --dest=org.freedesktop.FileManager1 \\\n  /org/freedesktop/FileManager1 \\\n  org.freedesktop.FileManager1.ShowItems \\\n  array:string:"${PATH_ARRAY#,}" \\\n  string:""\n')))}m.isMDXComponent=!0}}]);