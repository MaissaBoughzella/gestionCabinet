(function(C,n){"object"===typeof exports?n(exports):"function"===typeof define&&define.amd?define(["exports"],n):n(C)})(this,function(C){function n(a){this._targetElement=a;this._introItems=[];this._options={nextLabel:"Next \x26rarr;",prevLabel:"\x26larr; Back",skipLabel:"Skip",doneLabel:"Done",hidePrev:!1,hideNext:!1,tooltipPosition:"bottom",tooltipClass:"",highlightClass:"",exitOnEsc:!0,exitOnOverlayClick:!0,showStepNumbers:!0,keyboardNavigation:!0,showButtons:!0,showBullets:!0,showProgress:!1,
scrollToElement:!0,scrollTo:"element",scrollPadding:30,overlayOpacity:.8,positionPrecedence:["bottom","top","right","left"],disableInteraction:!1,hintPosition:"top-middle",hintButtonLabel:"Got it",hintAnimation:!0}}function Z(a){var b,c=[],d=this;if(this._options.steps){var f=0;for(b=this._options.steps.length;f<b;f++){var e=y(this._options.steps[f]);e.step=c.length+1;"string"===typeof e.element&&(e.element=document.querySelector(e.element));if("undefined"===typeof e.element||null==e.element){var g=
document.querySelector(".introjsFloatingElement");null==g&&(g=document.createElement("div"),g.className="introjsFloatingElement",document.body.appendChild(g));e.element=g;e.position="floating"}e.scrollTo=e.scrollTo||this._options.scrollTo;"undefined"===typeof e.disableInteraction&&(e.disableInteraction=this._options.disableInteraction);null!=e.element&&c.push(e)}}else{g=a.querySelectorAll("*[data-intro]");if(1>g.length)return!1;for(var f=0,r=g.length;f<r;f++)if(e=g[f],"none"!=e.style.display){var q=
parseInt(e.getAttribute("data-step"),10);b=this._options.disableInteraction;"undefined"!=typeof e.getAttribute("data-disable-interaction")&&(b=!!e.getAttribute("data-disable-interaction"));0<q&&(c[q-1]={element:e,intro:e.getAttribute("data-intro"),step:parseInt(e.getAttribute("data-step"),10),tooltipClass:e.getAttribute("data-tooltipClass"),highlightClass:e.getAttribute("data-highlightClass"),position:e.getAttribute("data-position")||this._options.tooltipPosition,scrollTo:e.getAttribute("data-scrollTo")||
this._options.scrollTo,disableInteraction:b})}f=q=0;for(r=g.length;f<r;f++)if(e=g[f],null==e.getAttribute("data-step")){for(;"undefined"!=typeof c[q];)q++;b=this._options.disableInteraction;"undefined"!=typeof e.getAttribute("data-disable-interaction")&&(b=!!e.getAttribute("data-disable-interaction"));c[q]={element:e,intro:e.getAttribute("data-intro"),step:q+1,tooltipClass:e.getAttribute("data-tooltipClass"),highlightClass:e.getAttribute("data-highlightClass"),position:e.getAttribute("data-position")||
this._options.tooltipPosition,scrollTo:e.getAttribute("data-scrollTo")||this._options.scrollTo,disableInteraction:b}}}f=[];for(b=0;b<c.length;b++)c[b]&&f.push(c[b]);c=f;c.sort(function(a,b){return a.step-b.step});d._introItems=c;aa.call(d,a)&&(x.call(d),a.querySelector(".introjs-skipbutton"),a.querySelector(".introjs-nextbutton"),d._onKeyDown=function(b){if(27===b.keyCode&&1==d._options.exitOnEsc)z.call(d,a);else if(37===b.keyCode)E.call(d);else if(39===b.keyCode)x.call(d);else if(13===b.keyCode){var c=
b.target||b.srcElement;c&&0<c.className.indexOf("introjs-prevbutton")?E.call(d):c&&0<c.className.indexOf("introjs-skipbutton")?(d._introItems.length-1==d._currentStep&&"function"===typeof d._introCompleteCallback&&d._introCompleteCallback.call(d),z.call(d,a)):x.call(d);b.preventDefault?b.preventDefault():b.returnValue=!1}},d._onResize=function(a){d.refresh.call(d)},window.addEventListener?(this._options.keyboardNavigation&&window.addEventListener("keydown",d._onKeyDown,!0),window.addEventListener("resize",
d._onResize,!0)):document.attachEvent&&(this._options.keyboardNavigation&&document.attachEvent("onkeydown",d._onKeyDown),document.attachEvent("onresize",d._onResize)));return!1}function y(a){if(null==a||"object"!=typeof a||"undefined"!=typeof a.nodeType)return a;var b={},c;for(c in a)b[c]="undefined"!=typeof jQuery&&a[c]instanceof jQuery?a[c]:y(a[c]);return b}function x(){var a;this._direction="forward";if("undefined"!==typeof this._currentStepNumber)for(var b=0,c=this._introItems.length;b<c;b++)this._introItems[b].step===
this._currentStepNumber&&(this._currentStep=b-1,this._currentStepNumber=void 0);"undefined"===typeof this._currentStep?this._currentStep=0:++this._currentStep;"undefined"!==typeof this._introBeforeChangeCallback&&(a=this._introBeforeChangeCallback.call(this));if(!1===a)return--this._currentStep,!1;this._introItems.length<=this._currentStep?("function"===typeof this._introCompleteCallback&&this._introCompleteCallback.call(this),z.call(this,this._targetElement)):O.call(this,this._introItems[this._currentStep])}
function E(){var a;this._direction="backward";if(0===this._currentStep)return!1;--this._currentStep;"undefined"!==typeof this._introBeforeChangeCallback&&(a=this._introBeforeChangeCallback.call(this));if(!1===a)return++this._currentStep,!1;O.call(this,this._introItems[this._currentStep])}function z(a,b){var c=!0;void 0!=this._introBeforeExitCallback&&(c=this._introBeforeExitCallback.call(self));if(b||!1!==c){if((c=a.querySelectorAll(".introjs-overlay"))&&0<c.length)for(b=c.length-1;0<=b;b--){var d=
c[b];d.style.opacity=0;setTimeout(function(){this.parentNode&&this.parentNode.removeChild(this)}.bind(d),500)}(b=a.querySelector(".introjs-helperLayer"))&&b.parentNode.removeChild(b);(b=a.querySelector(".introjs-tooltipReferenceLayer"))&&b.parentNode.removeChild(b);(a=a.querySelector(".introjs-disableInteraction"))&&a.parentNode.removeChild(a);(a=document.querySelector(".introjsFloatingElement"))&&a.parentNode.removeChild(a);P();if((a=document.querySelectorAll(".introjs-fixParent"))&&0<a.length)for(b=
a.length-1;0<=b;b--)a[b].className=a[b].className.replace(/introjs-fixParent/g,"").replace(/^\s+|\s+$/g,"");window.removeEventListener?window.removeEventListener("keydown",this._onKeyDown,!0):document.detachEvent&&document.detachEvent("onkeydown",this._onKeyDown);void 0!=this._introExitCallback&&this._introExitCallback.call(self);this._currentStep=void 0}}function F(a,b,c,d,f){f=f||!1;b.style.top=null;b.style.right=null;b.style.bottom=null;b.style.left=null;b.style.marginLeft=null;b.style.marginTop=
null;c.style.display="inherit";"undefined"!=typeof d&&null!=d&&(d.style.top=null,d.style.left=null);if(this._introItems[this._currentStep]){var e=this._introItems[this._currentStep];e="string"===typeof e.tooltipClass?e.tooltipClass:this._options.tooltipClass;b.className=("introjs-tooltip "+e).replace(/^\s+|\s+$/g,"");var g=this._introItems[this._currentStep].position;"floating"!=g&&(g="auto"===g?Q.call(this,a,b):Q.call(this,a,b,g));e=u(a);a=u(b);var r=H();switch(g){case "top":c.className="introjs-arrow bottom";
I(e,f?0:15,a,r,b);b.style.bottom=e.height+20+"px";break;case "right":b.style.left=e.width+20+"px";e.top+a.height>r.height?(c.className="introjs-arrow left-bottom",b.style.top="-"+(a.height-e.height-20)+"px"):c.className="introjs-arrow left";break;case "left":f||1!=this._options.showStepNumbers||(b.style.top="15px");e.top+a.height>r.height?(b.style.top="-"+(a.height-e.height-20)+"px",c.className="introjs-arrow right-bottom"):c.className="introjs-arrow right";b.style.right=e.width+20+"px";break;case "floating":c.style.display=
"none";b.style.left="50%";b.style.top="50%";b.style.marginLeft="-"+a.width/2+"px";b.style.marginTop="-"+a.height/2+"px";"undefined"!=typeof d&&null!=d&&(d.style.left="-"+(a.width/2+18)+"px",d.style.top="-"+(a.height/2+18)+"px");break;case "bottom-right-aligned":c.className="introjs-arrow top-right";R(e,0,a,b);b.style.top=e.height+20+"px";break;case "bottom-middle-aligned":c.className="introjs-arrow top-middle";c=e.width/2-a.width/2;f&&(c+=5);R(e,c,a,b)&&(b.style.right=null,I(e,c,a,r,b));b.style.top=
e.height+20+"px";break;default:c.className="introjs-arrow top",I(e,0,a,r,b),b.style.top=e.height+20+"px"}}}function I(a,b,c,d,f){if(a.left+b+c.width>d.width)return f.style.left=d.width-c.width-a.left+"px",!1;f.style.left=b+"px";return!0}function R(a,b,c,d){if(0>a.left+a.width-b-c.width)return d.style.left=-a.left+"px",!1;d.style.right=b+"px";return!0}function Q(a,b,c){var d=this._options.positionPrecedence.slice(),f=H(),e=u(b).height+10;b=u(b).width+20;a=u(a);var g="floating";a.left+b>f.width||0>
a.left+a.width/2-b?(t(d,"bottom"),t(d,"top")):(a.height+a.top+e>f.height&&t(d,"bottom"),0>a.top-e&&t(d,"top"));a.width+a.left+b>f.width&&t(d,"right");0>a.left-b&&t(d,"left");0<d.length&&(g=d[0]);c&&"auto"!=c&&-1<d.indexOf(c)&&(g=c);return g}function t(a,b){-1<a.indexOf(b)&&a.splice(a.indexOf(b),1)}function v(a){if(a&&this._introItems[this._currentStep]){var b=this._introItems[this._currentStep],c=u(b.element),d=10;J(b.element)?a.className+=" introjs-fixedTooltip":a.className=a.className.replace(" introjs-fixedTooltip",
"");"floating"==b.position&&(d=0);a.setAttribute("style","width: "+(c.width+d)+"px; height:"+(c.height+d)+"px; top:"+(c.top-5)+"px;left: "+(c.left-5)+"px;")}}function ba(){var a=document.querySelector(".introjs-disableInteraction");null===a&&(a=document.createElement("div"),a.className="introjs-disableInteraction",this._targetElement.appendChild(a));v.call(this,a)}function D(a){a.setAttribute("role","button");a.tabIndex=0}function O(a){"undefined"!==typeof this._introChangeCallback&&this._introChangeCallback.call(this,
a.element);var b=this,c=document.querySelector(".introjs-helperLayer"),d=document.querySelector(".introjs-tooltipReferenceLayer"),f="introjs-helperLayer";u(a.element);"string"===typeof a.highlightClass&&(f+=" "+a.highlightClass);"string"===typeof this._options.highlightClass&&(f+=" "+this._options.highlightClass);if(null!=c){var e=d.querySelector(".introjs-helperNumberLayer"),g=d.querySelector(".introjs-tooltiptext"),r=d.querySelector(".introjs-arrow"),q=d.querySelector(".introjs-tooltip");var l=
d.querySelector(".introjs-skipbutton");var h=d.querySelector(".introjs-prevbutton");var k=d.querySelector(".introjs-nextbutton");c.className=f;q.style.opacity=0;q.style.display="none";if(null!=e){var p=this._introItems[0<=a.step-2?a.step-2:0];if(null!=p&&"forward"==this._direction&&"floating"==p.position||"backward"==this._direction&&"floating"==a.position)e.style.opacity=0}v.call(b,c);v.call(b,d);if((p=document.querySelectorAll(".introjs-fixParent"))&&0<p.length)for(f=p.length-1;0<=f;f--)p[f].className=
p[f].className.replace(/introjs-fixParent/g,"").replace(/^\s+|\s+$/g,"");P();b._lastShowElementTimer&&clearTimeout(b._lastShowElementTimer);b._lastShowElementTimer=setTimeout(function(){null!=e&&(e.innerHTML=a.step);g.innerHTML=a.intro;q.style.display="block";F.call(b,a.element,q,r,e);b._options.showBullets&&(d.querySelector(".introjs-bullets li \x3e a.active").className="",d.querySelector('.introjs-bullets li \x3e a[data-stepnumber\x3d"'+a.step+'"]').className="active");d.querySelector(".introjs-progress .introjs-progressbar").setAttribute("style",
"width:"+S.call(b)+"%;");q.style.opacity=1;e&&(e.style.opacity=1);"undefined"!==typeof l&&null!=l&&/introjs-donebutton/gi.test(l.className)?l.focus():"undefined"!==typeof k&&null!=k&&k.focus();T.call(b,a.scrollTo,a,g)},350)}else{var n=document.createElement("div");h=document.createElement("div");var c=document.createElement("div"),m=document.createElement("div"),t=document.createElement("div"),w=document.createElement("div"),G=document.createElement("div"),A=document.createElement("div");n.className=
f;h.className="introjs-tooltipReferenceLayer";v.call(b,n);v.call(b,h);this._targetElement.appendChild(n);this._targetElement.appendChild(h);c.className="introjs-arrow";t.className="introjs-tooltiptext";t.innerHTML=a.intro;w.className="introjs-bullets";!1===this._options.showBullets&&(w.style.display="none");for(var n=document.createElement("ul"),f=0,C=this._introItems.length;f<C;f++){var y=document.createElement("li"),B=document.createElement("a");B.onclick=function(){b.goToStep(this.getAttribute("data-stepnumber"))};
f===a.step-1&&(B.className="active");D(B);B.innerHTML="\x26nbsp;";B.setAttribute("data-stepnumber",this._introItems[f].step);y.appendChild(B);n.appendChild(y)}w.appendChild(n);G.className="introjs-progress";!1===this._options.showProgress&&(G.style.display="none");f=document.createElement("div");f.className="introjs-progressbar";f.setAttribute("style","width:"+S.call(this)+"%;");G.appendChild(f);A.className="introjs-tooltipbuttons";!1===this._options.showButtons&&(A.style.display="none");m.className=
"introjs-tooltip";m.appendChild(t);m.appendChild(w);m.appendChild(G);1==this._options.showStepNumbers&&(p=document.createElement("span"),p.className="introjs-helperNumberLayer",p.innerHTML=a.step,h.appendChild(p));m.appendChild(c);h.appendChild(m);k=document.createElement("a");k.onclick=function(){b._introItems.length-1!=b._currentStep&&x.call(b)};D(k);k.innerHTML=this._options.nextLabel;h=document.createElement("a");h.onclick=function(){0!=b._currentStep&&E.call(b)};D(h);h.innerHTML=this._options.prevLabel;
l=document.createElement("a");l.className="introjs-button introjs-skipbutton";D(l);l.innerHTML=this._options.skipLabel;l.onclick=function(){b._introItems.length-1==b._currentStep&&"function"===typeof b._introCompleteCallback&&b._introCompleteCallback.call(b);z.call(b,b._targetElement)};A.appendChild(l);1<this._introItems.length&&(A.appendChild(h),A.appendChild(k));m.appendChild(A);F.call(b,a.element,m,c,p);T.call(this,a.scrollTo,a,m)}(p=b._targetElement.querySelector(".introjs-disableInteraction"))&&
p.parentNode.removeChild(p);a.disableInteraction&&ba.call(b);"undefined"!==typeof k&&null!=k&&k.removeAttribute("tabIndex");"undefined"!==typeof h&&null!=h&&h.removeAttribute("tabIndex");0==this._currentStep&&1<this._introItems.length?("undefined"!==typeof l&&null!=l&&(l.className="introjs-button introjs-skipbutton"),"undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton"),1==this._options.hidePrev?("undefined"!==typeof h&&null!=h&&(h.className="introjs-button introjs-prevbutton introjs-hidden"),
"undefined"!==typeof k&&null!=k&&(k.className+=" introjs-fullbutton")):"undefined"!==typeof h&&null!=h&&(h.className="introjs-button introjs-prevbutton introjs-disabled"),"undefined"!==typeof h&&null!=h&&(h.tabIndex="-1"),"undefined"!==typeof l&&null!=l&&(l.innerHTML=this._options.skipLabel)):this._introItems.length-1==this._currentStep||1==this._introItems.length?("undefined"!==typeof l&&null!=l&&(l.innerHTML=this._options.doneLabel,l.className+=" introjs-donebutton"),"undefined"!==typeof h&&null!=
h&&(h.className="introjs-button introjs-prevbutton"),1==this._options.hideNext?("undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton introjs-hidden"),"undefined"!==typeof h&&null!=h&&(h.className+=" introjs-fullbutton")):"undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton introjs-disabled"),"undefined"!==typeof k&&null!=k&&(k.tabIndex="-1")):("undefined"!==typeof l&&null!=l&&(l.className="introjs-button introjs-skipbutton"),"undefined"!==typeof h&&
null!=h&&(h.className="introjs-button introjs-prevbutton"),"undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton"),"undefined"!==typeof l&&null!=l&&(l.innerHTML=this._options.skipLabel));"undefined"!==typeof k&&null!=k&&k.focus();ca(a);"undefined"!==typeof this._introAfterChangeCallback&&this._introAfterChangeCallback.call(this,a.element)}function T(a,b,c){this._options.scrollToElement&&(a="tooltip"===a?c.getBoundingClientRect():b.element.getBoundingClientRect(),c=b.element.getBoundingClientRect(),
0<=c.top&&0<=c.left&&c.bottom+80<=window.innerHeight&&c.right<=window.innerWidth||(c=H().height,0>a.bottom-(a.bottom-a.top)||b.element.clientHeight>c?window.scrollBy(0,a.top-(c/2-a.height/2)-this._options.scrollPadding):window.scrollBy(0,a.top-(c/2-a.height/2)+this._options.scrollPadding)))}function P(){for(var a=document.querySelectorAll(".introjs-showElement"),b=0,c=a.length;b<c;b++){var d=a[b],f=/introjs-[a-zA-Z]+/g;if(d instanceof SVGElement){var e=d.getAttribute("class")||"";d.setAttribute("class",
e.replace(f,"").replace(/^\s+|\s+$/g,""))}else d.className=d.className.replace(f,"").replace(/^\s+|\s+$/g,"")}}function ca(a){var b;if(a.element instanceof SVGElement)for(b=a.element.parentNode;null!=a.element.parentNode&&b.tagName&&"body"!==b.tagName.toLowerCase();)"svg"===b.tagName.toLowerCase()&&K(b,"introjs-showElement introjs-relativePosition"),b=b.parentNode;K(a.element,"introjs-showElement");b=m(a.element,"position");"absolute"!==b&&"relative"!==b&&"fixed"!==b&&K(a.element,"introjs-relativePosition");
for(b=a.element.parentNode;null!=b&&b.tagName&&"body"!==b.tagName.toLowerCase();){a=m(b,"z-index");var c=parseFloat(m(b,"opacity")),d=m(b,"transform")||m(b,"-webkit-transform")||m(b,"-moz-transform")||m(b,"-ms-transform")||m(b,"-o-transform");if(/[0-9]+/.test(a)||1>c||"none"!==d&&void 0!==d)b.className+=" introjs-fixParent";b=b.parentNode}}function K(a,b){if(a instanceof SVGElement){var c=a.getAttribute("class")||"";a.setAttribute("class",c+" "+b)}else a.className+=" "+b}function m(a,b){var c="";
a.currentStyle?c=a.currentStyle[b]:document.defaultView&&document.defaultView.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null).getPropertyValue(b));return c&&c.toLowerCase?c.toLowerCase():c}function J(a){var b=a.parentNode;return b&&"HTML"!==b.nodeName?"fixed"==m(a,"position")?!0:J(b):!1}function H(){if(void 0!=window.innerWidth)return{width:window.innerWidth,height:window.innerHeight};var a=document.documentElement;return{width:a.clientWidth,height:a.clientHeight}}function aa(a){var b=
document.createElement("div"),c="",d=this;b.className="introjs-overlay";if(a.tagName&&"body"!==a.tagName.toLowerCase()){var f=u(a);f&&(c+="width: "+f.width+"px; height:"+f.height+"px; top:"+f.top+"px;left: "+f.left+"px;",b.setAttribute("style",c))}else c+="top: 0;bottom: 0; left: 0;right: 0;position: fixed;",b.setAttribute("style",c);a.appendChild(b);b.onclick=function(){1==d._options.exitOnOverlayClick&&z.call(d,a)};setTimeout(function(){c+="opacity: "+d._options.overlayOpacity.toString()+";";b.setAttribute("style",
c)},10);return!0}function w(){var a=this._targetElement.querySelector(".introjs-hintReference");if(a){var b=a.getAttribute("data-step");a.parentNode.removeChild(a);return b}}function U(a){this._introItems=[];if(this._options.hints){a=0;for(var b=this._options.hints.length;a<b;a++){var c=y(this._options.hints[a]);"string"===typeof c.element&&(c.element=document.querySelector(c.element));c.hintPosition=c.hintPosition||this._options.hintPosition;c.hintAnimation=c.hintAnimation||this._options.hintAnimation;
null!=c.element&&this._introItems.push(c)}}else{c=a.querySelectorAll("*[data-hint]");if(1>c.length)return!1;a=0;for(b=c.length;a<b;a++){var d=c[a],f=d.getAttribute("data-hintAnimation"),f=f?"true"==f:this._options.hintAnimation;this._introItems.push({element:d,hint:d.getAttribute("data-hint"),hintPosition:d.getAttribute("data-hintPosition")||this._options.hintPosition,hintAnimation:f,tooltipClass:d.getAttribute("data-tooltipClass"),position:d.getAttribute("data-position")||this._options.tooltipPosition})}}da.call(this);
document.addEventListener?(document.addEventListener("click",w.bind(this),!1),window.addEventListener("resize",L.bind(this),!0)):document.attachEvent&&(document.attachEvent("onclick",w.bind(this)),document.attachEvent("onresize",L.bind(this)))}function L(){for(var a=0,b=this._introItems.length;a<b;a++){var c=this._introItems[a];"undefined"!=typeof c.targetElement&&V.call(this,c.hintPosition,c.element,c.targetElement)}}function M(a){w.call(this);var b=this._targetElement.querySelector('.introjs-hint[data-step\x3d"'+
a+'"]');b&&(b.className+=" introjs-hidehint");"undefined"!==typeof this._hintCloseCallback&&this._hintCloseCallback.call(this,a)}function W(a){if(a=this._targetElement.querySelector('.introjs-hint[data-step\x3d"'+a+'"]'))a.className=a.className.replace(/introjs\-hidehint/g,"")}function X(a){(a=this._targetElement.querySelector('.introjs-hint[data-step\x3d"'+a+'"]'))&&a.parentNode.removeChild(a)}function da(){var a=this;var b=document.querySelector(".introjs-hints");null==b&&(b=document.createElement("div"),
b.className="introjs-hints");for(var c=0,d=this._introItems.length;c<d;c++){var f=this._introItems[c];if(!document.querySelector('.introjs-hint[data-step\x3d"'+c+'"]')){var e=document.createElement("a");D(e);(function(b,c,d){b.onclick=function(b){b=b?b:window.event;b.stopPropagation&&b.stopPropagation();null!=b.cancelBubble&&(b.cancelBubble=!0);Y.call(a,d)}})(e,f,c);e.className="introjs-hint";f.hintAnimation||(e.className+=" introjs-hint-no-anim");J(f.element)&&(e.className+=" introjs-fixedhint");
var g=document.createElement("div");g.className="introjs-hint-dot";var m=document.createElement("div");m.className="introjs-hint-pulse";e.appendChild(g);e.appendChild(m);e.setAttribute("data-step",c);f.targetElement=f.element;f.element=e;V.call(this,f.hintPosition,e,f.targetElement);b.appendChild(e)}}document.body.appendChild(b);"undefined"!==typeof this._hintsAddedCallback&&this._hintsAddedCallback.call(this)}function V(a,b,c){c=u.call(this,c);switch(a){default:case "top-left":b.style.left=c.left+
"px";b.style.top=c.top+"px";break;case "top-right":b.style.left=c.left+c.width-20+"px";b.style.top=c.top+"px";break;case "bottom-left":b.style.left=c.left+"px";b.style.top=c.top+c.height-20+"px";break;case "bottom-right":b.style.left=c.left+c.width-20+"px";b.style.top=c.top+c.height-20+"px";break;case "middle-left":b.style.left=c.left+"px";b.style.top=c.top+(c.height-20)/2+"px";break;case "middle-right":b.style.left=c.left+c.width-20+"px";b.style.top=c.top+(c.height-20)/2+"px";break;case "middle-middle":b.style.left=
c.left+(c.width-20)/2+"px";b.style.top=c.top+(c.height-20)/2+"px";break;case "bottom-middle":b.style.left=c.left+(c.width-20)/2+"px";b.style.top=c.top+c.height-20+"px";break;case "top-middle":b.style.left=c.left+(c.width-20)/2+"px",b.style.top=c.top+"px"}}function Y(a){var b=document.querySelector('.introjs-hint[data-step\x3d"'+a+'"]'),c=this._introItems[a];"undefined"!==typeof this._hintClickCallback&&this._hintClickCallback.call(this,b,c,a);var d=w.call(this);if(parseInt(d,10)!=a){var d=document.createElement("div"),
f=document.createElement("div"),e=document.createElement("div"),g=document.createElement("div");d.className="introjs-tooltip";d.onclick=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0};f.className="introjs-tooltiptext";var m=document.createElement("p");m.innerHTML=c.hint;c=document.createElement("a");c.className="introjs-button";c.innerHTML=this._options.hintButtonLabel;c.onclick=M.bind(this,a);f.appendChild(m);f.appendChild(c);e.className="introjs-arrow";d.appendChild(e);d.appendChild(f);
this._currentStep=b.getAttribute("data-step");g.className="introjs-tooltipReferenceLayer introjs-hintReference";g.setAttribute("data-step",b.getAttribute("data-step"));v.call(this,g);g.appendChild(d);document.body.appendChild(g);F.call(this,b,d,e,null,!0)}}function u(a){var b={},c=document.body,d=document.documentElement,f=window.pageYOffset||d.scrollTop||c.scrollTop,c=window.pageXOffset||d.scrollLeft||c.scrollLeft;if(a instanceof SVGElement)a=a.getBoundingClientRect(),b.top=a.top+f,b.width=a.width,
b.height=a.height,b.left=a.left+c;else{b.width=a.offsetWidth;b.height=a.offsetHeight;for(c=f=0;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)f+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;b.top=c;b.left=f}return b}function S(){return parseInt(this._currentStep+1,10)/this._introItems.length*100}var N=function(a){if("object"===typeof a)return new n(a);if("string"===typeof a){if(a=document.querySelector(a))return new n(a);throw Error("There is no element with given selector.");}return new n(document.body)};
N.version="2.8.0-alpha.1";N.fn=n.prototype={clone:function(){return new n(this)},setOption:function(a,b){this._options[a]=b;return this},setOptions:function(a){var b=this._options,c={},d;for(d in b)c[d]=b[d];for(d in a)c[d]=a[d];this._options=c;return this},start:function(){Z.call(this,this._targetElement);return this},goToStep:function(a){this._currentStep=a-2;"undefined"!==typeof this._introItems&&x.call(this);return this},addStep:function(a){this._options.steps||(this._options.steps=[]);this._options.steps.push(a);
return this},addSteps:function(a){if(a.length){for(var b=0;b<a.length;b++)this.addStep(a[b]);return this}},goToStepNumber:function(a){this._currentStepNumber=a;"undefined"!==typeof this._introItems&&x.call(this);return this},nextStep:function(){x.call(this);return this},previousStep:function(){E.call(this);return this},exit:function(a){z.call(this,this._targetElement,a);return this},refresh:function(){v.call(this,document.querySelector(".introjs-helperLayer"));v.call(this,document.querySelector(".introjs-tooltipReferenceLayer"));
v.call(this,document.querySelector(".introjs-disableInteraction"));if(void 0!==this._currentStep&&null!==this._currentStep){var a=document.querySelector(".introjs-helperNumberLayer"),b=document.querySelector(".introjs-arrow"),c=document.querySelector(".introjs-tooltip");F.call(this,this._introItems[this._currentStep].element,c,b,a)}L.call(this);return this},onbeforechange:function(a){if("function"===typeof a)this._introBeforeChangeCallback=a;else throw Error("Provided callback for onbeforechange was not a function");
return this},onchange:function(a){if("function"===typeof a)this._introChangeCallback=a;else throw Error("Provided callback for onchange was not a function.");return this},onafterchange:function(a){if("function"===typeof a)this._introAfterChangeCallback=a;else throw Error("Provided callback for onafterchange was not a function");return this},oncomplete:function(a){if("function"===typeof a)this._introCompleteCallback=a;else throw Error("Provided callback for oncomplete was not a function.");return this},
onhintsadded:function(a){if("function"===typeof a)this._hintsAddedCallback=a;else throw Error("Provided callback for onhintsadded was not a function.");return this},onhintclick:function(a){if("function"===typeof a)this._hintClickCallback=a;else throw Error("Provided callback for onhintclick was not a function.");return this},onhintclose:function(a){if("function"===typeof a)this._hintCloseCallback=a;else throw Error("Provided callback for onhintclose was not a function.");return this},onexit:function(a){if("function"===
typeof a)this._introExitCallback=a;else throw Error("Provided callback for onexit was not a function.");return this},onbeforeexit:function(a){if("function"===typeof a)this._introBeforeExitCallback=a;else throw Error("Provided callback for onbeforeexit was not a function.");return this},addHints:function(){U.call(this,this._targetElement);return this},hideHint:function(a){M.call(this,a);return this},hideHints:function(){var a=this._targetElement.querySelectorAll(".introjs-hint");if(a&&0<a.length)for(var b=
0;b<a.length;b++)M.call(this,a[b].getAttribute("data-step"));return this},showHint:function(a){W.call(this,a);return this},showHints:function(){var a=this._targetElement.querySelectorAll(".introjs-hint");if(a&&0<a.length)for(var b=0;b<a.length;b++)W.call(this,a[b].getAttribute("data-step"));else U.call(this,this._targetElement);return this},removeHints:function(){var a=this._targetElement.querySelectorAll(".introjs-hint");if(a&&0<a.length)for(var b=0;b<a.length;b++)X.call(this,a[b].getAttribute("data-step"));
return this},removeHint:function(a){X.call(this,a);return this},showHintDialog:function(a){Y.call(this,a);return this}};return C.introJs=N});