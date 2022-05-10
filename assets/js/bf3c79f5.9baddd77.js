"use strict";(self.webpackChunkwpyoga_docusaurus_blog=self.webpackChunkwpyoga_docusaurus_blog||[]).push([[2376],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return c}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),d=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=d(e.components);return i.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(n),c=a,m=u["".concat(s,".").concat(c)]||u[c]||h[c]||o;return n?i.createElement(m,r(r({ref:t},p),{},{components:n})):i.createElement(m,r({ref:t},p))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var d=2;d<o;d++)r[d]=n[d];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},528:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},assets:function(){return p},toc:function(){return h},default:function(){return c}});var i=n(3117),a=n(102),o=(n(7294),n(3905)),r=["components"],l={title:"Migrating Windows 10 from HDD to SSD using Linux",tags:["win10","hdd","ssd","migration","linux","parted"]},s=void 0,d={permalink:"/blog/2022/03/17/migrating-windows-10",editUrl:"https://github.com/wpyoga/wpyoga.github.io/edit/master/blog/2022-03-17-migrating-windows-10.md",source:"@site/blog/2022-03-17-migrating-windows-10.md",title:"Migrating Windows 10 from HDD to SSD using Linux",description:"Nowadays, with the price of SSDs getting cheaper all the time, we would often upgrade an existing laptop HDD into an SSD. And most of the time, in order to do that, it is best to migrate the existing Windows installation on the HDD.",date:"2022-03-17T00:00:00.000Z",formattedDate:"March 17, 2022",tags:[{label:"win10",permalink:"/blog/tags/win-10"},{label:"hdd",permalink:"/blog/tags/hdd"},{label:"ssd",permalink:"/blog/tags/ssd"},{label:"migration",permalink:"/blog/tags/migration"},{label:"linux",permalink:"/blog/tags/linux"},{label:"parted",permalink:"/blog/tags/parted"}],truncated:!0,authors:[],prevItem:{title:"ThinkPad T14",permalink:"/blog/2022/04/27/thinkpad-t14"},nextItem:{title:"Show Items in Folder",permalink:"/blog/2022/02/14/show-in-folder"}},p={authorsImageUrls:[]},h=[{value:"Hardware preparation",id:"hardware-preparation",children:[],level:2},{value:"Do the migration",id:"do-the-migration",children:[],level:2},{value:"What if...?",id:"what-if",children:[{value:"What if the original Windows partitions don&#39;t fit on the SSD?",id:"what-if-the-original-windows-partitions-dont-fit-on-the-ssd",children:[],level:3}],level:2},{value:"What if I don&#39;t have a Linux live ISO with a desktop?",id:"what-if-i-dont-have-a-linux-live-iso-with-a-desktop",children:[],level:2}],u={toc:h};function c(e){var t=e.components,n=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Nowadays, with the price of SSDs getting cheaper all the time, we would often upgrade an existing laptop HDD into an SSD. And most of the time, in order to do that, it is best to migrate the existing Windows installation on the HDD."),(0,o.kt)("p",null,"Migrating a Windows 10 installation from HDD to SSD is usually done using Windows tools like the ",(0,o.kt)("a",{parentName:"p",href:"https://semiconductor.samsung.com/consumer-storage/support/tools/"},"Samsung Data Migration Software")," or various forms of AOMEI Partition Assistant. I never trusted the latter application 100%, to be very honest."),(0,o.kt)("p",null,"Also, this time I don't have Admin access on the laptop to be migrated. At least not on Windows 10. But the BIOS (UEFI) is unlocked, so we can at least boot a Linux live ISO."),(0,o.kt)("h2",{id:"hardware-preparation"},"Hardware preparation"),(0,o.kt)("p",null,"First, we prepare these tools:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"screwdrivers"),(0,o.kt)("li",{parentName:"ul"},"an external HDD case"),(0,o.kt)("li",{parentName:"ul"},"a bootable Linux live ISO"),(0,o.kt)("li",{parentName:"ul"},"a bootable Windows 10 installer")),(0,o.kt)("p",null,":::warn\nIf the original Windows 10 installation is 32-bit, then you have to use a 32-bit Windows 10 installer for the last step.\n:::"),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"For the Linux live ISO and the Windows 10 installer, use ",(0,o.kt)("a",{parentName:"p",href:"https://ventoy.net"},"Ventoy"),". Then you can have both on one single USB stick."))),(0,o.kt)("p",null,"We remove the existing HDD, and then install the new SSD inside the laptop. This is usually done together with a RAM upgrade, because RAM is relatively cheap nowadays."),(0,o.kt)("p",null,"After that, install the old HDD into the external HDD case."),(0,o.kt)("h2",{id:"do-the-migration"},"Do the migration"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Boot the laptop into the Linux live ISO."),(0,o.kt)("li",{parentName:"ol"},"Plug the external HDD case into the laptop."),(0,o.kt)("li",{parentName:"ol"},"Use ",(0,o.kt)("inlineCode",{parentName:"li"},"lsblk")," to help identify the HDD and SSD device nodes."),(0,o.kt)("li",{parentName:"ol"},"Use ",(0,o.kt)("inlineCode",{parentName:"li"},"fdisk -l /dev/sdX")," to verify the identities of the HDD and SSD device nodes.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Let's say the HDD is ",(0,o.kt)("inlineCode",{parentName:"li"},"/dev/sdc")," and the SSD is ",(0,o.kt)("inlineCode",{parentName:"li"},"/dev/sda")))),(0,o.kt)("li",{parentName:"ol"},"Copy the partition layout of the HDD and apply it onto the SSD: ",(0,o.kt)("inlineCode",{parentName:"li"},"sfdisk -d /dev/sdc | sfdisk /dev/sda")),(0,o.kt)("li",{parentName:"ol"},"Open gparted, and copy the original partitions on the HDD onto the SSD. Usually, there will be at least 2 partitions on the original HDD, one for the EFI partition and another one for the Windows partition."),(0,o.kt)("li",{parentName:"ol"},"Still in gparted, resize the Windows partition to fill up all the available space (if needed)."),(0,o.kt)("li",{parentName:"ol"},"Reboot into the Windows 10 installer, and then repair the Windows boot manager:",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"bootrec /RebuildBcd\nbootrec /fixMbr\nbootrec /fixboot\nbootsect /nt60 SYS\n")))),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Read the ",(0,o.kt)("inlineCode",{parentName:"p"},"sfdisk")," man page for more options, and also consider backing up all partition tables before doing anything."))),(0,o.kt)("h2",{id:"what-if"},"What if...?"),(0,o.kt)("h3",{id:"what-if-the-original-windows-partitions-dont-fit-on-the-ssd"},"What if the original Windows partitions don't fit on the SSD?"),(0,o.kt)("p",null,"Resize your Windows partition before replacing the HDD. Make it as small as possible, and don't worry because you can always extend it using gparted later."),(0,o.kt)("p",null,"Alternatively, you can try to resize your Windows partition using gparted. Others have had ",(0,o.kt)("a",{parentName:"p",href:"https://superuser.com/questions/821131/is-it-safe-to-resize-windows-partition-with-gparted"},"success"),", but I haven't tried it yet."),(0,o.kt)("h2",{id:"what-if-i-dont-have-a-linux-live-iso-with-a-desktop"},"What if I don't have a Linux live ISO with a desktop?"),(0,o.kt)("p",null,"You can still copy the partitions using ",(0,o.kt)("inlineCode",{parentName:"p"},"dd"),". Then you can use ",(0,o.kt)("inlineCode",{parentName:"p"},"parted")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"sfdisk")," or even ",(0,o.kt)("inlineCode",{parentName:"p"},"fdisk")," to resize the partition, and ",(0,o.kt)("inlineCode",{parentName:"p"},"ntfsresize")," to grow the filesystem."))}c.isMDXComponent=!0}}]);