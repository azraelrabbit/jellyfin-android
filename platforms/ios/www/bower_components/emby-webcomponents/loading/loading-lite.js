define(["layoutManager","MaterialSpinner","css!./loading"],function(e){return{show:function(){var n=document.querySelector(".docspinner");n||(n=document.createElement("div"),n.classList.add("docspinner"),n.classList.add("mdl-spinner"),n.classList.add("mdl-js-spinner"),e.tv&&n.classList.add("tv"),document.body.appendChild(n),componentHandler.upgradeElement(n,"MaterialSpinner")),n.classList.add("is-active"),n.classList.remove("loadingHide")},hide:function(){var e=document.querySelector(".docspinner");e&&(e.classList.remove("is-active"),e.classList.add("loadingHide"))}}});