define(["livetvcss","scripts/livetvcomponents"],function(){return function(e){function t(e){var t=e.getMinutes()-S;return t>=0?e.setHours(e.getHours(),S,0,0):e.setHours(e.getHours(),0,0,0),e}function r(e){p=null,a(e)}function a(t){Dashboard.showLoadingMsg(),H.UserId=Dashboard.getCurrentUserId(),H.Limit=Math.min(H.Limit||b,y),H.AddCurrentProgram=!1,p=p||ApiClient.getLiveTvChannels(H);var a=I;a=new Date(a.getTime()+1e3);var i=new Date(a.getTime()+T-2e3);p.then(function(n){if(ApiClient.getLiveTvPrograms({UserId:Dashboard.getCurrentUserId(),MaxStartDate:i.toISOString(),MinEndDate:a.toISOString(),channelIds:n.Items.map(function(e){return e.Id}).join(","),ImageTypeLimit:1,EnableImages:!1,SortBy:"StartDate"}).then(function(e){c(t,a,n.Items,e.Items),Dashboard.hideLoadingMsg(),LibraryBrowser.setLastRefreshed(t)}),e.enablePaging!==!1){var o=LibraryBrowser.getQueryPagingHtml({startIndex:H.StartIndex,limit:H.Limit,totalRecordCount:n.TotalRecordCount,updatePageSizeSetting:!1,showLimit:!0}),s=t.querySelector(".channelPaging");s.innerHTML=o,$(s)}t.querySelector(".btnNextPage").addEventListener("click",function(){H.StartIndex+=H.Limit,r(t)}),t.querySelector(".btnPreviousPage").addEventListener("click",function(){H.StartIndex-=H.Limit,r(t)}),t.querySelector("#selectPageSize").addEventListener("change",function(){H.Limit=parseInt(this.value),H.StartIndex=0,r(t)})})}function i(e,t){var r="";for(e=new Date(e.getTime()),r+='<div class="timeslotHeadersInner">';e.getTime()<t;)r+='<div class="timeslotHeader">',r+='<div class="timeslotHeaderInner">',r+=LibraryBrowser.getDisplayTime(e),r+="</div>",r+="</div>",e.setTime(e.getTime()+D);return r+="</div>"}function n(e){if(!e.StartDateLocal)try{e.StartDateLocal=parseISO8601Date(e.StartDate,{toLocal:!0})}catch(t){}if(!e.EndDateLocal)try{e.EndDateLocal=parseISO8601Date(e.EndDate,{toLocal:!0})}catch(t){}return null}function o(e,t,r,a){var i="",o=t.getTime(),s=o+T-1;a=a.filter(function(e){return e.ChannelId==r.Id}),i+='<div class="channelPrograms">';for(var l=0,c=a.length;c>l;l++){var d=a[l];if(d.ChannelId==r.Id&&(n(d),!(d.EndDateLocal.getTime()<o))){if(d.StartDateLocal.getTime()>s)break;var m=Math.max(d.StartDateLocal.getTime(),o),u=(d.StartDateLocal.getTime()-o)/T;u*=100,u=Math.max(u,0);var g=Math.min(d.EndDateLocal.getTime(),s),v=(g-m)/T;v*=100;var f="programCell",h=!0;d.IsKids?f+=" childProgramInfo":d.IsSports?f+=" sportsProgramInfo":d.IsNews?f+=" newsProgramInfo":d.IsMovie?f+=" movieProgramInfo":(f+=" plainProgramInfo",h=!1),i+='<a href="itemdetails.html?id='+d.Id+'" class="'+f+'" data-programid="'+d.Id+'" style="left:'+u+"%;width:"+v+'%;">',i+='<div class="guideProgramName">',i+=d.Name,i+="</div>",i+='<div class="guideProgramTime">',d.IsLive?i+='<span class="liveTvProgram">'+Globalize.translate("LabelLiveProgram")+"&nbsp;&nbsp;</span>":d.IsPremiere?i+='<span class="premiereTvProgram">'+Globalize.translate("LabelPremiereProgram")+"&nbsp;&nbsp;</span>":d.IsSeries&&!d.IsRepeat&&(i+='<span class="newTvProgram">'+Globalize.translate("LabelNewProgram")+"&nbsp;&nbsp;</span>"),i+=LibraryBrowser.getDisplayTime(d.StartDateLocal),i+=" - ",i+=LibraryBrowser.getDisplayTime(d.EndDateLocal),d.SeriesTimerId?(i+='<div class="timerCircle seriesTimerCircle"></div>',i+='<div class="timerCircle seriesTimerCircle"></div>',i+='<div class="timerCircle seriesTimerCircle"></div>'):d.TimerId&&(i+='<div class="timerCircle"></div>'),i+="</div>",h&&(i+='<div class="programAccent"></div>'),i+="</a>"}}return i+="</div>"}function s(t,r,a,i){for(var n=[],s=0,l=a.length;l>s;s++)n.push(o(t,r,a[s],i));var c=t.querySelector(".programGrid");c.innerHTML=n.join(""),$(c).scrollTop(0).scrollLeft(0),e.enableHoverMenu&&$(c).createGuideHoverMenu(".programCell")}function l(e,t){for(var r="",a=0,i=t.length;i>a;a++){var n=t[a];r+='<div class="channelHeaderCellContainer">',r+='<a class="channelHeaderCell" href="itemdetails.html?id='+n.Id+'">';var o=n.ImageTags.Primary,s=o?"guideChannelInfo guideChannelInfoWithImage":"guideChannelInfo";if(r+='<div class="'+s+'">'+n.Number+"</div>",o){var l=ApiClient.getScaledImageUrl(n.Id,{maxHeight:44,maxWidth:70,tag:n.ImageTags.Primary,type:"Primary"});r+='<div class="guideChannelImage lazy" data-src="'+l+'"></div>'}else r+='<div class="guideChannelName">'+n.Name+"</div>";r+="</a>",r+="</div>"}var c=e.querySelector(".channelList");c.innerHTML=r,ImageLoader.lazyChildren(c)}function c(e,t,r,a){l(e,r);var n=t,o=new Date(n.getTime()+T);e.querySelector(".timeslotHeaders").innerHTML=i(n,o),s(e,t,r,a)}function d(e,t){C||(w=!0,$(e.querySelector(".timeslotHeaders")).scrollLeft($(t).scrollLeft()),w=!1)}function m(e,t){w||(C=!0,$(e.querySelector(".programGrid")).scrollLeft($(t).scrollLeft()),C=!1)}function u(e,r){I=t(r),a(e);var i=LibraryBrowser.getFutureDateText(r);i='<span class="currentDay">'+i.replace(" "," </span>"),e.querySelector(".currentDate").innerHTML=i}function g(e,t){var r=new Date;r.setHours(r.getHours(),0,0,0);var a=parseISO8601Date(t.StartDate,{toLocal:!0}),i=parseISO8601Date(t.EndDate,{toLocal:!0});for(a.setHours(0,0,0,0),i.setHours(0,0,0,0),a.getTime()>=i.getTime()&&i.setDate(a.getDate()+1),a=new Date(Math.max(r,a)),P=[];i>=a;)P.push({name:LibraryBrowser.getFutureDateText(a),id:a.getTime(),ironIcon:"today"}),a.setDate(a.getDate()+1),a.setHours(0,0,0,0);var n=new Date;I&&n.setTime(I.getTime()),u(e,n)}function v(e,t){y=t,ApiClient.getLiveTvGuideInfo().then(function(t){g(e,t)})}function f(e){$(".guideRequiresUnlock",e).hide(),RegistrationServices.validateFeature("livetv").then(function(){Dashboard.showLoadingMsg(),v(e,1e3)},function(){Dashboard.showLoadingMsg();var t=5;$(".guideRequiresUnlock",e).show(),$(".unlockText",e).html(Globalize.translate("MessageLiveTvGuideRequiresUnlock",t)),v(e,t)})}function h(e){require(["actionsheet"],function(){ActionSheetElement.show({items:P,showCancel:!0,title:Globalize.translate("HeaderSelectDate"),callback:function(t){var r=new Date;r.setTime(parseInt(t)),u(e,r)}})})}var L=this;L.refresh=function(){f(e.element)};var I,p,S=30,D=60*S*1e3,T=864e5,b=browserInfo.mobile?50:100,y=1e3,H={StartIndex:0,Limit:b,EnableFavoriteSorting:!0},w=!1,C=!1,P=[],M=new XMLHttpRequest;M.open("GET","components/tvguide/tvguide.template.html",!0),M.onload=function(){var t=this.response,r=e.element;r.innerHTML=Globalize.translateDocument(t),r.querySelector(".programGrid").addEventListener("scroll",function(e){d(r,e.target)}),browserInfo.mobile?r.querySelector(".tvGuide").classList.add("mobileGuide"):(r.querySelector(".tvGuide").classList.remove("mobileGuide"),r.querySelector(".timeslotHeaders").addEventListener("scroll",function(e){m(r,e.target)})),AppInfo.enableHeadRoom&&e.enableHeadRoom&&requirejs(["headroom"],function(){var e=new Headroom(r.querySelector(".tvGuideHeader"));e.init()}),$(".btnUnlockGuide",r).on("click",function(){f(r)}),$(".btnSelectDate",r).on("click",function(){h(r)}),L.refresh()},M.send()}});