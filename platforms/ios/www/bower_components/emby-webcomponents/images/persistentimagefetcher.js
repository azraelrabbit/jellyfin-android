define(["cryptojs-md5"],function(){function t(t,e){"IMG"!==t.tagName?t.style.backgroundImage="url('"+e+"')":t.setAttribute("src",e)}function e(t,n,r,i){("."==n[0]||""==n[0])&&(n=n.slice(1)),t.getDirectory(n[0],{create:!0},function(t){n.length>1?e(t,n.slice(1),r,i):r(t)},i)}function n(t){var e=t.indexOf("://");return-1!=e&&(t=t.substring(e+3),e=t.indexOf("/"),-1!=e&&(t=t.substring(e+1))),CryptoJS.MD5(t).toString()}function r(t,e,n,r,o){var u=new XMLHttpRequest;u.open("GET",t,!0),u.responseType="arraybuffer",u.onload=function(){200==this.status?i(e,n,this.getResponseHeader("Content-Type"),this.response,r,o):o()},u.send()}function i(t,e,n,r,i,o){t.getFile(e,{create:!0},function(t){t.createWriter(function(e){e.onwriteend=function(){i(t)},e.onerror=o;var u=new Blob([r],{type:n});e.write(u)},o)},o)}function o(t){return new Promise(function(e,i){-1!=t.indexOf("tag=")&&(t+="&accept=webp");var o=n(t),c=function(t){e(t.toURL())},f=function(t){i()};if(!a||!u)return void f("");var g="/"+s+"/"+o;a.root.getFile(g,{create:!1},c,function(){r(t,u,o,c,f)})})}var u,c=1572864e3,s="images";navigator.webkitPersistentStorage.requestQuota(c,function(t){var n=window.webkitRequestFileSystem||window.requestFileSystem;n(PERSISTENT,t,function(t){a=t,e(a.root,s.split("/"),function(t){u=t})})});var a;return{loadImage:function(e,n){return o(n).then(function(n){return t(e,n),e},function(){return t(e,n),e})}}});