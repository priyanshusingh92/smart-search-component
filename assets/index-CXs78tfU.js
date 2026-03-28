(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,X=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),se=new WeakMap;let $e=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(X&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=se.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&se.set(t,e))}return e}toString(){return this.cssText}};const ke=s=>new $e(typeof s=="string"?s:s+"",void 0,Y),me=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new $e(t,s,Y)},Pe=(s,e)=>{if(X)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=z.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},ie=X?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ke(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Re,defineProperty:Oe,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Te,getOwnPropertySymbols:Le,getPrototypeOf:Ue}=Object,b=globalThis,re=b.trustedTypes,De=re?re.emptyScript:"",V=b.reactiveElementPolyfillSupport,R=(s,e)=>s,B={toAttribute(s,e){switch(e){case Boolean:s=s?De:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},ee=(s,e)=>!Re(s,e),oe={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Oe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=Me(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const l=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const e=Ue(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const t=this.properties,i=[...Te(t),...Le(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(ie(r))}else e!==void 0&&t.push(ie(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:B).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const l=i.getPropertyOptions(r),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:B;this._$Em=r;const h=a.fromAttribute(t,l.type);this[r]=h??((n=this._$Ej)==null?void 0:n.get(r))??h,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){var n;if(e!==void 0){const l=this.constructor;if(r===!1&&(o=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??ee)(o,t)||i.useDefault&&i.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:l}=n,a=this[o];l!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[R("elementProperties")]=new Map,S[R("finalized")]=new Map,V==null||V({ReactiveElement:S}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,ne=s=>s,j=O.trustedTypes,le=j?j.createPolicy("lit-html",{createHTML:s=>s}):void 0,be="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,ye="?"+m,Ne=`<${ye}>`,E=document,T=()=>E.createComment(""),L=s=>s===null||typeof s!="object"&&typeof s!="function",te=Array.isArray,He=s=>te(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",W=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,ce=/>/g,w=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),he=/'/g,de=/"/g,we=/^(?:script|style|textarea|title)$/i,Ie=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),f=Ie(1),y=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ue=new WeakMap,x=E.createTreeWalker(E,129);function xe(s,e){if(!te(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(e):e}const ze=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=k;for(let l=0;l<t;l++){const a=s[l];let h,u,c=-1,v=0;for(;v<a.length&&(n.lastIndex=v,u=n.exec(a),u!==null);)v=n.lastIndex,n===k?u[1]==="!--"?n=ae:u[1]!==void 0?n=ce:u[2]!==void 0?(we.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=w):u[3]!==void 0&&(n=w):n===w?u[0]===">"?(n=r??k,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,h=u[1],n=u[3]===void 0?w:u[3]==='"'?de:he):n===de||n===he?n=w:n===ae||n===ce?n=k:(n=w,r=void 0);const $=n===w&&s[l+1].startsWith("/>")?" ":"";o+=n===k?a+Ne:c>=0?(i.push(h),a.slice(0,c)+be+a.slice(c)+m+$):a+m+(c===-2?l:$)}return[xe(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class U{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[h,u]=ze(e,t);if(this.el=U.createElement(h,i),x.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=x.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(be)){const v=u[n++],$=r.getAttribute(c).split(m),I=/([.?@])?(.*)/.exec(v);a.push({type:1,index:o,name:I[2],strings:$,ctor:I[1]==="."?je:I[1]==="?"?qe:I[1]==="@"?Fe:q}),r.removeAttribute(c)}else c.startsWith(m)&&(a.push({type:6,index:o}),r.removeAttribute(c));if(we.test(r.tagName)){const c=r.textContent.split(m),v=c.length-1;if(v>0){r.textContent=j?j.emptyScript:"";for(let $=0;$<v;$++)r.append(c[$],T()),x.nextNode(),a.push({type:2,index:++o});r.append(c[v],T())}}}else if(r.nodeType===8)if(r.data===ye)a.push({type:2,index:o});else{let c=-1;for(;(c=r.data.indexOf(m,c+1))!==-1;)a.push({type:7,index:o}),c+=m.length-1}o++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function C(s,e,t=s,i){var n,l;if(e===y)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=L(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=C(s,r._$AS(s,e.values),r,i)),e}class Be{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??E).importNode(t,!0);x.currentNode=r;let o=x.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new D(o,o.nextSibling,this,e):a.type===1?h=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(h=new Ve(o,this,e)),this._$AV.push(h),a=i[++l]}n!==(a==null?void 0:a.index)&&(o=x.nextNode(),n++)}return x.currentNode=E,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class D{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),L(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):He(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=U.createElement(xe(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new Be(r,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=ue.get(e.strings);return t===void 0&&ue.set(e.strings,t=new U(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new D(this.O(T()),this.O(T()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=ne(e).nextSibling;ne(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=C(this,e,t,0),n=!L(e)||e!==this._$AH&&e!==y,n&&(this._$AH=e);else{const l=e;let a,h;for(e=o[0],a=0;a<o.length-1;a++)h=C(this,l[i+a],t,a),h===y&&(h=this._$AH[a]),n||(n=!L(h)||h!==this._$AH[a]),h===d?e=d:e!==d&&(e+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!r&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class je extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class qe extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class Fe extends q{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??d)===y)return;const i=this._$AH,r=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==d&&(i===d||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ve{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const J=O.litHtmlPolyfillSupport;J==null||J(U,D),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.2");const We=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new D(e.insertBefore(T(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;let M=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=We(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return y}};var ve;M._$litElement$=!0,M.finalized=!0,(ve=A.litElementHydrateSupport)==null||ve.call(A,{LitElement:M});const K=A.litElementPolyfillSupport;K==null||K({LitElement:M});(A.litElementVersions??(A.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Je=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:ee},Ze=(s=Ke,e,t)=>{const{kind:i,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,s,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(i==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,s,!0,l)}}throw Error("Unsupported decorator location: "+i)};function F(s){return(e,t)=>typeof t=="object"?Ze(s,e,t):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(s){return F({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ae(s,e){return(t,i,r)=>{const o=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(s))??null};return Ge(t,i,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee={ATTRIBUTE:1,CHILD:2},Se=s=>(...e)=>({_$litDirective$:s,values:e});class Ce{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=Se(class extends Ce{constructor(s){var e;if(super(s),s.type!==Ee.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var i,r;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const t=s.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const n=!!e[o];n===this.st.has(o)||(r=this.nt)!=null&&r.has(o)||(n?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return y}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Q extends Ce{constructor(e){if(super(e),this.it=d,e.type!==Ee.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===d||e==null)return this._t=void 0,this.it=e;if(e===y)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Q.directiveName="unsafeHTML",Q.resultType=1;const pe=Se(Q);function G(s,e){let t;return function(...r){const o=()=>{clearTimeout(t),s(...r)};clearTimeout(t),t=setTimeout(o,e)}}function fe(s,e,t=!1){if(!e)return s;const i=t?"g":"gi",r=new RegExp(`(${Qe(e)})`,i);return s.replace(r,"<mark>$1</mark>")}function Qe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Xe(s,e,t,i=!1){let r=s;if(e){const n=i?e:e.toLowerCase();r=r.filter(l=>{const a=i?l.title:l.title.toLowerCase(),h=l.subtitle?i?l.subtitle:l.subtitle.toLowerCase():"";return a.includes(n)||h.includes(n)})}const o=t.filter(n=>n.checked).map(n=>n.value);return o.length>0&&(r=r.filter(n=>o.includes(n.type))),r}const Ye=me`
  * {
    box-sizing: border-box;
  }

  :host {
    --primary-color: var(--search-primary-color, #0066cc);
    --background-color: var(--search-background-color, #ffffff);
    --text-color: var(--search-text-color, #333333);
    --border-color: var(--search-border-color, #dddddd);
    --hover-color: var(--search-hover-color, #f5f5f5);
    --selected-color: var(--search-selected-color, #e6f2ff);
    --focus-color: var(--search-focus-color, #0066cc);
    --font-size: var(--search-font-size, 14px);
    --border-radius: var(--search-border-radius, 4px);
    
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-size: var(--font-size);
    color: var(--text-color);
    position: relative;
  }
`;var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,g=(s,e,t,i)=>{for(var r=i>1?void 0:i?tt(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&et(e,t,r),r};let p=class extends M{constructor(){super(...arguments),this.results=[],this.filters=[],this.config={placeholder:"Search accounts, transactions, customers...",minChars:2,debounceMs:300,maxResults:50,enableFilters:!0,highlightMatches:!0,caseSensitive:!1},this._query="",this._isOpen=!1,this._highlightedIndex=-1,this._filteredResults=[],this._isLoading=!1,this._debouncedSearch=G(s=>{this._performSearch(s)},this.config.debounceMs||300),this._handleClickOutside=s=>{var e;(e=this.shadowRoot)!=null&&e.contains(s.target)||this._closeDropdown()},this._handleResize=G(()=>{this._isOpen&&this._adjustDropdownPosition()},100),this._handleScroll=G(()=>{this._isOpen&&this._adjustDropdownPosition()},50)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._handleClickOutside),window.addEventListener("resize",this._handleResize),window.addEventListener("scroll",this._handleScroll,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleClickOutside),window.removeEventListener("resize",this._handleResize),window.removeEventListener("scroll",this._handleScroll,!0)}updated(s){super.updated(s),s.has("results")&&this._updateFilteredResults(),s.has("_isOpen")&&this._isOpen&&this._adjustDropdownPosition()}_adjustDropdownPosition(){if(!this._dropdown)return;const s=this.getBoundingClientRect(),e=window.innerHeight-s.bottom,t=this._dropdown.offsetHeight;window.innerWidth<=768||(e<t&&s.top>t?(this._dropdown.style.top="auto",this._dropdown.style.bottom="calc(100% + 4px)"):(this._dropdown.style.top="calc(100% + 4px)",this._dropdown.style.bottom="auto"))}_handleInput(s){const e=s.target;this._query=e.value,this._query.length>=(this.config.minChars||2)?(this._isLoading=!0,this._openDropdown(),this._debouncedSearch(this._query)):this._query.length===0&&(this._filteredResults=[],this._closeDropdown()),this._dispatchSearchEvent()}_performSearch(s){this._updateFilteredResults(),this._isLoading=!1,this._highlightedIndex=-1}_updateFilteredResults(){this.filters.filter(s=>s.checked),this._filteredResults=Xe(this.results,this._query,this.filters,this.config.caseSensitive),this.config.maxResults&&(this._filteredResults=this._filteredResults.slice(0,this.config.maxResults))}_handleClear(){this._query="",this._filteredResults=[],this._closeDropdown(),this._searchInput.focus(),this._dispatchSearchEvent()}_handleKeyDown(s){switch(s.key){case"ArrowDown":s.preventDefault(),this._highlightNext();break;case"ArrowUp":s.preventDefault(),this._highlightPrevious();break;case"Enter":s.preventDefault(),this._highlightedIndex>=0&&this._selectResult(this._filteredResults[this._highlightedIndex]);break;case"Escape":s.preventDefault(),this._closeDropdown();break}}_highlightNext(){if(!this._isOpen){this._openDropdown();return}this._highlightedIndex<this._filteredResults.length-1&&(this._highlightedIndex++,this._scrollToHighlighted())}_highlightPrevious(){this._highlightedIndex>0&&(this._highlightedIndex--,this._scrollToHighlighted())}_scrollToHighlighted(){requestAnimationFrame(()=>{var e;const s=(e=this.shadowRoot)==null?void 0:e.querySelector(".result-item.highlighted");s&&s.scrollIntoView({block:"nearest",behavior:"smooth"})})}_handleFilterChange(s,e){const t=e.target.checked;this.filters=this.filters.map(i=>i.id===s.id?{...i,checked:t}:i),this._updateFilteredResults(),this._dispatchFilterChangeEvent(),this._dispatchSearchEvent()}_selectResult(s){this.dispatchEvent(new CustomEvent("select",{detail:{result:s},bubbles:!0,composed:!0})),this._closeDropdown()}_openDropdown(){this._isOpen=!0,this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}_closeDropdown(){this._isOpen=!1,this._highlightedIndex=-1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_dispatchSearchEvent(){this.dispatchEvent(new CustomEvent("search",{detail:{query:this._query,filters:this.filters.filter(s=>s.checked)},bubbles:!0,composed:!0}))}_dispatchFilterChangeEvent(){this.dispatchEvent(new CustomEvent("filter-change",{detail:{filters:this.filters.filter(s=>s.checked)},bubbles:!0,composed:!0}))}_renderFilters(){return!this.config.enableFilters||this.filters.length===0?null:f`
      <div class="filters-section" role="group" aria-label="Filter options">
        ${this.filters.map(s=>f`
          <label class="filter-chip ${Z({active:s.checked||!1})}">
            <input
              type="checkbox"
              .checked=${s.checked||!1}
              @change=${e=>this._handleFilterChange(s,e)}
              aria-label="Filter by ${s.label}"
            />
            <span>${s.label}</span>
          </label>
        `)}
      </div>
    `}_renderResult(s,e){const t=e===this._highlightedIndex,i=this.config.highlightMatches?fe(s.title,this._query,this.config.caseSensitive):s.title,r=s.subtitle&&this.config.highlightMatches?fe(s.subtitle,this._query,this.config.caseSensitive):s.subtitle;return f`
      <div
        class="result-item ${Z({highlighted:t})}"
        role="option"
        aria-selected=${t}
        tabindex="0"
        @click=${()=>this._selectResult(s)}
        @keydown=${o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),this._selectResult(s))}}
      >
        ${s.icon?f`<div class="result-icon">${s.icon}</div>`:null}
        <div class="result-content">
          <div class="result-title">${pe(i)}</div>
          ${r?f`<div class="result-subtitle">${pe(r)}</div>`:null}
          ${s.description?f`<div class="result-description">${s.description}</div>`:null}
          <span class="result-type-badge type-${s.type}">${s.type}</span>
        </div>
      </div>
    `}_renderResults(){return this._isLoading?f`<div class="loading" role="status" aria-live="polite">Loading...</div>`:this._filteredResults.length===0?f`
        <div class="no-results" role="status" aria-live="polite">
          No results found for "${this._query}"
        </div>
      `:f`
      <div
        class="results-section"
        role="listbox"
        aria-label="Search results"
      >
        ${this._filteredResults.map((s,e)=>this._renderResult(s,e))}
      </div>
    `}render(){return f`
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            class="search-input"
            .value=${this._query}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            placeholder=${this.config.placeholder||"Search..."}
            aria-label="Search"
            aria-expanded=${this._isOpen}
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant=${this._highlightedIndex>=0?`result-${this._highlightedIndex}`:""}
            role="combobox"
          />
          ${this._query?f`
                <button
                  class="clear-button"
                  @click=${this._handleClear}
                  aria-label="Clear search"
                  type="button"
                >
                  ✕
                </button>
              `:null}
        </div>

        <div
          id="search-results"
          class="dropdown ${Z({hidden:!this._isOpen})}"
          role="region"
          aria-label="Search results dropdown"
        >
          ${this._renderFilters()}
          ${this._renderResults()}
        </div>

        <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
          ${this._filteredResults.length} results found
        </div>
      </div>
    `}};p.styles=[Ye,me`
      .search-container {
        position: relative;
        width: 100%;
      }

      .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--background-color);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        transition: border-color 0.2s;
      }

      .search-input-wrapper:focus-within {
        border-color: var(--focus-color);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }

      .search-icon {
        padding: 0 12px;
        color: #999;
        pointer-events: none;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        padding: 12px 12px 12px 0;
        font-size: var(--font-size);
        background: transparent;
        color: var(--text-color);
      }

      .clear-button {
        padding: 8px 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        font-size: 18px;
        line-height: 1;
        transition: color 0.2s;
      }

      .clear-button:hover {
        color: var(--text-color);
      }

      .clear-button:focus {
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
        border-radius: 2px;
      }

      .dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-height: 400px;
        overflow: hidden;
        z-index: 1000;
        display: flex;
        flex-direction: column;
      }

      .dropdown.hidden {
        display: none;
      }

      .filters-section {
        padding: 12px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: var(--hover-color);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;
        user-select: none;
      }

      .filter-chip:hover {
        background: var(--selected-color);
      }

      .filter-chip.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .filter-chip input[type="checkbox"] {
        margin: 0;
        cursor: pointer;
      }

      .results-section {
        overflow-y: auto;
        max-height: 320px;
      }

      .result-item {
        padding: 12px;
        cursor: pointer;
        border-bottom: 1px solid var(--hover-color);
        transition: background-color 0.2s;
        display: flex;
        align-items: start;
        gap: 12px;
      }

      .result-item:last-child {
        border-bottom: none;
      }

      .result-item:hover,
      .result-item.highlighted {
        background: var(--hover-color);
      }

      .result-item.selected {
        background: var(--selected-color);
      }

      .result-item:focus {
        outline: 2px solid var(--focus-color);
        outline-offset: -2px;
      }

      .result-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .result-content {
        flex: 1;
        min-width: 0;
      }

      .result-title {
        font-weight: 600;
        margin: 0 0 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-subtitle {
        font-size: 12px;
        color: #666;
        margin: 0 0 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-description {
        font-size: 13px;
        color: #888;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .result-type-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .type-account {
        background: #e3f2fd;
        color: #1976d2;
      }

      .type-transaction {
        background: #f3e5f5;
        color: #7b1fa2;
      }

      .type-customer {
        background: #e8f5e9;
        color: #388e3c;
      }

      .type-other {
        background: #fff3e0;
        color: #f57c00;
      }

      .no-results {
        padding: 24px;
        text-align: center;
        color: #999;
      }

      .loading {
        padding: 24px;
        text-align: center;
        color: #999;
      }

      mark {
        background: #ffeb3b;
        padding: 0 2px;
        border-radius: 2px;
      }

      @media (max-width: 768px) {
        .dropdown {
          position: fixed;
          top: auto;
          bottom: 0;
          left: 0;
          right: 0;
          max-height: 70vh;
          border-radius: var(--border-radius) var(--border-radius) 0 0;
        }

        .filter-chip {
          font-size: 12px;
          padding: 8px 12px;
        }
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `];g([F({type:Array})],p.prototype,"results",2);g([F({type:Array})],p.prototype,"filters",2);g([F({type:Object})],p.prototype,"config",2);g([N()],p.prototype,"_query",2);g([N()],p.prototype,"_isOpen",2);g([N()],p.prototype,"_highlightedIndex",2);g([N()],p.prototype,"_filteredResults",2);g([N()],p.prototype,"_isLoading",2);g([Ae(".search-input")],p.prototype,"_searchInput",2);g([Ae(".dropdown")],p.prototype,"_dropdown",2);p=g([Je("smart-search")],p);const st=[{id:"acc1",type:"account",title:"Premium Checking Account",subtitle:"**** 1234",description:"Balance: $5,234.56",icon:"💳"},{id:"acc2",type:"account",title:"Savings Account",subtitle:"**** 5678",description:"Balance: $12,450.00",icon:"💰"},{id:"acc3",type:"account",title:"Business Checking",subtitle:"**** 9012",description:"Balance: $45,678.90",icon:"🏢"},{id:"acc4",type:"account",title:"Money Market Account",subtitle:"**** 3456",description:"Balance: $25,000.00",icon:"📈"},{id:"trx1",type:"transaction",title:"Coffee Shop Purchase",subtitle:"Nov 15, 2024",description:"-$4.50 • Starbucks",icon:"☕"},{id:"trx2",type:"transaction",title:"Salary Deposit",subtitle:"Nov 14, 2024",description:"+$5,000.00 • Direct Deposit",icon:"💵"},{id:"trx3",type:"transaction",title:"Electric Bill Payment",subtitle:"Nov 13, 2024",description:"-$125.00 • Auto-pay",icon:"⚡"},{id:"trx4",type:"transaction",title:"Online Shopping",subtitle:"Nov 12, 2024",description:"-$89.99 • Amazon",icon:"🛒"},{id:"trx5",type:"transaction",title:"Restaurant",subtitle:"Nov 11, 2024",description:"-$67.50 • Italian Bistro",icon:"🍝"},{id:"cust1",type:"customer",title:"John Smith",subtitle:"Premium Member",description:"Account since 2018 • 3 accounts",icon:"👤"},{id:"cust2",type:"customer",title:"Sarah Johnson",subtitle:"Business Member",description:"Account since 2020 • 5 accounts",icon:"👤"},{id:"cust3",type:"customer",title:"Michael Brown",subtitle:"Standard Member",description:"Account since 2021 • 2 accounts",icon:"👤"},{id:"cust4",type:"customer",title:"Emily Davis",subtitle:"Premium Member",description:"Account since 2019 • 4 accounts",icon:"👤"},{id:"other1",type:"other",title:"Mortgage Calculator",subtitle:"Tools",description:"Calculate your monthly payments",icon:"🏠"},{id:"other2",type:"other",title:"Investment Portfolio",subtitle:"Services",description:"View your investment performance",icon:"📊"},{id:"other3",type:"other",title:"Credit Card Application",subtitle:"Products",description:"Apply for a new credit card",icon:"💳"},{id:"other4",type:"other",title:"Branch Locator",subtitle:"Support",description:"Find branches near you",icon:"📍"}],it=[{id:"account",label:"Accounts",value:"account",checked:!1},{id:"transaction",label:"Transactions",value:"transaction",checked:!1},{id:"customer",label:"Customers",value:"customer",checked:!1},{id:"other",label:"Other",value:"other",checked:!1}],_=document.getElementById("search");_.results=st;_.filters=it;_.config={placeholder:"Search accounts, transactions, customers...",minChars:2,debounceMs:300,maxResults:50,enableFilters:!0,highlightMatches:!0,caseSensitive:!1};let ge=0,_e=0;const P=document.getElementById("events");function H(s,e){const t=document.createElement("div");t.className="event-item";const i=new Date().toLocaleTimeString();for(t.innerHTML=`
        <div class="event-type">${s}</div>
        <div class="event-time">${i}</div>
        <div>${JSON.stringify(e,null,2)}</div>
      `,P.insertBefore(t,P.firstChild);P.children.length>10;)P.removeChild(P.lastChild)}_.addEventListener("search",s=>{ge++,document.getElementById("searchCount").textContent=ge,H("search",{query:s.detail.query,filters:s.detail.filters.length})});_.addEventListener("select",s=>{_e++,document.getElementById("selectCount").textContent=_e,H("select",{id:s.detail.result.id,title:s.detail.result.title,type:s.detail.result.type})});_.addEventListener("filter-change",s=>{H("filter-change",{activeFilters:s.detail.filters.length})});_.addEventListener("open",()=>{H("open",{})});_.addEventListener("close",()=>{H("close",{})});window.setTheme=function(s,e){document.querySelectorAll(".theme-btn").forEach(i=>i.classList.remove("active")),e.classList.add("active"),s==="dark"?_.classList.add("dark"):_.classList.remove("dark")};
