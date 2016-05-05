define(["dialogHelper","loading","jQuery","paper-fab","paper-input","paper-checkbox"],function(e,t,i){function a(e){var a={ProviderIds:{}};i(".identifyField",e).each(function(){var e=this.value;e&&("number"==this.type&&(e=parseInt(e)),a[this.getAttribute("data-lookup")]=e)});var n=!1;return i(".txtLookupId",e).each(function(){var e=this.value;e&&(n=!0),a.ProviderIds[this.getAttribute("data-providerkey")]=e}),n||a.Name?(h&&h.GameSystem&&(a.GameSystem=h.GameSystem),a={SearchInfo:a,IncludeDisabledProviders:!0},t.show(),void ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Items/RemoteSearch/"+f),data:JSON.stringify(a),contentType:"application/json",dataType:"json"}).then(function(i){t.hide(),r(e,i)})):void require(["toast"],function(e){e(Globalize.translate("MessagePleaseEnterNameOrId"))})}function r(e,t){i(".popupIdentifyForm",e).hide(),i(".identificationSearchResults",e).show(),i(".identifyOptionsForm",e).hide(),i(".btnIdentifyBack",e).show();for(var a="",r=0,s=t.length;s>r;r++){var l=t[r];a+=d(l,r)}var c=i(".identificationSearchResultList",e).html(a);i(".searchImage",c).on("click",function(){var i=parseInt(this.getAttribute("data-index")),a=t[i];null!=h?o(e,a):n(e,a)})}function n(i,a){I=a,g=!0,t.hide(),e.close(i)}function o(e,t){i(".popupIdentifyForm",e).hide(),i(".identificationSearchResults",e).hide(),i(".identifyOptionsForm",e).show(),i(".btnIdentifyBack",e).show(),i("#chkIdentifyReplaceImages",e).checked(!0),I=t;var a=[];a.push(t.Name),t.ProductionYear&&a.push(t.ProductionYear),t.GameSystem&&a.push(t.GameSystem);var r=a.join("<br/>");if(t.ImageUrl){var n=s(t.ImageUrl,t.SearchProviderName);r='<img src="'+n+'" style="max-height:160px;" /><br/>'+r}i(".selectedSearchResult",e).html(r)}function d(e,t){var i="",a="card";if(a+="Episode"==f?" backdropCard":"MusicAlbum"==f||"MusicArtist"==f?" squareCard":" portraitCard",i+='<div class="'+a+'">',i+='<div class="cardBox">',i+='<div class="cardScalable">',i+='<div class="cardPadder"></div>',i+='<a class="cardContent searchImage" href="#" data-index="'+t+'">',e.ImageUrl){var r=s(e.ImageUrl,e.SearchProviderName);i+='<div class="cardImage" style="background-image:url(\''+r+"');\"></div>"}else i+='<div class="cardImage iconCardImage"><iron-icon icon="search"></iron-icon></div>';return i+="</a>",i+="</div>",i+='<div class="cardFooter outerCardFooter">',i+='<div class="cardText cardTextCentered">'+e.Name+"</div>",i+='<div class="cardText cardTextCentered">',i+=e.ProductionYear||"&nbsp;",i+="</div>",e.GameSystem&&(i+='<div class="cardText cardTextCentered">',i+=e.GameSystem,i+="</div>"),i+="</div>",i+="</div>",i+="</div>"}function s(e,t){return ApiClient.getUrl("Items/RemoteSearch/Image",{imageUrl:e,ProviderName:t})}function l(a){t.show();var r={ReplaceAllImages:i("#chkIdentifyReplaceImages",a).checked()};ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Items/RemoteSearch/Apply/"+h.Id,r),data:JSON.stringify(I),contentType:"application/json"}).then(function(){g=!0,t.hide(),e.close(a)},function(){t.hide(),e.close(a)})}function c(e,t){ApiClient.getJSON(ApiClient.getUrl("Items/"+t.Id+"/ExternalIdInfos")).then(function(a){for(var r="",n=t.ProviderIds||{},o=0,d=a.length;d>o;o++){var s=a[o],l="txtLookup"+s.Key;r+="<div>";{var c=Globalize.translate("LabelDynamicExternalId").replace("{0}",s.Name);n[s.Key]||""}r+='<paper-input class="txtLookupId" data-providerkey="'+s.Key+'" id="'+l+'" label="'+c+'"></paper-input>',r+="</div>"}i("#txtLookupName",e).val(""),"Person"==t.Type||"BoxSet"==t.Type?(i(".fldLookupYear",e).hide(),i("#txtLookupYear",e).val("")):(i(".fldLookupYear",e).show(),i("#txtLookupYear",e).val("")),i(".identifyProviderIds",e).html(r),e.querySelector(".dialogHeaderTitle").innerHTML=Globalize.translate("HeaderIdentify")})}function u(r){t.show();var n=new XMLHttpRequest;n.open("GET","components/itemidentifier/itemidentifier.template.html",!0),n.onload=function(){var n=this.response;ApiClient.getItem(ApiClient.getCurrentUserId(),r).then(function(r){h=r,f=h.Type;var o=e.createDialog({size:"medium"});o.classList.add("ui-body-b"),o.classList.add("background-theme-b");var d="";d+=Globalize.translateDocument(n),o.innerHTML=d,document.body.appendChild(o),i(o).on("close",p),e.open(o),o.querySelector(".popupIdentifyForm").addEventListener("submit",function(e){return e.preventDefault(),a(o),!1}),o.querySelector(".identifyOptionsForm").addEventListener("submit",function(e){return e.preventDefault(),l(o),!1}),i(".btnCancel",o).on("click",function(){e.close(o)}),o.classList.add("identifyDialog"),c(o,r),t.hide()})},n.send()}function p(){i(this).remove(),t.hide(),y.resolveWith(null,[g])}function m(i,r,n,o){h=null,f=n;var d=new XMLHttpRequest;d.open("GET","components/itemidentifier/itemidentifier.template.html",!0),d.onload=function(){var d=this.response,s=e.createDialog({size:"medium"});s.classList.add("ui-body-a"),s.classList.add("background-theme-a");var l="";l+=Globalize.translateDocument(d),s.innerHTML=l,document.body.appendChild(s),e.open(s),s.querySelector(".btnCancel").addEventListener("click",function(){e.close(s)}),s.querySelector(".popupIdentifyForm").addEventListener("submit",function(e){return e.preventDefault(),a(s),!1}),s.addEventListener("close",function(){t.hide();var e=g?I:null;o(e)}),s.classList.add("identifyDialog"),v(s,i,r,n)},d.send()}function v(e,t,i,a){e.querySelector("#txtLookupName").value=t,"Person"==a||"BoxSet"==a?(e.querySelector(".fldLookupYear").classList.add("hide"),e.querySelector("#txtLookupYear").value=""):(e.querySelector(".fldLookupYear").classList.remove("hide"),e.querySelector("#txtLookupYear").value=i),e.querySelector(".dialogHeaderTitle").innerHTML=Globalize.translate("HeaderSearch")}var h,f,y,I,g=!1;return{show:function(e){var t=jQuery.Deferred();return y=t,g=!1,u(e),t.promise()},showFindNew:function(e,t,i){return new Promise(function(a){g=!1,m(e,t,i,a)})}}});