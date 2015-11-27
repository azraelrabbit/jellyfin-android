﻿(function(){var dictionaries={};function getUrl(name,culture){var parts=culture.split('-');if(parts.length==2){parts[1]=parts[1].toUpperCase();culture=parts.join('-');}
return'strings/'+name+'/'+culture+'.json';}
function getDictionary(name,culture){return dictionaries[getUrl(name,culture)];}
function loadDictionary(name,culture){return new Promise(function(resolve,reject){if(getDictionary(name,culture)){resolve();return;}
var url=getUrl(name,culture);var requestUrl=url+"?v="+window.dashboardVersion;var xhr=new XMLHttpRequest();xhr.open('GET',requestUrl,true);xhr.onload=function(e){if(this.status<400){dictionaries[url]=JSON.parse(this.response);resolve();}else{var xhr2=new XMLHttpRequest();xhr2.open('GET',getUrl(name,'en-US'),true);xhr2.onload=function(e){dictionaries[url]=JSON.parse(this.response);resolve();};xhr2.send();}};xhr.send();});}
var currentCulture='en-US';function setCulture(value){Logger.log('Setting culture to '+value);currentCulture=value;return Promise.all([loadDictionary('html',value),loadDictionary('javascript',value)]);}
function normalizeLocaleName(culture){culture=culture.replace('_','-');var parts=culture.split('-');if(parts.length==2){if(parts[0].toLowerCase()==parts[1].toLowerCase()){culture=parts[0].toLowerCase();}}
return culture;}
function getDeviceCulture(){return new Promise(function(resolve,reject){if(AppInfo.isNativeApp){resolve(navigator.language||navigator.userLanguage);}else if(AppInfo.supportsUserDisplayLanguageSetting){Logger.log('AppInfo.supportsUserDisplayLanguageSetting is true');resolve(AppSettings.displayLanguage());}else{Logger.log('Getting culture from document');resolve(document.documentElement.getAttribute('data-culture'));}});}
function ensure(){Logger.log('Entering Globalize.ensure');return new Promise(function(resolve,reject){getDeviceCulture().then(function(culture){culture=normalizeLocaleName(culture||'en-US');setCulture(culture).then(resolve);});});}
function translateDocument(html,dictionaryName){dictionaryName=dictionaryName||'html';var glossary=getDictionary(dictionaryName,currentCulture)||{};return translateHtml(html,glossary);}
function translateHtml(html,dictionary){var startIndex=html.indexOf('${');if(startIndex==-1){return html;}
startIndex+=2;var endIndex=html.indexOf('}',startIndex);if(endIndex==-1){return html;}
var key=html.substring(startIndex,endIndex);var val=dictionary[key]||key;html=html.replace('${'+key+'}',val);return translateHtml(html,dictionary);}
window.Globalize={translate:function(key){var glossary=getDictionary('javascript',currentCulture)||{};var val=glossary[key]||key;for(var i=1;i<arguments.length;i++){val=val.replace('{'+(i-1)+'}',arguments[i]);}
return val;},ensure:ensure,translateDocument:translateDocument};})();