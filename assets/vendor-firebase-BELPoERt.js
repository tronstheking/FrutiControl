import{o as xc,_ as Fi}from"./vendor-libs-BZnMHjDR.js";var po={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Uc=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],l=n[t++],u=n[t++],h=((s&7)<<18|(o&63)<<12|(l&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],l=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|l&63)}}return e.join("")},ga={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],l=s+1<n.length,u=l?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,E=o>>2,A=(o&3)<<4|u>>4;let P=(u&15)<<2|f>>6,b=f&63;h||(b=64,l||(P=64)),r.push(t[E],t[A],t[P],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(pa(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Uc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const A=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||u==null||f==null||A==null)throw new Fc;const P=o<<2|u>>4;if(r.push(P),f!==64){const b=u<<4&240|f>>2;if(r.push(b),A!==64){const k=f<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Fc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Bc=function(n){const e=pa(n);return ga.encodeByteArray(e,!0)},gr=function(n){return Bc(n).replace(/\./g,"")},ma=function(n){try{return ga.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=()=>jc().__FIREBASE_DEFAULTS__,Hc=()=>{if(typeof process>"u"||typeof po>"u")return;const n=po.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},qc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ma(n[1]);return e&&JSON.parse(e)},Nr=()=>{try{return $c()||Hc()||qc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},_a=n=>{var e,t;return(t=(e=Nr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},zc=n=>{const e=_a(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ya=()=>{var n;return(n=Nr())===null||n===void 0?void 0:n.config},va=n=>{var e;return(e=Nr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[gr(JSON.stringify(t)),gr(JSON.stringify(l)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Wc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function Qc(){var n;const e=(n=Nr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Xc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Jc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Yc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Zc(){const n=me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function eu(){return!Qc()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function tu(){try{return typeof indexedDB=="object"}catch{return!1}}function nu(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru="FirebaseError";class He extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ru,Object.setPrototypeOf(this,He.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cn.prototype.create)}}class Cn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],l=o?iu(o,r):"Error",u=`${this.serviceName}: ${l} (${s}).`;return new He(s,u,r)}}function iu(n,e){return n.replace(su,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const su=/\{\$([^}]+)}/g;function ou(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function mr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],l=e[s];if(go(o)&&go(l)){if(!mr(o,l))return!1}else if(o!==l)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function go(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function cn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,o]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function un(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function au(n,e){const t=new lu(n,e);return t.subscribe.bind(t)}class lu{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");cu(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=mi),s.error===void 0&&(s.error=mi),s.complete===void 0&&(s.complete=mi);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function cu(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function mi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(n){return n&&n._delegate?n._delegate:n}class pt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Gc;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(du(e))try{this.getOrInitializeService({instanceIdentifier:ut})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=ut){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ut){return this.instances.has(e)}getOptions(e=ut){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,l]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&l.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const l=this.instances.get(s);return l&&e(l,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:hu(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ut){return this.component?this.component.multipleInstances?e:ut:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function hu(n){return n===ut?void 0:n}function du(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new uu(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(x||(x={}));const pu={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},gu=x.INFO,mu={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},_u=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=mu[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bi{constructor(e){this.name=e,this._logLevel=gu,this._logHandler=_u,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?pu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(vu(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function vu(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const wi="@firebase/app",mo="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je=new Bi("@firebase/app"),Eu="@firebase/app-compat",Iu="@firebase/analytics-compat",Tu="@firebase/analytics",wu="@firebase/app-check-compat",Au="@firebase/app-check",Ru="@firebase/auth",Pu="@firebase/auth-compat",Su="@firebase/database",Cu="@firebase/data-connect",bu="@firebase/database-compat",ku="@firebase/functions",Ou="@firebase/functions-compat",Du="@firebase/installations",Nu="@firebase/installations-compat",Vu="@firebase/messaging",Mu="@firebase/messaging-compat",Lu="@firebase/performance",xu="@firebase/performance-compat",Uu="@firebase/remote-config",Fu="@firebase/remote-config-compat",Bu="@firebase/storage",ju="@firebase/storage-compat",$u="@firebase/firestore",Hu="@firebase/vertexai-preview",qu="@firebase/firestore-compat",zu="firebase",Gu="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai="[DEFAULT]",Ku={[wi]:"fire-core",[Eu]:"fire-core-compat",[Tu]:"fire-analytics",[Iu]:"fire-analytics-compat",[Au]:"fire-app-check",[wu]:"fire-app-check-compat",[Ru]:"fire-auth",[Pu]:"fire-auth-compat",[Su]:"fire-rtdb",[Cu]:"fire-data-connect",[bu]:"fire-rtdb-compat",[ku]:"fire-fn",[Ou]:"fire-fn-compat",[Du]:"fire-iid",[Nu]:"fire-iid-compat",[Vu]:"fire-fcm",[Mu]:"fire-fcm-compat",[Lu]:"fire-perf",[xu]:"fire-perf-compat",[Uu]:"fire-rc",[Fu]:"fire-rc-compat",[Bu]:"fire-gcs",[ju]:"fire-gcs-compat",[$u]:"fire-fst",[qu]:"fire-fst-compat",[Hu]:"fire-vertex","fire-js":"fire-js",[zu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new Map,Wu=new Map,Ri=new Map;function _o(n,e){try{n.container.addComponent(e)}catch(t){je.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ot(n){const e=n.name;if(Ri.has(e))return je.debug(`There were multiple attempts to register component ${e}.`),!1;Ri.set(e,n);for(const t of _n.values())_o(t,n);for(const t of Wu.values())_o(t,n);return!0}function ji(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Me(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ze=new Cn("app","Firebase",Qu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ze.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=Gu;function Ju(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ai,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Ze.create("bad-app-name",{appName:String(s)});if(t||(t=ya()),!t)throw Ze.create("no-options");const o=_n.get(s);if(o){if(mr(t,o.options)&&mr(r,o.config))return o;throw Ze.create("duplicate-app",{appName:s})}const l=new fu(s);for(const h of Ri.values())l.addComponent(h);const u=new Xu(t,r,l);return _n.set(s,u),u}function Ea(n=Ai){const e=_n.get(n);if(!e&&n===Ai&&ya())return Ju();if(!e)throw Ze.create("no-app",{appName:n});return e}function zg(){return Array.from(_n.values())}function et(n,e,t){var r;let s=(r=Ku[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),l=e.match(/\s|\//);if(o||l){const u=[`Unable to register library "${s}" with version "${e}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&l&&u.push("and"),l&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),je.warn(u.join(" "));return}Ot(new pt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu="firebase-heartbeat-database",Zu=1,yn="firebase-heartbeat-store";let _i=null;function Ia(){return _i||(_i=xc(Yu,Zu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(yn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ze.create("idb-open",{originalErrorMessage:n.message})})),_i}async function eh(n){try{const t=(await Ia()).transaction(yn),r=await t.objectStore(yn).get(Ta(n));return await t.done,r}catch(e){if(e instanceof He)je.warn(e.message);else{const t=Ze.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});je.warn(t.message)}}}async function yo(n,e){try{const r=(await Ia()).transaction(yn,"readwrite");await r.objectStore(yn).put(e,Ta(n)),await r.done}catch(t){if(t instanceof He)je.warn(t.message);else{const r=Ze.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});je.warn(r.message)}}}function Ta(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th=1024,nh=30*24*60*60*1e3;class rh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new sh(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=vo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(l=>l.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(l=>{const u=new Date(l.date).valueOf();return Date.now()-u<=nh}),this._storage.overwrite(this._heartbeatsCache))}catch(r){je.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=vo(),{heartbeatsToSend:r,unsentEntries:s}=ih(this._heartbeatsCache.heartbeats),o=gr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return je.warn(t),""}}}function vo(){return new Date().toISOString().substring(0,10)}function ih(n,e=th){const t=[];let r=n.slice();for(const s of n){const o=t.find(l=>l.agent===s.agent);if(o){if(o.dates.push(s.date),Eo(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Eo(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class sh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return tu()?nu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await eh(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return yo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return yo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Eo(n){return gr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(n){Ot(new pt("platform-logger",e=>new yu(e),"PRIVATE")),Ot(new pt("heartbeat",e=>new rh(e),"PRIVATE")),et(wi,mo,n),et(wi,mo,"esm2017"),et("fire-js","")}oh("");var ah="firebase",lh="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */et(ah,lh,"app");function wa(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ch=wa,Aa=new Cn("auth","Firebase",wa());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r=new Bi("@firebase/auth");function uh(n,...e){_r.logLevel<=x.WARN&&_r.warn(`Auth (${Ut}): ${n}`,...e)}function lr(n,...e){_r.logLevel<=x.ERROR&&_r.error(`Auth (${Ut}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(n,...e){throw $i(n,...e)}function Ce(n,...e){return $i(n,...e)}function Ra(n,e,t){const r=Object.assign(Object.assign({},ch()),{[e]:t});return new Cn("auth","Firebase",r).create(e,{appName:n.name})}function tt(n){return Ra(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $i(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Aa.create(n,...e)}function N(n,e,...t){if(!n)throw $i(e,...t)}function Le(n){const e="INTERNAL ASSERTION FAILED: "+n;throw lr(e),new Error(e)}function $e(n,e){n||Le(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function hh(){return Io()==="http:"||Io()==="https:"}function Io(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hh()||Jc()||"connection"in navigator)?navigator.onLine:!0}function fh(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t){this.shortDelay=e,this.longDelay=t,$e(t>e,"Short delay should be less than long delay!"),this.isMobile=Wc()||Yc()}get(){return dh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(n,e){$e(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Le("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Le("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Le("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=new kn(3e4,6e4);function vt(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function st(n,e,t,r,s={}){return Sa(n,s,async()=>{let o={},l={};r&&(e==="GET"?l=r:o={body:JSON.stringify(r)});const u=bn(Object.assign({key:n.config.apiKey},l)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return Xc()||(f.referrerPolicy="no-referrer"),Pa.fetch()(Ca(n,n.config.apiHost,t,u),f)})}async function Sa(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},ph),e);try{const s=new _h(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const l=await o.json();if("needConfirmation"in l)throw nr(n,"account-exists-with-different-credential",l);if(o.ok&&!("errorMessage"in l))return l;{const u=o.ok?l.errorMessage:l.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw nr(n,"credential-already-in-use",l);if(h==="EMAIL_EXISTS")throw nr(n,"email-already-in-use",l);if(h==="USER_DISABLED")throw nr(n,"user-disabled",l);const E=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Ra(n,E,f);Pe(n,E)}}catch(s){if(s instanceof He)throw s;Pe(n,"network-request-failed",{message:String(s)})}}async function Vr(n,e,t,r,s={}){const o=await st(n,e,t,r,s);return"mfaPendingCredential"in o&&Pe(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Ca(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Hi(n.config,s):`${n.config.apiScheme}://${s}`}function mh(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class _h{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ce(this.auth,"network-request-failed")),gh.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function nr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ce(n,e,r);return s.customData._tokenResponse=t,s}function To(n){return n!==void 0&&n.enterprise!==void 0}class yh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return mh(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function vh(n,e){return st(n,"GET","/v2/recaptchaConfig",vt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eh(n,e){return st(n,"POST","/v1/accounts:delete",e)}async function ba(n,e){return st(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ih(n,e=!1){const t=Ie(n),r=await t.getIdToken(e),s=qi(r);N(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,l=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:dn(yi(s.auth_time)),issuedAtTime:dn(yi(s.iat)),expirationTime:dn(yi(s.exp)),signInProvider:l||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function yi(n){return Number(n)*1e3}function qi(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return lr("JWT malformed, contained fewer than 3 sections"),null;try{const s=ma(t);return s?JSON.parse(s):(lr("Failed to decode base64 JWT payload"),null)}catch(s){return lr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function wo(n){const e=qi(n);return N(e,"internal-error"),N(typeof e.exp<"u","internal-error"),N(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof He&&Th(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Th({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=dn(this.lastLoginAt),this.creationTime=dn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yr(n){var e;const t=n.auth,r=await n.getIdToken(),s=await vn(n,ba(t,{idToken:r}));N(s==null?void 0:s.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const l=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?ka(o.providerUserInfo):[],u=Rh(n.providerData,l),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),E=h?f:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new Si(o.createdAt,o.lastLoginAt),isAnonymous:E};Object.assign(n,A)}async function Ah(n){const e=Ie(n);await yr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Rh(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ka(n){return n.map(e=>{var{providerId:t}=e,r=Fi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ph(n,e){const t=await Sa(n,{},async()=>{const r=bn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,l=Ca(n,s,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Pa.fetch()(l,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Sh(n,e){return st(n,"POST","/v2/accounts:revokeToken",vt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){N(e.idToken,"internal-error"),N(typeof e.idToken<"u","internal-error"),N(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){N(e.length!==0,"internal-error");const t=wo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(N(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await Ph(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,l=new St;return r&&(N(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),s&&(N(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),o&&(N(typeof o=="number","internal-error",{appName:e}),l.expirationTime=o),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new St,this.toJSON())}_performRefresh(){return Le("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n,e){N(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class xe{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=Fi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new wh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Si(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await vn(this,this.stsTokenManager.getToken(this.auth,e));return N(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ih(this,e)}reload(){return Ah(this)}_assign(e){this!==e&&(N(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new xe(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){N(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await yr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Me(this.auth.app))return Promise.reject(tt(this.auth));const e=await this.getIdToken();return await vn(this,Eh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,l,u,h,f,E;const A=(r=t.displayName)!==null&&r!==void 0?r:void 0,P=(s=t.email)!==null&&s!==void 0?s:void 0,b=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(l=t.photoURL)!==null&&l!==void 0?l:void 0,M=(u=t.tenantId)!==null&&u!==void 0?u:void 0,D=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,z=(f=t.createdAt)!==null&&f!==void 0?f:void 0,H=(E=t.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:G,emailVerified:Z,isAnonymous:Se,providerData:ee,stsTokenManager:v}=t;N(G&&v,e,"internal-error");const p=St.fromJSON(this.name,v);N(typeof G=="string",e,"internal-error"),We(A,e.name),We(P,e.name),N(typeof Z=="boolean",e,"internal-error"),N(typeof Se=="boolean",e,"internal-error"),We(b,e.name),We(k,e.name),We(M,e.name),We(D,e.name),We(z,e.name),We(H,e.name);const m=new xe({uid:G,auth:e,email:P,emailVerified:Z,displayName:A,isAnonymous:Se,photoURL:k,phoneNumber:b,tenantId:M,stsTokenManager:p,createdAt:z,lastLoginAt:H});return ee&&Array.isArray(ee)&&(m.providerData=ee.map(_=>Object.assign({},_))),D&&(m._redirectEventId=D),m}static async _fromIdTokenResponse(e,t,r=!1){const s=new St;s.updateFromServerResponse(t);const o=new xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await yr(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];N(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?ka(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),u=new St;u.updateFromIdToken(r);const h=new xe({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:l}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Si(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ao=new Map;function Ue(n){$e(n instanceof Function,"Expected a class definition");let e=Ao.get(n);return e?($e(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ao.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Oa.type="NONE";const Ro=Oa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(n,e,t){return`firebase:${n}:${e}:${t}`}class Ct{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=cr(this.userKey,s.apiKey,o),this.fullPersistenceKey=cr("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?xe._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Ct(Ue(Ro),e,r);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=s[0]||Ue(Ro);const l=cr(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const E=await f._get(l);if(E){const A=xe._fromJSON(e,E);f!==o&&(u=A),o=f;break}}catch{}const h=s.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Ct(o,e,r):(o=h[0],u&&await o._set(l,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(l)}catch{}})),new Ct(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ma(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Da(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(xa(e))return"Blackberry";if(Ua(e))return"Webos";if(Na(e))return"Safari";if((e.includes("chrome/")||Va(e))&&!e.includes("edge/"))return"Chrome";if(La(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Da(n=me()){return/firefox\//i.test(n)}function Na(n=me()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Va(n=me()){return/crios\//i.test(n)}function Ma(n=me()){return/iemobile/i.test(n)}function La(n=me()){return/android/i.test(n)}function xa(n=me()){return/blackberry/i.test(n)}function Ua(n=me()){return/webos/i.test(n)}function zi(n=me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ch(n=me()){var e;return zi(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function bh(){return Zc()&&document.documentMode===10}function Fa(n=me()){return zi(n)||La(n)||Ua(n)||xa(n)||/windows phone/i.test(n)||Ma(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(n,e=[]){let t;switch(n){case"Browser":t=Po(me());break;case"Worker":t=`${Po(me())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ut}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((l,u)=>{try{const h=e(o);l(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oh(n,e={}){return st(n,"GET","/v2/passwordPolicy",vt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh=6;class Nh{constructor(e){var t,r,s,o;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=l.minPasswordLength)!==null&&t!==void 0?t:Dh,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,l,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(s=h.containsLowercaseLetter)!==null&&s!==void 0?s:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(l=h.containsNumericCharacter)!==null&&l!==void 0?l:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new So(this),this.idTokenSubscription=new So(this),this.beforeStateQueue=new kh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Aa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ue(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Ct.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ba(this,{idToken:e}),r=await xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Me(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=s==null?void 0:s._redirectEventId,h=await this.tryRedirectSignIn(e);(!l||l===u)&&(h!=null&&h.user)&&(s=h.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return N(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await yr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=fh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Me(this.app))return Promise.reject(tt(this));const t=e?Ie(e):null;return t&&N(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&N(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Me(this.app)?Promise.reject(tt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Me(this.app)?Promise.reject(tt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ue(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Oh(this),t=new Nh(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Cn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Sh(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ue(e)||this._popupRedirectResolver;N(t,this,"argument-error"),this.redirectPersistenceManager=await Ct.create(this,[Ue(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let l=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(N(u,this,"internal-error"),u.then(()=>{l||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{l=!0,h()}}else{const h=e.addObserver(t);return()=>{l=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return N(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ba(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&uh(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ft(n){return Ie(n)}class So{constructor(e){this.auth=e,this.observer=null,this.addObserver=au(t=>this.observer=t)}get next(){return N(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Mh(n){Mr=n}function ja(n){return Mr.loadJS(n)}function Lh(){return Mr.recaptchaEnterpriseScript}function xh(){return Mr.gapiScript}function Uh(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Fh="recaptcha-enterprise",Bh="NO_RECAPTCHA";class jh{constructor(e){this.type=Fh,this.auth=Ft(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(l,u)=>{vh(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const f=new yh(h);return o.tenantId==null?o._agentRecaptchaConfig=f:o._tenantRecaptchaConfigs[o.tenantId]=f,l(f.siteKey)}}).catch(h=>{u(h)})})}function s(o,l,u){const h=window.grecaptcha;To(h)?h.enterprise.ready(()=>{h.enterprise.execute(o,{action:e}).then(f=>{l(f)}).catch(()=>{l(Bh)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,l)=>{r(this.auth).then(u=>{if(!t&&To(window.grecaptcha))s(u,o,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let h=Lh();h.length!==0&&(h+=u),ja(h).then(()=>{s(u,o,l)}).catch(f=>{l(f)})}}).catch(u=>{l(u)})})}}async function Co(n,e,t,r=!1){const s=new jh(n);let o;try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const l=Object.assign({},e);return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function bo(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Co(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Co(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $h(n,e){const t=ji(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(mr(o,e??{}))return s;Pe(s,"already-initialized")}return t.initialize({options:e})}function Hh(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Ue);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function qh(n,e,t){const r=Ft(n);N(r._canInitEmulator,r,"emulator-config-failed"),N(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=$a(e),{host:l,port:u}=zh(e),h=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${l}${h}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:l,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),Gh()}function $a(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function zh(n){const e=$a(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:ko(r.substr(o.length+1))}}else{const[o,l]=r.split(":");return{host:o,port:ko(l)}}}function ko(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Gh(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Le("not implemented")}_getIdTokenResponse(e){return Le("not implemented")}_linkToIdToken(e,t){return Le("not implemented")}_getReauthenticationResolver(e){return Le("not implemented")}}async function Kh(n,e){return st(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wh(n,e){return Vr(n,"POST","/v1/accounts:signInWithPassword",vt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qh(n,e){return Vr(n,"POST","/v1/accounts:signInWithEmailLink",vt(n,e))}async function Xh(n,e){return Vr(n,"POST","/v1/accounts:signInWithEmailLink",vt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends Gi{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new En(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new En(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bo(e,t,"signInWithPassword",Wh);case"emailLink":return Qh(e,{email:this._email,oobCode:this._password});default:Pe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bo(e,r,"signUpPassword",Kh);case"emailLink":return Xh(e,{idToken:t,email:this._email,oobCode:this._password});default:Pe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bt(n,e){return Vr(n,"POST","/v1/accounts:signInWithIdp",vt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="http://localhost";class gt extends Gi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Pe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=Fi(t,["providerId","signInMethod"]);if(!r||!s)return null;const l=new gt(r,s);return l.idToken=o.idToken||void 0,l.accessToken=o.accessToken||void 0,l.secret=o.secret,l.nonce=o.nonce,l.pendingToken=o.pendingToken||null,l}_getIdTokenResponse(e){const t=this.buildRequest();return bt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,bt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,bt(e,t)}buildRequest(){const e={requestUri:Jh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=bn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Zh(n){const e=cn(un(n)).link,t=e?cn(un(e)).deep_link_id:null,r=cn(un(n)).deep_link_id;return(r?cn(un(r)).link:null)||r||t||e||n}class Ki{constructor(e){var t,r,s,o,l,u;const h=cn(un(e)),f=(t=h.apiKey)!==null&&t!==void 0?t:null,E=(r=h.oobCode)!==null&&r!==void 0?r:null,A=Yh((s=h.mode)!==null&&s!==void 0?s:null);N(f&&E&&A,"argument-error"),this.apiKey=f,this.operation=A,this.code=E,this.continueUrl=(o=h.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(l=h.languageCode)!==null&&l!==void 0?l:null,this.tenantId=(u=h.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const t=Zh(e);try{return new Ki(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(){this.providerId=Bt.PROVIDER_ID}static credential(e,t){return En._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Ki.parseLink(t);return N(r,"argument-error"),En._fromEmailAndCode(e,r.code,r.tenantId)}}Bt.PROVIDER_ID="password";Bt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Bt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On extends Ha{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe extends On{constructor(){super("facebook.com")}static credential(e){return gt._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qe.credential(e.oauthAccessToken)}catch{return null}}}Qe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends On{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gt._fromParams({providerId:Xe.PROVIDER_ID,signInMethod:Xe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Xe.credentialFromTaggedObject(e)}static credentialFromError(e){return Xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Xe.credential(t,r)}catch{return null}}}Xe.GOOGLE_SIGN_IN_METHOD="google.com";Xe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends On{constructor(){super("github.com")}static credential(e){return gt._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Je.credential(e.oauthAccessToken)}catch{return null}}}Je.GITHUB_SIGN_IN_METHOD="github.com";Je.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye extends On{constructor(){super("twitter.com")}static credential(e,t){return gt._fromParams({providerId:Ye.PROVIDER_ID,signInMethod:Ye.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ye.credentialFromTaggedObject(e)}static credentialFromError(e){return Ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ye.credential(t,r)}catch{return null}}}Ye.TWITTER_SIGN_IN_METHOD="twitter.com";Ye.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await xe._fromIdTokenResponse(e,r,s),l=Oo(r);return new Dt({user:o,providerId:l,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Oo(r);return new Dt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Oo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr extends He{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,vr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new vr(e,t,r,s)}}function qa(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?vr._fromErrorAndOperation(n,o,e,r):o})}async function ed(n,e,t=!1){const r=await vn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Dt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function td(n,e,t=!1){const{auth:r}=n;if(Me(r.app))return Promise.reject(tt(r));const s="reauthenticate";try{const o=await vn(n,qa(r,s,e,n),t);N(o.idToken,r,"internal-error");const l=qi(o.idToken);N(l,r,"internal-error");const{sub:u}=l;return N(n.uid===u,r,"user-mismatch"),Dt._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Pe(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function za(n,e,t=!1){if(Me(n.app))return Promise.reject(tt(n));const r="signIn",s=await qa(n,r,e),o=await Dt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}async function nd(n,e){return za(Ft(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rd(n){const e=Ft(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Gg(n,e,t){return Me(n.app)?Promise.reject(tt(n)):nd(Ie(n),Bt.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&rd(n),r})}function id(n,e,t,r){return Ie(n).onIdTokenChanged(e,t,r)}function sd(n,e,t){return Ie(n).beforeAuthStateChanged(e,t)}function Kg(n,e,t,r){return Ie(n).onAuthStateChanged(e,t,r)}function Wg(n){return Ie(n).signOut()}const Er="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Er,"1"),this.storage.removeItem(Er),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=1e3,ad=10;class Ka extends Ga{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fa(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((l,u,h)=>{this.notifyListeners(l,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(r);!t&&this.localCache[r]===l||this.notifyListeners(r,l)},o=this.storage.getItem(r);bh()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ad):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},od)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ka.type="LOCAL";const ld=Ka;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa extends Ga{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wa.type="SESSION";const Qa=Wa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Lr(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,l=this.handlersMap[s];if(!(l!=null&&l.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(l).map(async f=>f(t.origin,o)),h=await cd(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Lr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,l;return new Promise((u,h)=>{const f=Wi("",20);s.port1.start();const E=setTimeout(()=>{h(new Error("unsupported_event"))},r);l={messageChannel:s,onMessage(A){const P=A;if(P.data.eventId===f)switch(P.data.status){case"ack":clearTimeout(E),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(P.data.response);break;default:clearTimeout(E),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return window}function hd(n){be().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(){return typeof be().WorkerGlobalScope<"u"&&typeof be().importScripts=="function"}async function dd(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fd(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function pd(){return Xa()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja="firebaseLocalStorageDb",gd=1,Ir="firebaseLocalStorage",Ya="fbase_key";class Dn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function xr(n,e){return n.transaction([Ir],e?"readwrite":"readonly").objectStore(Ir)}function md(){const n=indexedDB.deleteDatabase(Ja);return new Dn(n).toPromise()}function Ci(){const n=indexedDB.open(Ja,gd);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ir,{keyPath:Ya})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ir)?e(r):(r.close(),await md(),e(await Ci()))})})}async function Do(n,e,t){const r=xr(n,!0).put({[Ya]:e,value:t});return new Dn(r).toPromise()}async function _d(n,e){const t=xr(n,!1).get(e),r=await new Dn(t).toPromise();return r===void 0?null:r.value}function No(n,e){const t=xr(n,!0).delete(e);return new Dn(t).toPromise()}const yd=800,vd=3;class Za{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ci(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>vd)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Xa()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Lr._getInstance(pd()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await dd(),!this.activeServiceWorker)return;this.sender=new ud(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fd()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ci();return await Do(e,Er,"1"),await No(e,Er),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Do(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>_d(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>No(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=xr(s,!1).getAll();return new Dn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),yd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Za.type="LOCAL";const Ed=Za;new kn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(n,e){return e?Ue(e):(N(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi extends Gi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return bt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return bt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Td(n){return za(n.auth,new Qi(n),n.bypassAuthState)}function wd(n){const{auth:e,user:t}=n;return N(t,e,"internal-error"),td(t,new Qi(n),n.bypassAuthState)}async function Ad(n){const{auth:e,user:t}=n;return N(t,e,"internal-error"),ed(t,new Qi(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:l,type:u}=e;if(l){this.reject(l);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Td;case"linkViaPopup":case"linkViaRedirect":return Ad;case"reauthViaPopup":case"reauthViaRedirect":return wd;default:Pe(this.auth,"internal-error")}}resolve(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=new kn(2e3,1e4);class Pt extends el{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,Pt.currentPopupAction&&Pt.currentPopupAction.cancel(),Pt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return N(e,this.auth,"internal-error"),e}async onExecution(){$e(this.filter.length===1,"Popup operations only handle one event");const e=Wi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ce(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ce(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ce(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Rd.get())};e()}}Pt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd="pendingRedirect",ur=new Map;class Sd extends el{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ur.get(this.auth._key());if(!e){try{const r=await Cd(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ur.set(this.auth._key(),e)}return this.bypassAuthState||ur.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Cd(n,e){const t=Od(e),r=kd(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function bd(n,e){ur.set(n._key(),e)}function kd(n){return Ue(n._redirectPersistence)}function Od(n){return cr(Pd,n.config.apiKey,n.name)}async function Dd(n,e,t=!1){if(Me(n.app))return Promise.reject(tt(n));const r=Ft(n),s=Id(r,e),l=await new Sd(r,s,t).execute();return l&&!t&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=10*60*1e3;class Vd{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Md(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!tl(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ce(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Nd&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vo(e))}saveEventToCache(e){this.cachedEventUids.add(Vo(e)),this.lastProcessedEventTime=Date.now()}}function Vo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function tl({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Md(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tl(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ld(n,e={}){return st(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ud=/^https?/;async function Fd(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ld(n);for(const t of e)try{if(Bd(t))return}catch{}Pe(n,"unauthorized-domain")}function Bd(n){const e=Pi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const l=new URL(n);return l.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&l.hostname===r}if(!Ud.test(t))return!1;if(xd.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd=new kn(3e4,6e4);function Mo(){const n=be().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function $d(n){return new Promise((e,t)=>{var r,s,o;function l(){Mo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Mo(),t(Ce(n,"network-request-failed"))},timeout:jd.get()})}if(!((s=(r=be().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=be().gapi)===null||o===void 0)&&o.load)l();else{const u=Uh("iframefcb");return be()[u]=()=>{gapi.load?l():t(Ce(n,"network-request-failed"))},ja(`${xh()}?onload=${u}`).catch(h=>t(h))}}).catch(e=>{throw hr=null,e})}let hr=null;function Hd(n){return hr=hr||$d(n),hr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd=new kn(5e3,15e3),zd="__/auth/iframe",Gd="emulator/auth/iframe",Kd={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Wd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Qd(n){const e=n.config;N(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Hi(e,Gd):`https://${n.config.authDomain}/${zd}`,r={apiKey:e.apiKey,appName:n.name,v:Ut},s=Wd.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${bn(r).slice(1)}`}async function Xd(n){const e=await Hd(n),t=be().gapi;return N(t,n,"internal-error"),e.open({where:document.body,url:Qd(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Kd,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const l=Ce(n,"network-request-failed"),u=be().setTimeout(()=>{o(l)},qd.get());function h(){be().clearTimeout(u),s(r)}r.ping(h).then(h,()=>{o(l)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Yd=500,Zd=600,ef="_blank",tf="http://localhost";class Lo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nf(n,e,t,r=Yd,s=Zd){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h=Object.assign(Object.assign({},Jd),{width:r.toString(),height:s.toString(),top:o,left:l}),f=me().toLowerCase();t&&(u=Va(f)?ef:t),Da(f)&&(e=e||tf,h.scrollbars="yes");const E=Object.entries(h).reduce((P,[b,k])=>`${P}${b}=${k},`,"");if(Ch(f)&&u!=="_self")return rf(e||"",u),new Lo(null);const A=window.open(e||"",u,E);N(A,n,"popup-blocked");try{A.focus()}catch{}return new Lo(A)}function rf(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf="__/auth/handler",of="emulator/auth/handler",af=encodeURIComponent("fac");async function xo(n,e,t,r,s,o){N(n.config.authDomain,n,"auth-domain-config-required"),N(n.config.apiKey,n,"invalid-api-key");const l={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ut,eventId:s};if(e instanceof Ha){e.setDefaultLanguage(n.languageCode),l.providerId=e.providerId||"",ou(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,A]of Object.entries({}))l[E]=A}if(e instanceof On){const E=e.getScopes().filter(A=>A!=="");E.length>0&&(l.scopes=E.join(","))}n.tenantId&&(l.tid=n.tenantId);const u=l;for(const E of Object.keys(u))u[E]===void 0&&delete u[E];const h=await n._getAppCheckToken(),f=h?`#${af}=${encodeURIComponent(h)}`:"";return`${lf(n)}?${bn(u).slice(1)}${f}`}function lf({config:n}){return n.emulator?Hi(n,of):`https://${n.authDomain}/${sf}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="webStorageSupport";class cf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Qa,this._completeRedirectFn=Dd,this._overrideRedirectResult=bd}async _openPopup(e,t,r,s){var o;$e((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const l=await xo(e,t,r,Pi(),s);return nf(e,l,Wi())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await xo(e,t,r,Pi(),s);return hd(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):($e(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Xd(e),r=new Vd(e);return t.register("authEvent",s=>(N(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(vi,{type:vi},s=>{var o;const l=(o=s==null?void 0:s[0])===null||o===void 0?void 0:o[vi];l!==void 0&&t(!!l),Pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Fd(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fa()||Na()||zi()}}const uf=cf;var Uo="@firebase/auth",Fo="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){N(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function df(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ff(n){Ot(new pt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:l,authDomain:u}=r.options;N(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:l,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ba(n)},f=new Vh(r,s,o,h);return Hh(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ot(new pt("auth-internal",e=>{const t=Ft(e.getProvider("auth").getImmediate());return(r=>new hf(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),et(Uo,Fo,df(n)),et(Uo,Fo,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=5*60,gf=va("authIdTokenMaxAge")||pf;let Bo=null;const mf=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>gf)return;const s=t==null?void 0:t.token;Bo!==s&&(Bo=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Qg(n=Ea()){const e=ji(n,"auth");if(e.isInitialized())return e.getImmediate();const t=$h(n,{popupRedirectResolver:uf,persistence:[Ed,ld,Qa]}),r=va("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const l=mf(o.toString());sd(t,l,()=>l(t.currentUser)),id(t,u=>l(u))}}const s=_a("auth");return s&&qh(t,`http://${s}`),t}function _f(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Mh({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=Ce("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",_f().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ff("Browser");var jo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nl;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,p){function m(){}m.prototype=p.prototype,v.D=p.prototype,v.prototype=new m,v.prototype.constructor=v,v.C=function(_,y,T){for(var g=Array(arguments.length-2),De=2;De<arguments.length;De++)g[De-2]=arguments[De];return p.prototype[y].apply(_,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,p,m){m||(m=0);var _=Array(16);if(typeof p=="string")for(var y=0;16>y;++y)_[y]=p.charCodeAt(m++)|p.charCodeAt(m++)<<8|p.charCodeAt(m++)<<16|p.charCodeAt(m++)<<24;else for(y=0;16>y;++y)_[y]=p[m++]|p[m++]<<8|p[m++]<<16|p[m++]<<24;p=v.g[0],m=v.g[1],y=v.g[2];var T=v.g[3],g=p+(T^m&(y^T))+_[0]+3614090360&4294967295;p=m+(g<<7&4294967295|g>>>25),g=T+(y^p&(m^y))+_[1]+3905402710&4294967295,T=p+(g<<12&4294967295|g>>>20),g=y+(m^T&(p^m))+_[2]+606105819&4294967295,y=T+(g<<17&4294967295|g>>>15),g=m+(p^y&(T^p))+_[3]+3250441966&4294967295,m=y+(g<<22&4294967295|g>>>10),g=p+(T^m&(y^T))+_[4]+4118548399&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(y^p&(m^y))+_[5]+1200080426&4294967295,T=p+(g<<12&4294967295|g>>>20),g=y+(m^T&(p^m))+_[6]+2821735955&4294967295,y=T+(g<<17&4294967295|g>>>15),g=m+(p^y&(T^p))+_[7]+4249261313&4294967295,m=y+(g<<22&4294967295|g>>>10),g=p+(T^m&(y^T))+_[8]+1770035416&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(y^p&(m^y))+_[9]+2336552879&4294967295,T=p+(g<<12&4294967295|g>>>20),g=y+(m^T&(p^m))+_[10]+4294925233&4294967295,y=T+(g<<17&4294967295|g>>>15),g=m+(p^y&(T^p))+_[11]+2304563134&4294967295,m=y+(g<<22&4294967295|g>>>10),g=p+(T^m&(y^T))+_[12]+1804603682&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(y^p&(m^y))+_[13]+4254626195&4294967295,T=p+(g<<12&4294967295|g>>>20),g=y+(m^T&(p^m))+_[14]+2792965006&4294967295,y=T+(g<<17&4294967295|g>>>15),g=m+(p^y&(T^p))+_[15]+1236535329&4294967295,m=y+(g<<22&4294967295|g>>>10),g=p+(y^T&(m^y))+_[1]+4129170786&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^y&(p^m))+_[6]+3225465664&4294967295,T=p+(g<<9&4294967295|g>>>23),g=y+(p^m&(T^p))+_[11]+643717713&4294967295,y=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(y^T))+_[0]+3921069994&4294967295,m=y+(g<<20&4294967295|g>>>12),g=p+(y^T&(m^y))+_[5]+3593408605&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^y&(p^m))+_[10]+38016083&4294967295,T=p+(g<<9&4294967295|g>>>23),g=y+(p^m&(T^p))+_[15]+3634488961&4294967295,y=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(y^T))+_[4]+3889429448&4294967295,m=y+(g<<20&4294967295|g>>>12),g=p+(y^T&(m^y))+_[9]+568446438&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^y&(p^m))+_[14]+3275163606&4294967295,T=p+(g<<9&4294967295|g>>>23),g=y+(p^m&(T^p))+_[3]+4107603335&4294967295,y=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(y^T))+_[8]+1163531501&4294967295,m=y+(g<<20&4294967295|g>>>12),g=p+(y^T&(m^y))+_[13]+2850285829&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^y&(p^m))+_[2]+4243563512&4294967295,T=p+(g<<9&4294967295|g>>>23),g=y+(p^m&(T^p))+_[7]+1735328473&4294967295,y=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(y^T))+_[12]+2368359562&4294967295,m=y+(g<<20&4294967295|g>>>12),g=p+(m^y^T)+_[5]+4294588738&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^y)+_[8]+2272392833&4294967295,T=p+(g<<11&4294967295|g>>>21),g=y+(T^p^m)+_[11]+1839030562&4294967295,y=T+(g<<16&4294967295|g>>>16),g=m+(y^T^p)+_[14]+4259657740&4294967295,m=y+(g<<23&4294967295|g>>>9),g=p+(m^y^T)+_[1]+2763975236&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^y)+_[4]+1272893353&4294967295,T=p+(g<<11&4294967295|g>>>21),g=y+(T^p^m)+_[7]+4139469664&4294967295,y=T+(g<<16&4294967295|g>>>16),g=m+(y^T^p)+_[10]+3200236656&4294967295,m=y+(g<<23&4294967295|g>>>9),g=p+(m^y^T)+_[13]+681279174&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^y)+_[0]+3936430074&4294967295,T=p+(g<<11&4294967295|g>>>21),g=y+(T^p^m)+_[3]+3572445317&4294967295,y=T+(g<<16&4294967295|g>>>16),g=m+(y^T^p)+_[6]+76029189&4294967295,m=y+(g<<23&4294967295|g>>>9),g=p+(m^y^T)+_[9]+3654602809&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^y)+_[12]+3873151461&4294967295,T=p+(g<<11&4294967295|g>>>21),g=y+(T^p^m)+_[15]+530742520&4294967295,y=T+(g<<16&4294967295|g>>>16),g=m+(y^T^p)+_[2]+3299628645&4294967295,m=y+(g<<23&4294967295|g>>>9),g=p+(y^(m|~T))+_[0]+4096336452&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~y))+_[7]+1126891415&4294967295,T=p+(g<<10&4294967295|g>>>22),g=y+(p^(T|~m))+_[14]+2878612391&4294967295,y=T+(g<<15&4294967295|g>>>17),g=m+(T^(y|~p))+_[5]+4237533241&4294967295,m=y+(g<<21&4294967295|g>>>11),g=p+(y^(m|~T))+_[12]+1700485571&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~y))+_[3]+2399980690&4294967295,T=p+(g<<10&4294967295|g>>>22),g=y+(p^(T|~m))+_[10]+4293915773&4294967295,y=T+(g<<15&4294967295|g>>>17),g=m+(T^(y|~p))+_[1]+2240044497&4294967295,m=y+(g<<21&4294967295|g>>>11),g=p+(y^(m|~T))+_[8]+1873313359&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~y))+_[15]+4264355552&4294967295,T=p+(g<<10&4294967295|g>>>22),g=y+(p^(T|~m))+_[6]+2734768916&4294967295,y=T+(g<<15&4294967295|g>>>17),g=m+(T^(y|~p))+_[13]+1309151649&4294967295,m=y+(g<<21&4294967295|g>>>11),g=p+(y^(m|~T))+_[4]+4149444226&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~y))+_[11]+3174756917&4294967295,T=p+(g<<10&4294967295|g>>>22),g=y+(p^(T|~m))+_[2]+718787259&4294967295,y=T+(g<<15&4294967295|g>>>17),g=m+(T^(y|~p))+_[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+y&4294967295,v.g[3]=v.g[3]+T&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var m=p-this.blockSize,_=this.B,y=this.h,T=0;T<p;){if(y==0)for(;T<=m;)s(this,v,T),T+=this.blockSize;if(typeof v=="string"){for(;T<p;)if(_[y++]=v.charCodeAt(T++),y==this.blockSize){s(this,_),y=0;break}}else for(;T<p;)if(_[y++]=v[T++],y==this.blockSize){s(this,_),y=0;break}}this.h=y,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var m=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=m&255,m/=256;for(this.u(v),v=Array(16),p=m=0;4>p;++p)for(var _=0;32>_;_+=8)v[m++]=this.g[p]>>>_&255;return v};function o(v,p){var m=u;return Object.prototype.hasOwnProperty.call(m,v)?m[v]:m[v]=p(v)}function l(v,p){this.h=p;for(var m=[],_=!0,y=v.length-1;0<=y;y--){var T=v[y]|0;_&&T==p||(m[y]=T,_=!1)}this.g=m}var u={};function h(v){return-128<=v&&128>v?o(v,function(p){return new l([p|0],0>p?-1:0)}):new l([v|0],0>v?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return A;if(0>v)return D(f(-v));for(var p=[],m=1,_=0;v>=m;_++)p[_]=v/m|0,m*=4294967296;return new l(p,0)}function E(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return D(E(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=f(Math.pow(p,8)),_=A,y=0;y<v.length;y+=8){var T=Math.min(8,v.length-y),g=parseInt(v.substring(y,y+T),p);8>T?(T=f(Math.pow(p,T)),_=_.j(T).add(f(g))):(_=_.j(m),_=_.add(f(g)))}return _}var A=h(0),P=h(1),b=h(16777216);n=l.prototype,n.m=function(){if(M(this))return-D(this).m();for(var v=0,p=1,m=0;m<this.g.length;m++){var _=this.i(m);v+=(0<=_?_:4294967296+_)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(k(this))return"0";if(M(this))return"-"+D(this).toString(v);for(var p=f(Math.pow(v,6)),m=this,_="";;){var y=Z(m,p).g;m=z(m,y.j(p));var T=((0<m.g.length?m.g[0]:m.h)>>>0).toString(v);if(m=y,k(m))return T+_;for(;6>T.length;)T="0"+T;_=T+_}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function k(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function M(v){return v.h==-1}n.l=function(v){return v=z(this,v),M(v)?-1:k(v)?0:1};function D(v){for(var p=v.g.length,m=[],_=0;_<p;_++)m[_]=~v.g[_];return new l(m,~v.h).add(P)}n.abs=function(){return M(this)?D(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],_=0,y=0;y<=p;y++){var T=_+(this.i(y)&65535)+(v.i(y)&65535),g=(T>>>16)+(this.i(y)>>>16)+(v.i(y)>>>16);_=g>>>16,T&=65535,g&=65535,m[y]=g<<16|T}return new l(m,m[m.length-1]&-2147483648?-1:0)};function z(v,p){return v.add(D(p))}n.j=function(v){if(k(this)||k(v))return A;if(M(this))return M(v)?D(this).j(D(v)):D(D(this).j(v));if(M(v))return D(this.j(D(v)));if(0>this.l(b)&&0>v.l(b))return f(this.m()*v.m());for(var p=this.g.length+v.g.length,m=[],_=0;_<2*p;_++)m[_]=0;for(_=0;_<this.g.length;_++)for(var y=0;y<v.g.length;y++){var T=this.i(_)>>>16,g=this.i(_)&65535,De=v.i(y)>>>16,Ht=v.i(y)&65535;m[2*_+2*y]+=g*Ht,H(m,2*_+2*y),m[2*_+2*y+1]+=T*Ht,H(m,2*_+2*y+1),m[2*_+2*y+1]+=g*De,H(m,2*_+2*y+1),m[2*_+2*y+2]+=T*De,H(m,2*_+2*y+2)}for(_=0;_<p;_++)m[_]=m[2*_+1]<<16|m[2*_];for(_=p;_<2*p;_++)m[_]=0;return new l(m,0)};function H(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function G(v,p){this.g=v,this.h=p}function Z(v,p){if(k(p))throw Error("division by zero");if(k(v))return new G(A,A);if(M(v))return p=Z(D(v),p),new G(D(p.g),D(p.h));if(M(p))return p=Z(v,D(p)),new G(D(p.g),p.h);if(30<v.g.length){if(M(v)||M(p))throw Error("slowDivide_ only works with positive integers.");for(var m=P,_=p;0>=_.l(v);)m=Se(m),_=Se(_);var y=ee(m,1),T=ee(_,1);for(_=ee(_,2),m=ee(m,2);!k(_);){var g=T.add(_);0>=g.l(v)&&(y=y.add(m),T=g),_=ee(_,1),m=ee(m,1)}return p=z(v,y.j(p)),new G(y,p)}for(y=A;0<=v.l(p);){for(m=Math.max(1,Math.floor(v.m()/p.m())),_=Math.ceil(Math.log(m)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),T=f(m),g=T.j(p);M(g)||0<g.l(v);)m-=_,T=f(m),g=T.j(p);k(T)&&(T=P),y=y.add(T),v=z(v,g)}return new G(y,v)}n.A=function(v){return Z(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],_=0;_<p;_++)m[_]=this.i(_)&v.i(_);return new l(m,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],_=0;_<p;_++)m[_]=this.i(_)|v.i(_);return new l(m,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],_=0;_<p;_++)m[_]=this.i(_)^v.i(_);return new l(m,this.h^v.h)};function Se(v){for(var p=v.g.length+1,m=[],_=0;_<p;_++)m[_]=v.i(_)<<1|v.i(_-1)>>>31;return new l(m,v.h)}function ee(v,p){var m=p>>5;p%=32;for(var _=v.g.length-m,y=[],T=0;T<_;T++)y[T]=0<p?v.i(T+m)>>>p|v.i(T+m+1)<<32-p:v.i(T+m);return new l(y,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=f,l.fromString=E,nl=l}).apply(typeof jo<"u"?jo:typeof self<"u"?self:typeof window<"u"?window:{});var rr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rl,hn,il,dr,bi,sl,ol,al;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,c){return i==Array.prototype||i==Object.prototype||(i[a]=c.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof rr=="object"&&rr];for(var a=0;a<i.length;++a){var c=i[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=t(this);function s(i,a){if(a)e:{var c=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var I=i[d];if(!(I in c))break e;c=c[I]}i=i[i.length-1],d=c[i],a=a(d),a!=d&&a!=null&&e(c,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var c=0,d=!1,I={next:function(){if(!d&&c<i.length){var w=c++;return{value:a(w,i[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},u=this||self;function h(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function f(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function E(i,a,c){return i.call.apply(i.bind,arguments)}function A(i,a,c){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,d),i.apply(a,I)}}return function(){return i.apply(a,arguments)}}function P(i,a,c){return P=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?E:A,P.apply(null,arguments)}function b(i,a){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function k(i,a){function c(){}c.prototype=a.prototype,i.aa=a.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(d,I,w){for(var C=Array(arguments.length-2),j=2;j<arguments.length;j++)C[j-2]=arguments[j];return a.prototype[I].apply(d,C)}}function M(i){const a=i.length;if(0<a){const c=Array(a);for(let d=0;d<a;d++)c[d]=i[d];return c}return[]}function D(i,a){for(let c=1;c<arguments.length;c++){const d=arguments[c];if(h(d)){const I=i.length||0,w=d.length||0;i.length=I+w;for(let C=0;C<w;C++)i[I+C]=d[C]}else i.push(d)}}class z{constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function H(i){return/^[\s\xa0]*$/.test(i)}function G(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function Z(i){return Z[" "](i),i}Z[" "]=function(){};var Se=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function ee(i,a,c){for(const d in i)a.call(c,i[d],d,i)}function v(i,a){for(const c in i)a.call(void 0,i[c],c,i)}function p(i){const a={};for(const c in i)a[c]=i[c];return a}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(i,a){let c,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(c in d)i[c]=d[c];for(let w=0;w<m.length;w++)c=m[w],Object.prototype.hasOwnProperty.call(d,c)&&(i[c]=d[c])}}function y(i){var a=1;i=i.split(":");const c=[];for(;0<a&&i.length;)c.push(i.shift()),a--;return i.length&&c.push(i.join(":")),c}function T(i){u.setTimeout(()=>{throw i},0)}function g(){var i=Gr;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class De{constructor(){this.h=this.g=null}add(a,c){const d=Ht.get();d.set(a,c),this.h?this.h.next=d:this.g=d,this.h=d}}var Ht=new z(()=>new nc,i=>i.reset());class nc{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let qt,zt=!1,Gr=new De,fs=()=>{const i=u.Promise.resolve(void 0);qt=()=>{i.then(rc)}};var rc=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(c){T(c)}var a=Ht;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}zt=!1};function qe(){this.s=this.s,this.C=this.C}qe.prototype.s=!1,qe.prototype.ma=function(){this.s||(this.s=!0,this.N())},qe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function le(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}le.prototype.h=function(){this.defaultPrevented=!0};var ic=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};u.addEventListener("test",c,a),u.removeEventListener("test",c,a)}catch{}return i}();function Gt(i,a){if(le.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(Se){e:{try{Z(a.nodeName);var I=!0;break e}catch{}I=!1}I||(a=null)}}else c=="mouseover"?a=i.fromElement:c=="mouseout"&&(a=i.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:sc[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Gt.aa.h.call(this)}}k(Gt,le);var sc={2:"touch",3:"pen",4:"mouse"};Gt.prototype.h=function(){Gt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var xn="closure_listenable_"+(1e6*Math.random()|0),oc=0;function ac(i,a,c,d,I){this.listener=i,this.proxy=null,this.src=a,this.type=c,this.capture=!!d,this.ha=I,this.key=++oc,this.da=this.fa=!1}function Un(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Fn(i){this.src=i,this.g={},this.h=0}Fn.prototype.add=function(i,a,c,d,I){var w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);var C=Wr(i,a,d,I);return-1<C?(a=i[C],c||(a.fa=!1)):(a=new ac(a,this.src,w,!!d,I),a.fa=c,i.push(a)),a};function Kr(i,a){var c=a.type;if(c in i.g){var d=i.g[c],I=Array.prototype.indexOf.call(d,a,void 0),w;(w=0<=I)&&Array.prototype.splice.call(d,I,1),w&&(Un(a),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Wr(i,a,c,d){for(var I=0;I<i.length;++I){var w=i[I];if(!w.da&&w.listener==a&&w.capture==!!c&&w.ha==d)return I}return-1}var Qr="closure_lm_"+(1e6*Math.random()|0),Xr={};function ps(i,a,c,d,I){if(Array.isArray(a)){for(var w=0;w<a.length;w++)ps(i,a[w],c,d,I);return null}return c=_s(c),i&&i[xn]?i.K(a,c,f(d)?!!d.capture:!1,I):lc(i,a,c,!1,d,I)}function lc(i,a,c,d,I,w){if(!a)throw Error("Invalid event type");var C=f(I)?!!I.capture:!!I,j=Yr(i);if(j||(i[Qr]=j=new Fn(i)),c=j.add(a,c,d,C,w),c.proxy)return c;if(d=cc(),c.proxy=d,d.src=i,d.listener=c,i.addEventListener)ic||(I=C),I===void 0&&(I=!1),i.addEventListener(a.toString(),d,I);else if(i.attachEvent)i.attachEvent(ms(a.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function cc(){function i(c){return a.call(i.src,i.listener,c)}const a=uc;return i}function gs(i,a,c,d,I){if(Array.isArray(a))for(var w=0;w<a.length;w++)gs(i,a[w],c,d,I);else d=f(d)?!!d.capture:!!d,c=_s(c),i&&i[xn]?(i=i.i,a=String(a).toString(),a in i.g&&(w=i.g[a],c=Wr(w,c,d,I),-1<c&&(Un(w[c]),Array.prototype.splice.call(w,c,1),w.length==0&&(delete i.g[a],i.h--)))):i&&(i=Yr(i))&&(a=i.g[a.toString()],i=-1,a&&(i=Wr(a,c,d,I)),(c=-1<i?a[i]:null)&&Jr(c))}function Jr(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[xn])Kr(a.i,i);else{var c=i.type,d=i.proxy;a.removeEventListener?a.removeEventListener(c,d,i.capture):a.detachEvent?a.detachEvent(ms(c),d):a.addListener&&a.removeListener&&a.removeListener(d),(c=Yr(a))?(Kr(c,i),c.h==0&&(c.src=null,a[Qr]=null)):Un(i)}}}function ms(i){return i in Xr?Xr[i]:Xr[i]="on"+i}function uc(i,a){if(i.da)i=!0;else{a=new Gt(a,this);var c=i.listener,d=i.ha||i.src;i.fa&&Jr(i),i=c.call(d,a)}return i}function Yr(i){return i=i[Qr],i instanceof Fn?i:null}var Zr="__closure_events_fn_"+(1e9*Math.random()>>>0);function _s(i){return typeof i=="function"?i:(i[Zr]||(i[Zr]=function(a){return i.handleEvent(a)}),i[Zr])}function ce(){qe.call(this),this.i=new Fn(this),this.M=this,this.F=null}k(ce,qe),ce.prototype[xn]=!0,ce.prototype.removeEventListener=function(i,a,c,d){gs(this,i,a,c,d)};function _e(i,a){var c,d=i.F;if(d)for(c=[];d;d=d.F)c.push(d);if(i=i.M,d=a.type||a,typeof a=="string")a=new le(a,i);else if(a instanceof le)a.target=a.target||i;else{var I=a;a=new le(d,i),_(a,I)}if(I=!0,c)for(var w=c.length-1;0<=w;w--){var C=a.g=c[w];I=Bn(C,d,!0,a)&&I}if(C=a.g=i,I=Bn(C,d,!0,a)&&I,I=Bn(C,d,!1,a)&&I,c)for(w=0;w<c.length;w++)C=a.g=c[w],I=Bn(C,d,!1,a)&&I}ce.prototype.N=function(){if(ce.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var c=i.g[a],d=0;d<c.length;d++)Un(c[d]);delete i.g[a],i.h--}}this.F=null},ce.prototype.K=function(i,a,c,d){return this.i.add(String(i),a,!1,c,d)},ce.prototype.L=function(i,a,c,d){return this.i.add(String(i),a,!0,c,d)};function Bn(i,a,c,d){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var I=!0,w=0;w<a.length;++w){var C=a[w];if(C&&!C.da&&C.capture==c){var j=C.listener,ie=C.ha||C.src;C.fa&&Kr(i.i,C),I=j.call(ie,d)!==!1&&I}}return I&&!d.defaultPrevented}function ys(i,a,c){if(typeof i=="function")c&&(i=P(i,c));else if(i&&typeof i.handleEvent=="function")i=P(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(i,a||0)}function vs(i){i.g=ys(()=>{i.g=null,i.i&&(i.i=!1,vs(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class hc extends qe{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:vs(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Kt(i){qe.call(this),this.h=i,this.g={}}k(Kt,qe);var Es=[];function Is(i){ee(i.g,function(a,c){this.g.hasOwnProperty(c)&&Jr(a)},i),i.g={}}Kt.prototype.N=function(){Kt.aa.N.call(this),Is(this)},Kt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ei=u.JSON.stringify,dc=u.JSON.parse,fc=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function ti(){}ti.prototype.h=null;function Ts(i){return i.h||(i.h=i.i())}function ws(){}var Wt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ni(){le.call(this,"d")}k(ni,le);function ri(){le.call(this,"c")}k(ri,le);var ot={},As=null;function jn(){return As=As||new ce}ot.La="serverreachability";function Rs(i){le.call(this,ot.La,i)}k(Rs,le);function Qt(i){const a=jn();_e(a,new Rs(a))}ot.STAT_EVENT="statevent";function Ps(i,a){le.call(this,ot.STAT_EVENT,i),this.stat=a}k(Ps,le);function ye(i){const a=jn();_e(a,new Ps(a,i))}ot.Ma="timingevent";function Ss(i,a){le.call(this,ot.Ma,i),this.size=a}k(Ss,le);function Xt(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},a)}function Jt(){this.g=!0}Jt.prototype.xa=function(){this.g=!1};function pc(i,a,c,d,I,w){i.info(function(){if(i.g)if(w)for(var C="",j=w.split("&"),ie=0;ie<j.length;ie++){var B=j[ie].split("=");if(1<B.length){var ue=B[0];B=B[1];var he=ue.split("_");C=2<=he.length&&he[1]=="type"?C+(ue+"="+B+"&"):C+(ue+"=redacted&")}}else C=null;else C=w;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+a+`
`+c+`
`+C})}function gc(i,a,c,d,I,w,C){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+a+`
`+c+`
`+w+" "+C})}function It(i,a,c,d){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+_c(i,c)+(d?" "+d:"")})}function mc(i,a){i.info(function(){return"TIMEOUT: "+a})}Jt.prototype.info=function(){};function _c(i,a){if(!i.g)return a;if(!a)return null;try{var c=JSON.parse(a);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var d=c[i];if(!(2>d.length)){var I=d[1];if(Array.isArray(I)&&!(1>I.length)){var w=I[0];if(w!="noop"&&w!="stop"&&w!="close")for(var C=1;C<I.length;C++)I[C]=""}}}}return ei(c)}catch{return a}}var $n={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Cs={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ii;function Hn(){}k(Hn,ti),Hn.prototype.g=function(){return new XMLHttpRequest},Hn.prototype.i=function(){return{}},ii=new Hn;function ze(i,a,c,d){this.j=i,this.i=a,this.l=c,this.R=d||1,this.U=new Kt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new bs}function bs(){this.i=null,this.g="",this.h=!1}var ks={},si={};function oi(i,a,c){i.L=1,i.v=Kn(Ne(a)),i.m=c,i.P=!0,Os(i,null)}function Os(i,a){i.F=Date.now(),qn(i),i.A=Ne(i.v);var c=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),zs(c.i,"t",d),i.C=0,c=i.j.J,i.h=new bs,i.g=co(i.j,c?a:null,!i.m),0<i.O&&(i.M=new hc(P(i.Y,i,i.g),i.O)),a=i.U,c=i.g,d=i.ca;var I="readystatechange";Array.isArray(I)||(I&&(Es[0]=I.toString()),I=Es);for(var w=0;w<I.length;w++){var C=ps(c,I[w],d||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),Qt(),pc(i.i,i.u,i.A,i.l,i.R,i.m)}ze.prototype.ca=function(i){i=i.target;const a=this.M;a&&Ve(i)==3?a.j():this.Y(i)},ze.prototype.Y=function(i){try{if(i==this.g)e:{const he=Ve(this.g);var a=this.g.Ba();const At=this.g.Z();if(!(3>he)&&(he!=3||this.g&&(this.h.h||this.g.oa()||Ys(this.g)))){this.J||he!=4||a==7||(a==8||0>=At?Qt(3):Qt(2)),ai(this);var c=this.g.Z();this.X=c;t:if(Ds(this)){var d=Ys(this.g);i="";var I=d.length,w=Ve(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){at(this),Yt(this);var C="";break t}this.h.i=new u.TextDecoder}for(a=0;a<I;a++)this.h.h=!0,i+=this.h.i.decode(d[a],{stream:!(w&&a==I-1)});d.length=0,this.h.g+=i,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=c==200,gc(this.i,this.u,this.A,this.l,this.R,he,c),this.o){if(this.T&&!this.K){t:{if(this.g){var j,ie=this.g;if((j=ie.g?ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!H(j)){var B=j;break t}}B=null}if(c=B)It(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,li(this,c);else{this.o=!1,this.s=3,ye(12),at(this),Yt(this);break e}}if(this.P){c=!0;let Te;for(;!this.J&&this.C<C.length;)if(Te=yc(this,C),Te==si){he==4&&(this.s=4,ye(14),c=!1),It(this.i,this.l,null,"[Incomplete Response]");break}else if(Te==ks){this.s=4,ye(15),It(this.i,this.l,C,"[Invalid Chunk]"),c=!1;break}else It(this.i,this.l,Te,null),li(this,Te);if(Ds(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),he!=4||C.length!=0||this.h.h||(this.s=1,ye(16),c=!1),this.o=this.o&&c,!c)It(this.i,this.l,C,"[Invalid Chunked Response]"),at(this),Yt(this);else if(0<C.length&&!this.W){this.W=!0;var ue=this.j;ue.g==this&&ue.ba&&!ue.M&&(ue.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),pi(ue),ue.M=!0,ye(11))}}else It(this.i,this.l,C,null),li(this,C);he==4&&at(this),this.o&&!this.J&&(he==4?so(this.j,this):(this.o=!1,qn(this)))}else Mc(this.g),c==400&&0<C.indexOf("Unknown SID")?(this.s=3,ye(12)):(this.s=0,ye(13)),at(this),Yt(this)}}}catch{}finally{}};function Ds(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function yc(i,a){var c=i.C,d=a.indexOf(`
`,c);return d==-1?si:(c=Number(a.substring(c,d)),isNaN(c)?ks:(d+=1,d+c>a.length?si:(a=a.slice(d,d+c),i.C=d+c,a)))}ze.prototype.cancel=function(){this.J=!0,at(this)};function qn(i){i.S=Date.now()+i.I,Ns(i,i.I)}function Ns(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Xt(P(i.ba,i),a)}function ai(i){i.B&&(u.clearTimeout(i.B),i.B=null)}ze.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(mc(this.i,this.A),this.L!=2&&(Qt(),ye(17)),at(this),this.s=2,Yt(this)):Ns(this,this.S-i)};function Yt(i){i.j.G==0||i.J||so(i.j,i)}function at(i){ai(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,Is(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function li(i,a){try{var c=i.j;if(c.G!=0&&(c.g==i||ci(c.h,i))){if(!i.K&&ci(c.h,i)&&c.G==3){try{var d=c.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)Zn(c),Jn(c);else break e;fi(c),ye(18)}}else c.za=I[1],0<c.za-c.T&&37500>I[2]&&c.F&&c.v==0&&!c.C&&(c.C=Xt(P(c.Za,c),6e3));if(1>=Ls(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else ct(c,11)}else if((i.K||c.g==i)&&Zn(c),!H(a))for(I=c.Da.g.parse(a),a=0;a<I.length;a++){let B=I[a];if(c.T=B[0],B=B[1],c.G==2)if(B[0]=="c"){c.K=B[1],c.ia=B[2];const ue=B[3];ue!=null&&(c.la=ue,c.j.info("VER="+c.la));const he=B[4];he!=null&&(c.Aa=he,c.j.info("SVER="+c.Aa));const At=B[5];At!=null&&typeof At=="number"&&0<At&&(d=1.5*At,c.L=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const Te=i.g;if(Te){const tr=Te.g?Te.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(tr){var w=d.h;w.g||tr.indexOf("spdy")==-1&&tr.indexOf("quic")==-1&&tr.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(ui(w,w.h),w.h=null))}if(d.D){const gi=Te.g?Te.g.getResponseHeader("X-HTTP-Session-Id"):null;gi&&(d.ya=gi,K(d.I,d.D,gi))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),d=c;var C=i;if(d.qa=lo(d,d.J?d.ia:null,d.W),C.K){xs(d.h,C);var j=C,ie=d.L;ie&&(j.I=ie),j.B&&(ai(j),qn(j)),d.g=C}else ro(d);0<c.i.length&&Yn(c)}else B[0]!="stop"&&B[0]!="close"||ct(c,7);else c.G==3&&(B[0]=="stop"||B[0]=="close"?B[0]=="stop"?ct(c,7):di(c):B[0]!="noop"&&c.l&&c.l.ta(B),c.v=0)}}Qt(4)}catch{}}var vc=class{constructor(i,a){this.g=i,this.map=a}};function Vs(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ms(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Ls(i){return i.h?1:i.g?i.g.size:0}function ci(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function ui(i,a){i.g?i.g.add(a):i.h=a}function xs(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}Vs.prototype.cancel=function(){if(this.i=Us(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Us(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const c of i.g.values())a=a.concat(c.D);return a}return M(i.i)}function Ec(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var a=[],c=i.length,d=0;d<c;d++)a.push(i[d]);return a}a=[],c=0;for(d in i)a[c++]=i[d];return a}function Ic(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var a=[];i=i.length;for(var c=0;c<i;c++)a.push(c);return a}a=[],c=0;for(const d in i)a[c++]=d;return a}}}function Fs(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var c=Ic(i),d=Ec(i),I=d.length,w=0;w<I;w++)a.call(void 0,d[w],c&&c[w],i)}var Bs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Tc(i,a){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var d=i[c].indexOf("="),I=null;if(0<=d){var w=i[c].substring(0,d);I=i[c].substring(d+1)}else w=i[c];a(w,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function lt(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof lt){this.h=i.h,zn(this,i.j),this.o=i.o,this.g=i.g,Gn(this,i.s),this.l=i.l;var a=i.i,c=new tn;c.i=a.i,a.g&&(c.g=new Map(a.g),c.h=a.h),js(this,c),this.m=i.m}else i&&(a=String(i).match(Bs))?(this.h=!1,zn(this,a[1]||"",!0),this.o=Zt(a[2]||""),this.g=Zt(a[3]||"",!0),Gn(this,a[4]),this.l=Zt(a[5]||"",!0),js(this,a[6]||"",!0),this.m=Zt(a[7]||"")):(this.h=!1,this.i=new tn(null,this.h))}lt.prototype.toString=function(){var i=[],a=this.j;a&&i.push(en(a,$s,!0),":");var c=this.g;return(c||a=="file")&&(i.push("//"),(a=this.o)&&i.push(en(a,$s,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(en(c,c.charAt(0)=="/"?Rc:Ac,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",en(c,Sc)),i.join("")};function Ne(i){return new lt(i)}function zn(i,a,c){i.j=c?Zt(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function Gn(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function js(i,a,c){a instanceof tn?(i.i=a,Cc(i.i,i.h)):(c||(a=en(a,Pc)),i.i=new tn(a,i.h))}function K(i,a,c){i.i.set(a,c)}function Kn(i){return K(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Zt(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function en(i,a,c){return typeof i=="string"?(i=encodeURI(i).replace(a,wc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function wc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var $s=/[#\/\?@]/g,Ac=/[#\?:]/g,Rc=/[#\?]/g,Pc=/[#\?@]/g,Sc=/#/g;function tn(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Ge(i){i.g||(i.g=new Map,i.h=0,i.i&&Tc(i.i,function(a,c){i.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=tn.prototype,n.add=function(i,a){Ge(this),this.i=null,i=Tt(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(a),this.h+=1,this};function Hs(i,a){Ge(i),a=Tt(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function qs(i,a){return Ge(i),a=Tt(i,a),i.g.has(a)}n.forEach=function(i,a){Ge(this),this.g.forEach(function(c,d){c.forEach(function(I){i.call(a,I,d,this)},this)},this)},n.na=function(){Ge(this);const i=Array.from(this.g.values()),a=Array.from(this.g.keys()),c=[];for(let d=0;d<a.length;d++){const I=i[d];for(let w=0;w<I.length;w++)c.push(a[d])}return c},n.V=function(i){Ge(this);let a=[];if(typeof i=="string")qs(this,i)&&(a=a.concat(this.g.get(Tt(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)a=a.concat(i[c])}return a},n.set=function(i,a){return Ge(this),this.i=null,i=Tt(this,i),qs(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function zs(i,a,c){Hs(i,a),0<c.length&&(i.i=null,i.g.set(Tt(i,a),M(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(var c=0;c<a.length;c++){var d=a[c];const w=encodeURIComponent(String(d)),C=this.V(d);for(d=0;d<C.length;d++){var I=w;C[d]!==""&&(I+="="+encodeURIComponent(String(C[d]))),i.push(I)}}return this.i=i.join("&")};function Tt(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function Cc(i,a){a&&!i.j&&(Ge(i),i.i=null,i.g.forEach(function(c,d){var I=d.toLowerCase();d!=I&&(Hs(this,d),zs(this,I,c))},i)),i.j=a}function bc(i,a){const c=new Jt;if(u.Image){const d=new Image;d.onload=b(Ke,c,"TestLoadImage: loaded",!0,a,d),d.onerror=b(Ke,c,"TestLoadImage: error",!1,a,d),d.onabort=b(Ke,c,"TestLoadImage: abort",!1,a,d),d.ontimeout=b(Ke,c,"TestLoadImage: timeout",!1,a,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else a(!1)}function kc(i,a){const c=new Jt,d=new AbortController,I=setTimeout(()=>{d.abort(),Ke(c,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:d.signal}).then(w=>{clearTimeout(I),w.ok?Ke(c,"TestPingServer: ok",!0,a):Ke(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(I),Ke(c,"TestPingServer: error",!1,a)})}function Ke(i,a,c,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(c)}catch{}}function Oc(){this.g=new fc}function Dc(i,a,c){const d=c||"";try{Fs(i,function(I,w){let C=I;f(I)&&(C=ei(I)),a.push(d+w+"="+encodeURIComponent(C))})}catch(I){throw a.push(d+"type="+encodeURIComponent("_badmap")),I}}function Wn(i){this.l=i.Ub||null,this.j=i.eb||!1}k(Wn,ti),Wn.prototype.g=function(){return new Qn(this.l,this.j)},Wn.prototype.i=function(i){return function(){return i}}({});function Qn(i,a){ce.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Qn,ce),n=Qn.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,rn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,nn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,rn(this)),this.g&&(this.readyState=3,rn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Gs(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Gs(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?nn(this):rn(this),this.readyState==3&&Gs(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,nn(this))},n.Qa=function(i){this.g&&(this.response=i,nn(this))},n.ga=function(){this.g&&nn(this)};function nn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,rn(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=a.next();return i.join(`\r
`)};function rn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Qn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ks(i){let a="";return ee(i,function(c,d){a+=d,a+=":",a+=c,a+=`\r
`}),a}function hi(i,a,c){e:{for(d in c){var d=!1;break e}d=!0}d||(c=Ks(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):K(i,a,c))}function Q(i){ce.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Q,ce);var Nc=/^https?$/i,Vc=["POST","PUT"];n=Q.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ii.g(),this.v=this.o?Ts(this.o):Ts(ii),this.g.onreadystatechange=P(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(w){Ws(this,w);return}if(i=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)c.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())c.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(w=>w.toLowerCase()=="content-type"),I=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Vc,a,void 0))||d||I||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of c)this.g.setRequestHeader(w,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Js(this),this.u=!0,this.g.send(i),this.u=!1}catch(w){Ws(this,w)}};function Ws(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,Qs(i),Xn(i)}function Qs(i){i.A||(i.A=!0,_e(i,"complete"),_e(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,_e(this,"complete"),_e(this,"abort"),Xn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xn(this,!0)),Q.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Xs(this):this.bb())},n.bb=function(){Xs(this)};function Xs(i){if(i.h&&typeof l<"u"&&(!i.v[1]||Ve(i)!=4||i.Z()!=2)){if(i.u&&Ve(i)==4)ys(i.Ea,0,i);else if(_e(i,"readystatechange"),Ve(i)==4){i.h=!1;try{const C=i.Z();e:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var c;if(!(c=a)){var d;if(d=C===0){var I=String(i.D).match(Bs)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),d=!Nc.test(I?I.toLowerCase():"")}c=d}if(c)_e(i,"complete"),_e(i,"success");else{i.m=6;try{var w=2<Ve(i)?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.Z()+"]",Qs(i)}}finally{Xn(i)}}}}function Xn(i,a){if(i.g){Js(i);const c=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||_e(i,"ready");try{c.onreadystatechange=d}catch{}}}function Js(i){i.I&&(u.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Ve(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Ve(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),dc(a)}};function Ys(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Mc(i){const a={};i=(i.g&&2<=Ve(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(H(i[d]))continue;var c=y(i[d]);const I=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const w=a[I]||[];a[I]=w,w.push(c)}v(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function sn(i,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||a}function Zs(i){this.Aa=0,this.i=[],this.j=new Jt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=sn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=sn("baseRetryDelayMs",5e3,i),this.cb=sn("retryDelaySeedMs",1e4,i),this.Wa=sn("forwardChannelMaxRetries",2,i),this.wa=sn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Vs(i&&i.concurrentRequestLimit),this.Da=new Oc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Zs.prototype,n.la=8,n.G=1,n.connect=function(i,a,c,d){ye(0),this.W=i,this.H=a||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.I=lo(this,null,this.W),Yn(this)};function di(i){if(eo(i),i.G==3){var a=i.U++,c=Ne(i.I);if(K(c,"SID",i.K),K(c,"RID",a),K(c,"TYPE","terminate"),on(i,c),a=new ze(i,i.j,a),a.L=2,a.v=Kn(Ne(c)),c=!1,u.navigator&&u.navigator.sendBeacon)try{c=u.navigator.sendBeacon(a.v.toString(),"")}catch{}!c&&u.Image&&(new Image().src=a.v,c=!0),c||(a.g=co(a.j,null),a.g.ea(a.v)),a.F=Date.now(),qn(a)}ao(i)}function Jn(i){i.g&&(pi(i),i.g.cancel(),i.g=null)}function eo(i){Jn(i),i.u&&(u.clearTimeout(i.u),i.u=null),Zn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function Yn(i){if(!Ms(i.h)&&!i.s){i.s=!0;var a=i.Ga;qt||fs(),zt||(qt(),zt=!0),Gr.add(a,i),i.B=0}}function Lc(i,a){return Ls(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Xt(P(i.Ga,i,a),oo(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const I=new ze(this,this.j,i);let w=this.o;if(this.S&&(w?(w=p(w),_(w,this.S)):w=this.S),this.m!==null||this.O||(I.H=w,w=null),this.P)e:{for(var a=0,c=0;c<this.i.length;c++){t:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=c;break e}if(a===4096||c===this.i.length-1){a=c+1;break e}}a=1e3}else a=1e3;a=no(this,I,a),c=Ne(this.I),K(c,"RID",i),K(c,"CVER",22),this.D&&K(c,"X-HTTP-Session-Id",this.D),on(this,c),w&&(this.O?a="headers="+encodeURIComponent(String(Ks(w)))+"&"+a:this.m&&hi(c,this.m,w)),ui(this.h,I),this.Ua&&K(c,"TYPE","init"),this.P?(K(c,"$req",a),K(c,"SID","null"),I.T=!0,oi(I,c,null)):oi(I,c,a),this.G=2}}else this.G==3&&(i?to(this,i):this.i.length==0||Ms(this.h)||to(this))};function to(i,a){var c;a?c=a.l:c=i.U++;const d=Ne(i.I);K(d,"SID",i.K),K(d,"RID",c),K(d,"AID",i.T),on(i,d),i.m&&i.o&&hi(d,i.m,i.o),c=new ze(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),a&&(i.i=a.D.concat(i.i)),a=no(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),ui(i.h,c),oi(c,d,a)}function on(i,a){i.H&&ee(i.H,function(c,d){K(a,d,c)}),i.l&&Fs({},function(c,d){K(a,d,c)})}function no(i,a,c){c=Math.min(i.i.length,c);var d=i.l?P(i.l.Na,i.l,i):null;e:{var I=i.i;let w=-1;for(;;){const C=["count="+c];w==-1?0<c?(w=I[0].g,C.push("ofs="+w)):w=0:C.push("ofs="+w);let j=!0;for(let ie=0;ie<c;ie++){let B=I[ie].g;const ue=I[ie].map;if(B-=w,0>B)w=Math.max(0,I[ie].g-100),j=!1;else try{Dc(ue,C,"req"+B+"_")}catch{d&&d(ue)}}if(j){d=C.join("&");break e}}}return i=i.i.splice(0,c),a.D=i,d}function ro(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;qt||fs(),zt||(qt(),zt=!0),Gr.add(a,i),i.v=0}}function fi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Xt(P(i.Fa,i),oo(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,io(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Xt(P(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ye(10),Jn(this),io(this))};function pi(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function io(i){i.g=new ze(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=Ne(i.qa);K(a,"RID","rpc"),K(a,"SID",i.K),K(a,"AID",i.T),K(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&K(a,"TO",i.ja),K(a,"TYPE","xmlhttp"),on(i,a),i.m&&i.o&&hi(a,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=Kn(Ne(a)),c.m=null,c.P=!0,Os(c,i)}n.Za=function(){this.C!=null&&(this.C=null,Jn(this),fi(this),ye(19))};function Zn(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function so(i,a){var c=null;if(i.g==a){Zn(i),pi(i),i.g=null;var d=2}else if(ci(i.h,a))c=a.D,xs(i.h,a),d=1;else return;if(i.G!=0){if(a.o)if(d==1){c=a.m?a.m.length:0,a=Date.now()-a.F;var I=i.B;d=jn(),_e(d,new Ss(d,c)),Yn(i)}else ro(i);else if(I=a.s,I==3||I==0&&0<a.X||!(d==1&&Lc(i,a)||d==2&&fi(i)))switch(c&&0<c.length&&(a=i.h,a.i=a.i.concat(c)),I){case 1:ct(i,5);break;case 4:ct(i,10);break;case 3:ct(i,6);break;default:ct(i,2)}}}function oo(i,a){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*a}function ct(i,a){if(i.j.info("Error code "+a),a==2){var c=P(i.fb,i),d=i.Xa;const I=!d;d=new lt(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||zn(d,"https"),Kn(d),I?bc(d.toString(),c):kc(d.toString(),c)}else ye(2);i.G=0,i.l&&i.l.sa(a),ao(i),eo(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))};function ao(i){if(i.G=0,i.ka=[],i.l){const a=Us(i.h);(a.length!=0||i.i.length!=0)&&(D(i.ka,a),D(i.ka,i.i),i.h.i.length=0,M(i.i),i.i.length=0),i.l.ra()}}function lo(i,a,c){var d=c instanceof lt?Ne(c):new lt(c);if(d.g!="")a&&(d.g=a+"."+d.g),Gn(d,d.s);else{var I=u.location;d=I.protocol,a=a?a+"."+I.hostname:I.hostname,I=+I.port;var w=new lt(null);d&&zn(w,d),a&&(w.g=a),I&&Gn(w,I),c&&(w.l=c),d=w}return c=i.D,a=i.ya,c&&a&&K(d,c,a),K(d,"VER",i.la),on(i,d),d}function co(i,a,c){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new Q(new Wn({eb:c})):new Q(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function uo(){}n=uo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function er(){}er.prototype.g=function(i,a){return new Ee(i,a)};function Ee(i,a){ce.call(this),this.g=new Zs(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!H(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!H(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new wt(this)}k(Ee,ce),Ee.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ee.prototype.close=function(){di(this.g)},Ee.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=ei(i),i=c);a.i.push(new vc(a.Ya++,i)),a.G==3&&Yn(a)},Ee.prototype.N=function(){this.g.l=null,delete this.j,di(this.g),delete this.g,Ee.aa.N.call(this)};function ho(i){ni.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){e:{for(const c in a){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}k(ho,ni);function fo(){ri.call(this),this.status=1}k(fo,ri);function wt(i){this.g=i}k(wt,uo),wt.prototype.ua=function(){_e(this.g,"a")},wt.prototype.ta=function(i){_e(this.g,new ho(i))},wt.prototype.sa=function(i){_e(this.g,new fo)},wt.prototype.ra=function(){_e(this.g,"b")},er.prototype.createWebChannel=er.prototype.g,Ee.prototype.send=Ee.prototype.o,Ee.prototype.open=Ee.prototype.m,Ee.prototype.close=Ee.prototype.close,al=function(){return new er},ol=function(){return jn()},sl=ot,bi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},$n.NO_ERROR=0,$n.TIMEOUT=8,$n.HTTP_ERROR=6,dr=$n,Cs.COMPLETE="complete",il=Cs,ws.EventType=Wt,Wt.OPEN="a",Wt.CLOSE="b",Wt.ERROR="c",Wt.MESSAGE="d",ce.prototype.listen=ce.prototype.K,hn=ws,Q.prototype.listenOnce=Q.prototype.L,Q.prototype.getLastError=Q.prototype.Ka,Q.prototype.getLastErrorCode=Q.prototype.Ba,Q.prototype.getStatus=Q.prototype.Z,Q.prototype.getResponseJson=Q.prototype.Oa,Q.prototype.getResponseText=Q.prototype.oa,Q.prototype.send=Q.prototype.ea,Q.prototype.setWithCredentials=Q.prototype.Ha,rl=Q}).apply(typeof rr<"u"?rr:typeof self<"u"?self:typeof window<"u"?window:{});const $o="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}fe.UNAUTHENTICATED=new fe(null),fe.GOOGLE_CREDENTIALS=new fe("google-credentials-uid"),fe.FIRST_PARTY=new fe("first-party-uid"),fe.MOCK_USER=new fe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jt="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new Bi("@firebase/firestore");function an(){return mt.logLevel}function O(n,...e){if(mt.logLevel<=x.DEBUG){const t=e.map(Xi);mt.debug(`Firestore (${jt}): ${n}`,...t)}}function _t(n,...e){if(mt.logLevel<=x.ERROR){const t=e.map(Xi);mt.error(`Firestore (${jt}): ${n}`,...t)}}function Tr(n,...e){if(mt.logLevel<=x.WARN){const t=e.map(Xi);mt.warn(`Firestore (${jt}): ${n}`,...t)}}function Xi(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n="Unexpected state"){const e=`FIRESTORE (${jt}) INTERNAL ASSERTION FAILED: `+n;throw _t(e),new Error(e)}function X(n,e){n||U()}function q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends He{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class yf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(fe.UNAUTHENTICATED))}shutdown(){}}class vf{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Ef{constructor(e){this.t=e,this.currentUser=fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new dt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new dt,e.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},u=h=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new dt)}},0),l()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string"),new ll(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string"),new fe(e)}}class If{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=fe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Tf{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new If(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(fe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class wf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Af{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){X(this.o===void 0);const r=o=>{o.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.R;return this.R=o.token,O("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const s=o=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(X(typeof t.token=="string"),this.R=t.token,new wf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=Rf(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%e.length))}return r}}function $(n,e){return n<e?-1:n>e?1:0}function Nt(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return re.fromMillis(Date.now())}static fromDate(e){return re.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new re(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.timestamp=e}static fromTimestamp(e){return new W(e)}static min(){return new W(new re(0,0))}static max(){return new W(new re(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(),r===void 0?r=e.length-t:r>e.length-t&&U(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return In.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof In?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=e.get(s),l=t.get(s);if(o<l)return-1;if(o>l)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Y extends In{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const Pf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ae extends In{construct(e,t,r){return new ae(e,t,r)}static isValidIdentifier(e){return Pf.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ae.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ae(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let l=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else u==="`"?(l=!l,s++):u!=="."||l?(r+=u,s++):(o(),s++)}if(o(),l)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ae(t)}static emptyPath(){return new ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Y.fromString(e))}static fromName(e){return new L(Y.fromString(e).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Y(e.slice()))}}function Sf(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new re(t+1,0):new re(t,r));return new nt(s,L.empty(),e)}function Cf(n){return new nt(n.readTime,n.key,-1)}class nt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new nt(W.min(),L.empty(),-1)}static max(){return new nt(W.max(),L.empty(),-1)}}function bf(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Of{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ul(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==kf)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let s=0,o=0,l=!1;e.forEach(u=>{++s,u.next(()=>{++o,l&&o===s&&t()},h=>r(h))}),l=!0,o===s&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(s=>s?R.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new R((r,s)=>{const o=e.length,l=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next(E=>{l[f]=E,++u,u===o&&r(l)},E=>s(E))}})}static doWhile(e,t){return new R((r,s)=>{const o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}}function Df(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ur(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}hl.oe=-1;function Ji(n){return n==null}function wr(n){return n===0&&1/n==-1/0}function Nf(n){return typeof n=="number"&&Number.isInteger(n)&&!wr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Nn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function dl(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t){this.comparator=e,this.root=t||se.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,se.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,se.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ir(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ir(this.root,e,this.comparator,!1)}getReverseIterator(){return new ir(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ir(this.root,e,this.comparator,!0)}}class ir{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class se{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??se.RED,this.left=s??se.EMPTY,this.right=o??se.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new se(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return se.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return se.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();const e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}}se.EMPTY=null,se.RED=!0,se.BLACK=!1;se.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,r,s,o){return this}insert(e,t,r){return new se(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new qo(this.data.getIterator())}getIteratorFrom(e){return new qo(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ge)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ge(this.comparator);return t.data=e,t}}class qo{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.fields=e,e.sort(ae.comparator)}static empty(){return new Re([])}unionWith(e){let t=new ge(ae.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Re(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Nt(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Vf("Invalid base64 string: "+o):o}}(e);return new ke(t)}static fromUint8Array(e){const t=function(s){let o="";for(let l=0;l<s.length;++l)o+=String.fromCharCode(s[l]);return o}(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const Mf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yt(n){if(X(!!n),typeof n=="string"){let e=0;const t=Mf.exec(n);if(X(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:oe(n.seconds),nanos:oe(n.nanos)}}function oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Tn(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function fl(n){const e=n.mapValue.fields.__previous_value__;return Yi(e)?fl(e):e}function Ar(n){const e=yt(n.mapValue.fields.__local_write_time__.timestampValue);return new re(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t,r,s,o,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f}}class Rr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Rr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Rr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr={mapValue:{}};function Vt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Yi(n)?4:Uf(n)?9007199254740991:xf(n)?10:11:U()}function Oe(n,e){if(n===e)return!0;const t=Vt(n);if(t!==Vt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ar(n).isEqual(Ar(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const l=yt(s.timestampValue),u=yt(o.timestampValue);return l.seconds===u.seconds&&l.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return Tn(s.bytesValue).isEqual(Tn(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return oe(s.geoPointValue.latitude)===oe(o.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return oe(s.integerValue)===oe(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const l=oe(s.doubleValue),u=oe(o.doubleValue);return l===u?wr(l)===wr(u):isNaN(l)&&isNaN(u)}return!1}(n,e);case 9:return Nt(n.arrayValue.values||[],e.arrayValue.values||[],Oe);case 10:case 11:return function(s,o){const l=s.mapValue.fields||{},u=o.mapValue.fields||{};if(Ho(l)!==Ho(u))return!1;for(const h in l)if(l.hasOwnProperty(h)&&(u[h]===void 0||!Oe(l[h],u[h])))return!1;return!0}(n,e);default:return U()}}function wn(n,e){return(n.values||[]).find(t=>Oe(t,e))!==void 0}function Mt(n,e){if(n===e)return 0;const t=Vt(n),r=Vt(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return function(o,l){const u=oe(o.integerValue||o.doubleValue),h=oe(l.integerValue||l.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,e);case 3:return zo(n.timestampValue,e.timestampValue);case 4:return zo(Ar(n),Ar(e));case 5:return $(n.stringValue,e.stringValue);case 6:return function(o,l){const u=Tn(o),h=Tn(l);return u.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,l){const u=o.split("/"),h=l.split("/");for(let f=0;f<u.length&&f<h.length;f++){const E=$(u[f],h[f]);if(E!==0)return E}return $(u.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,l){const u=$(oe(o.latitude),oe(l.latitude));return u!==0?u:$(oe(o.longitude),oe(l.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Go(n.arrayValue,e.arrayValue);case 10:return function(o,l){var u,h,f,E;const A=o.fields||{},P=l.fields||{},b=(u=A.value)===null||u===void 0?void 0:u.arrayValue,k=(h=P.value)===null||h===void 0?void 0:h.arrayValue,M=$(((f=b==null?void 0:b.values)===null||f===void 0?void 0:f.length)||0,((E=k==null?void 0:k.values)===null||E===void 0?void 0:E.length)||0);return M!==0?M:Go(b,k)}(n.mapValue,e.mapValue);case 11:return function(o,l){if(o===sr.mapValue&&l===sr.mapValue)return 0;if(o===sr.mapValue)return 1;if(l===sr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=l.fields||{},E=Object.keys(f);h.sort(),E.sort();for(let A=0;A<h.length&&A<E.length;++A){const P=$(h[A],E[A]);if(P!==0)return P;const b=Mt(u[h[A]],f[E[A]]);if(b!==0)return b}return $(h.length,E.length)}(n.mapValue,e.mapValue);default:throw U()}}function zo(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);const t=yt(n),r=yt(e),s=$(t.seconds,r.seconds);return s!==0?s:$(t.nanos,r.nanos)}function Go(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=Mt(t[s],r[s]);if(o)return o}return $(t.length,r.length)}function Lt(n){return ki(n)}function ki(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=yt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Tn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=ki(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const l of r)o?o=!1:s+=",",s+=`${l}:${ki(t.fields[l])}`;return s+"}"}(n.mapValue):U()}function Oi(n){return!!n&&"integerValue"in n}function Zi(n){return!!n&&"arrayValue"in n}function fr(n){return!!n&&"mapValue"in n}function xf(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function fn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Nn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=fn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Uf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.value=e}static empty(){return new Ae({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!fr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fn(t)}setAll(e){let t=ae.emptyPath(),r={},s=[];e.forEach((l,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=u.popLast()}l?r[u.lastSegment()]=fn(l):s.push(u.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());fr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Oe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];fr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Nn(t,(s,o)=>e[s]=o);for(const s of r)delete e[s]}clone(){return new Ae(fn(this.value))}}function pl(n){const e=[];return Nn(n.fields,(t,r)=>{const s=new ae([t]);if(fr(r)){const o=pl(r.mapValue).fields;if(o.length===0)e.push(s);else for(const l of o)e.push(s.child(l))}else e.push(s)}),new Re(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,t,r,s,o,l,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=l,this.documentState=u}static newInvalidDocument(e){return new we(e,0,W.min(),W.min(),W.min(),Ae.empty(),0)}static newFoundDocument(e,t,r,s){return new we(e,1,t,W.min(),r,s,0)}static newNoDocument(e,t){return new we(e,2,t,W.min(),W.min(),Ae.empty(),0)}static newUnknownDocument(e,t){return new we(e,3,t,W.min(),W.min(),Ae.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ae.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ae.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof we&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new we(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t){this.position=e,this.inclusive=t}}function Ko(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],l=n.position[s];if(o.field.isKeyField()?r=L.comparator(L.fromName(l.referenceValue),t.key):r=Mt(l,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Wo(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Oe(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ff(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{}class ne extends gl{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new jf(e,t,r):t==="array-contains"?new qf(e,r):t==="in"?new zf(e,r):t==="not-in"?new Gf(e,r):t==="array-contains-any"?new Kf(e,r):new ne(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new $f(e,r):new Hf(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Mt(t,this.value)):t!==null&&Vt(this.value)===Vt(t)&&this.matchesComparison(Mt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rt extends gl{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new rt(e,t)}matches(e){return ml(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ml(n){return n.op==="and"}function _l(n){return Bf(n)&&ml(n)}function Bf(n){for(const e of n.filters)if(e instanceof rt)return!1;return!0}function Di(n){if(n instanceof ne)return n.field.canonicalString()+n.op.toString()+Lt(n.value);if(_l(n))return n.filters.map(e=>Di(e)).join(",");{const e=n.filters.map(t=>Di(t)).join(",");return`${n.op}(${e})`}}function yl(n,e){return n instanceof ne?function(r,s){return s instanceof ne&&r.op===s.op&&r.field.isEqual(s.field)&&Oe(r.value,s.value)}(n,e):n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,l,u)=>o&&yl(l,s.filters[u]),!0):!1}(n,e):void U()}function vl(n){return n instanceof ne?function(t){return`${t.field.canonicalString()} ${t.op} ${Lt(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(vl).join(" ,")+"}"}(n):"Filter"}class jf extends ne{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class $f extends ne{constructor(e,t){super(e,"in",t),this.keys=El("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Hf extends ne{constructor(e,t){super(e,"not-in",t),this.keys=El("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function El(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class qf extends ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Zi(t)&&wn(t.arrayValue,this.value)}}class zf extends ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&wn(this.value.arrayValue,t)}}class Gf extends ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(wn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!wn(this.value.arrayValue,t)}}class Kf extends ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Zi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>wn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e,t=null,r=[],s=[],o=null,l=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=l,this.endAt=u,this.ue=null}}function Qo(n,e=null,t=[],r=[],s=null,o=null,l=null){return new Wf(n,e,t,r,s,o,l)}function es(n){const e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Di(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Ji(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Lt(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Lt(r)).join(",")),e.ue=t}return e.ue}function ts(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ff(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!yl(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Wo(n.startAt,e.startAt)&&Wo(n.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t=null,r=[],s=[],o=null,l="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=l,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Qf(n,e,t,r,s,o,l,u){return new Fr(n,e,t,r,s,o,l,u)}function Xf(n){return new Fr(n)}function Xo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Jf(n){return n.collectionGroup!==null}function pn(n){const e=q(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(l){let u=new ge(ae.comparator);return l.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Sr(o,r))}),t.has(ae.keyField().canonicalString())||e.ce.push(new Sr(ae.keyField(),r))}return e.ce}function ft(n){const e=q(n);return e.le||(e.le=Yf(e,pn(n))),e.le}function Yf(n,e){if(n.limitType==="F")return Qo(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Sr(s.field,o)});const t=n.endAt?new Pr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Pr(n.startAt.position,n.startAt.inclusive):null;return Qo(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Ni(n,e,t){return new Fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Il(n,e){return ts(ft(n),ft(e))&&n.limitType===e.limitType}function Tl(n){return`${es(ft(n))}|lt:${n.limitType}`}function ln(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>vl(s)).join(", ")}]`),Ji(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(l){return`${l.field.canonicalString()} (${l.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Lt(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Lt(s)).join(",")),`Target(${r})`}(ft(n))}; limitType=${n.limitType})`}function ns(n,e){return e.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(const o of pn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(l,u,h){const f=Ko(l,u,h);return l.inclusive?f<=0:f<0}(r.startAt,pn(r),s)||r.endAt&&!function(l,u,h){const f=Ko(l,u,h);return l.inclusive?f>=0:f>0}(r.endAt,pn(r),s))}(n,e)}function Zf(n){return(e,t)=>{let r=!1;for(const s of pn(n)){const o=ep(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function ep(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(o,l,u){const h=l.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Mt(h,f):U()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Nn(this.inner,(t,r)=>{for(const[s,o]of r)e(s,o)})}isEmpty(){return dl(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp=new ve(L.comparator);function Cr(){return tp}const wl=new ve(L.comparator);function or(...n){let e=wl;for(const t of n)e=e.insert(t.key,t);return e}function Al(n){let e=wl;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function ht(){return gn()}function Rl(){return gn()}function gn(){return new $t(n=>n.toString(),(n,e)=>n.isEqual(e))}const np=new ve(L.comparator),rp=new ge(L.comparator);function pe(...n){let e=rp;for(const t of n)e=e.add(t);return e}const ip=new ge($);function sp(){return ip}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:wr(e)?"-0":e}}function Pl(n){return{integerValue:""+n}}function op(n,e){return Nf(e)?Pl(e):rs(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(){this._=void 0}}function ap(n,e,t){return n instanceof br?function(s,o){const l={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Yi(o)&&(o=fl(o)),o&&(l.fields.__previous_value__=o),{mapValue:l}}(t,e):n instanceof An?Cl(n,e):n instanceof Rn?bl(n,e):function(s,o){const l=Sl(s,o),u=Jo(l)+Jo(s.Pe);return Oi(l)&&Oi(s.Pe)?Pl(u):rs(s.serializer,u)}(n,e)}function lp(n,e,t){return n instanceof An?Cl(n,e):n instanceof Rn?bl(n,e):t}function Sl(n,e){return n instanceof kr?function(r){return Oi(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class br extends Br{}class An extends Br{constructor(e){super(),this.elements=e}}function Cl(n,e){const t=kl(e);for(const r of n.elements)t.some(s=>Oe(s,r))||t.push(r);return{arrayValue:{values:t}}}class Rn extends Br{constructor(e){super(),this.elements=e}}function bl(n,e){let t=kl(e);for(const r of n.elements)t=t.filter(s=>!Oe(s,r));return{arrayValue:{values:t}}}class kr extends Br{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Jo(n){return oe(n.integerValue||n.doubleValue)}function kl(n){return Zi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function cp(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof An&&s instanceof An||r instanceof Rn&&s instanceof Rn?Nt(r.elements,s.elements,Oe):r instanceof kr&&s instanceof kr?Oe(r.Pe,s.Pe):r instanceof br&&s instanceof br}(n.transform,e.transform)}class up{constructor(e,t){this.version=e,this.transformResults=t}}class Fe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Fe}static exists(e){return new Fe(void 0,e)}static updateTime(e){return new Fe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function pr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class jr{}function Ol(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Nl(n.key,Fe.none()):new Vn(n.key,n.data,Fe.none());{const t=n.data,r=Ae.empty();let s=new ge(ae.comparator);for(let o of e.fields)if(!s.has(o)){let l=t.field(o);l===null&&o.length>1&&(o=o.popLast(),l=t.field(o)),l===null?r.delete(o):r.set(o,l),s=s.add(o)}return new Et(n.key,r,new Re(s.toArray()),Fe.none())}}function hp(n,e,t){n instanceof Vn?function(s,o,l){const u=s.value.clone(),h=Zo(s.fieldTransforms,o,l.transformResults);u.setAll(h),o.convertToFoundDocument(l.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Et?function(s,o,l){if(!pr(s.precondition,o))return void o.convertToUnknownDocument(l.version);const u=Zo(s.fieldTransforms,o,l.transformResults),h=o.data;h.setAll(Dl(s)),h.setAll(u),o.convertToFoundDocument(l.version,h).setHasCommittedMutations()}(n,e,t):function(s,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()}(0,e,t)}function mn(n,e,t,r){return n instanceof Vn?function(o,l,u,h){if(!pr(o.precondition,l))return u;const f=o.value.clone(),E=ea(o.fieldTransforms,h,l);return f.setAll(E),l.convertToFoundDocument(l.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof Et?function(o,l,u,h){if(!pr(o.precondition,l))return u;const f=ea(o.fieldTransforms,h,l),E=l.data;return E.setAll(Dl(o)),E.setAll(f),l.convertToFoundDocument(l.version,E).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(A=>A.field))}(n,e,t,r):function(o,l,u){return pr(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):u}(n,e,t)}function dp(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),o=Sl(r.transform,s||null);o!=null&&(t===null&&(t=Ae.empty()),t.set(r.field,o))}return t||null}function Yo(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Nt(r,s,(o,l)=>cp(o,l))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Vn extends jr{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Et extends jr{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Dl(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Zo(n,e,t){const r=new Map;X(n.length===t.length);for(let s=0;s<t.length;s++){const o=n[s],l=o.transform,u=e.data.field(o.field);r.set(o.field,lp(l,u,t[s]))}return r}function ea(n,e,t){const r=new Map;for(const s of n){const o=s.transform,l=t.data.field(s.field);r.set(s.field,ap(o,l,e))}return r}class Nl extends jr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class fp extends jr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&hp(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=mn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=mn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Rl();return this.mutations.forEach(s=>{const o=e.get(s.key),l=o.overlayedDocument;let u=this.applyToLocalView(l,o.mutatedFields);u=t.has(s.key)?null:u;const h=Ol(l,u);h!==null&&r.set(s.key,h),l.isValidDocument()||l.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),pe())}isEqual(e){return this.batchId===e.batchId&&Nt(this.mutations,e.mutations,(t,r)=>Yo(t,r))&&Nt(this.baseMutations,e.baseMutations,(t,r)=>Yo(t,r))}}class is{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){X(e.mutations.length===r.length);let s=function(){return np}();const o=e.mutations;for(let l=0;l<o.length;l++)s=s.insert(o[l].key,r[l].version);return new is(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J,F;function mp(n){switch(n){default:return U();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function _p(n){if(n===void 0)return _t("GRPC error has no .code"),S.UNKNOWN;switch(n){case J.OK:return S.OK;case J.CANCELLED:return S.CANCELLED;case J.UNKNOWN:return S.UNKNOWN;case J.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case J.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case J.INTERNAL:return S.INTERNAL;case J.UNAVAILABLE:return S.UNAVAILABLE;case J.UNAUTHENTICATED:return S.UNAUTHENTICATED;case J.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case J.NOT_FOUND:return S.NOT_FOUND;case J.ALREADY_EXISTS:return S.ALREADY_EXISTS;case J.PERMISSION_DENIED:return S.PERMISSION_DENIED;case J.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case J.ABORTED:return S.ABORTED;case J.OUT_OF_RANGE:return S.OUT_OF_RANGE;case J.UNIMPLEMENTED:return S.UNIMPLEMENTED;case J.DATA_LOSS:return S.DATA_LOSS;default:return U()}}(F=J||(J={}))[F.OK=0]="OK",F[F.CANCELLED=1]="CANCELLED",F[F.UNKNOWN=2]="UNKNOWN",F[F.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",F[F.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",F[F.NOT_FOUND=5]="NOT_FOUND",F[F.ALREADY_EXISTS=6]="ALREADY_EXISTS",F[F.PERMISSION_DENIED=7]="PERMISSION_DENIED",F[F.UNAUTHENTICATED=16]="UNAUTHENTICATED",F[F.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",F[F.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",F[F.ABORTED=10]="ABORTED",F[F.OUT_OF_RANGE=11]="OUT_OF_RANGE",F[F.UNIMPLEMENTED=12]="UNIMPLEMENTED",F[F.INTERNAL=13]="INTERNAL",F[F.UNAVAILABLE=14]="UNAVAILABLE",F[F.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new nl([4294967295,4294967295],0);class yp{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Vi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function vp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Ep(n,e){return Vi(n,e.toTimestamp())}function kt(n){return X(!!n),W.fromTimestamp(function(t){const r=yt(t);return new re(r.seconds,r.nanos)}(n))}function Vl(n,e){return Mi(n,e).canonicalString()}function Mi(n,e){const t=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ip(n){const e=Y.fromString(n);return X(bp(e)),e}function Li(n,e){return Vl(n.databaseId,e.path)}function Tp(n){const e=Ip(n);return e.length===4?Y.emptyPath():Ap(e)}function wp(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ap(n){return X(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function ta(n,e,t){return{name:Li(n,e),fields:t.value.mapValue.fields}}function Rp(n,e){let t;if(e instanceof Vn)t={update:ta(n,e.key,e.value)};else if(e instanceof Nl)t={delete:Li(n,e.key)};else if(e instanceof Et)t={update:ta(n,e.key,e.data),updateMask:Cp(e.fieldMask)};else{if(!(e instanceof fp))return U();t={verify:Li(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,l){const u=l.transform;if(u instanceof br)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof An)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Rn)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof kr)return{fieldPath:l.field.canonicalString(),increment:u.Pe};throw U()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Ep(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:U()}(n,e.precondition)),t}function Pp(n,e){return n&&n.length>0?(X(e!==void 0),n.map(t=>function(s,o){let l=s.updateTime?kt(s.updateTime):kt(o);return l.isEqual(W.min())&&(l=kt(o)),new up(l,s.transformResults||[])}(t,e))):[]}function Sp(n){let e=Tp(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){X(r===1);const E=t.from[0];E.allDescendants?s=E.collectionId:e=e.child(E.collectionId)}let o=[];t.where&&(o=function(A){const P=Ml(A);return P instanceof rt&&_l(P)?P.getFilters():[P]}(t.where));let l=[];t.orderBy&&(l=function(A){return A.map(P=>function(k){return new Sr(Rt(k.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(P))}(t.orderBy));let u=null;t.limit&&(u=function(A){let P;return P=typeof A=="object"?A.value:A,Ji(P)?null:P}(t.limit));let h=null;t.startAt&&(h=function(A){const P=!!A.before,b=A.values||[];return new Pr(b,P)}(t.startAt));let f=null;return t.endAt&&(f=function(A){const P=!A.before,b=A.values||[];return new Pr(b,P)}(t.endAt)),Qf(e,s,l,o,u,"F",h,f)}function Ml(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Rt(t.unaryFilter.field);return ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Rt(t.unaryFilter.field);return ne.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Rt(t.unaryFilter.field);return ne.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=Rt(t.unaryFilter.field);return ne.create(l,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return ne.create(Rt(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>Ml(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function Rt(n){return ae.fromServerFormat(n.fieldPath)}function Cp(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function bp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.ct=e}}function Op(n){const e=Sp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ni(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(){this.un=new Np}addToCollectionParentIndex(e,t){return this.un.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(nt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(nt.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class Np{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ge(Y.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ge(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new xt(0)}static kn(){return new xt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(){this.changes=new $t(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,we.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&mn(r.mutation,s,Re.empty(),re.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,pe()).next(()=>r))}getLocalViewOfDocuments(e,t,r=pe()){const s=ht();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let l=or();return o.forEach((u,h)=>{l=l.insert(u,h.overlayedDocument)}),l}))}getOverlayedDocuments(e,t){const r=ht();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,pe()))}populateOverlays(e,t,r){const s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((l,u)=>{t.set(l,u)})})}computeViews(e,t,r,s){let o=Cr();const l=gn(),u=function(){return gn()}();return t.forEach((h,f)=>{const E=r.get(f.key);s.has(f.key)&&(E===void 0||E.mutation instanceof Et)?o=o.insert(f.key,f):E!==void 0?(l.set(f.key,E.mutation.getFieldMask()),mn(E.mutation,f,E.mutation.getFieldMask(),re.now())):l.set(f.key,Re.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((f,E)=>l.set(f,E)),t.forEach((f,E)=>{var A;return u.set(f,new Mp(E,(A=l.get(f))!==null&&A!==void 0?A:null))}),u))}recalculateAndSaveOverlays(e,t){const r=gn();let s=new ve((l,u)=>l-u),o=pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(l=>{for(const u of l)u.keys().forEach(h=>{const f=t.get(h);if(f===null)return;let E=r.get(h)||Re.empty();E=u.applyToLocalView(f,E),r.set(h,E);const A=(s.get(u.batchId)||pe()).add(h);s=s.insert(u.batchId,A)})}).next(()=>{const l=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,E=h.value,A=Rl();E.forEach(P=>{if(!o.has(P)){const b=Ol(t.get(P),r.get(P));b!==null&&A.set(P,b),o=o.add(P)}}),l.push(this.documentOverlayCache.saveOverlays(e,f,A))}return R.waitFor(l)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(l){return L.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Jf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{const l=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):R.resolve(ht());let u=-1,h=o;return l.next(f=>R.forEach(f,(E,A)=>(u<A.largestBatchId&&(u=A.largestBatchId),o.get(E)?R.resolve():this.remoteDocumentCache.getEntry(e,E).next(P=>{h=h.insert(E,P)}))).next(()=>this.populateOverlays(e,f,o)).next(()=>this.computeViews(e,h,f,pe())).next(E=>({batchId:u,changes:Al(E)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let s=or();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let l=or();return this.indexManager.getCollectionParents(e,o).next(u=>R.forEach(u,h=>{const f=function(A,P){return new Fr(P,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next(E=>{E.forEach((A,P)=>{l=l.insert(A,P)})})}).next(()=>l))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(l=>{o.forEach((h,f)=>{const E=f.getKey();l.get(E)===null&&(l=l.insert(E,we.newInvalidDocument(E)))});let u=or();return l.forEach((h,f)=>{const E=o.get(h);E!==void 0&&mn(E.mutation,f,Re.empty(),re.now()),ns(t,f)&&(u=u.insert(h,f))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return R.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:kt(s.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:Op(s.bundledQuery),readTime:kt(s.readTime)}}(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(){this.overlays=new ve(L.comparator),this.Ir=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=ht();return R.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.ht(e,t,o)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const s=ht(),o=t.length+1,l=new L(t.child("")),u=this.overlays.getIteratorFrom(l);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return R.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new ve((f,E)=>f-E);const l=this.overlays.getIterator();for(;l.hasNext();){const f=l.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let E=o.get(f.largestBatchId);E===null&&(E=ht(),o=o.insert(f.largestBatchId,E)),E.set(f.getKey(),f)}}const u=ht(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,E)=>u.set(f,E)),!(u.size()>=s)););return R.resolve(u)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const l=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,l)}this.overlays=this.overlays.insert(r.key,new gp(t,r));let o=this.Ir.get(t);o===void 0&&(o=pe(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.Tr=new ge(te.Er),this.dr=new ge(te.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new te(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new te(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new L(new Y([])),r=new te(t,e),s=new te(t,e+1),o=[];return this.dr.forEachInRange([r,s],l=>{this.Vr(l),o.push(l.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new Y([])),r=new te(t,e),s=new te(t,e+1);let o=pe();return this.dr.forEachInRange([r,s],l=>{o=o.add(l.key)}),o}containsKey(e){const t=new te(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class te{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||$(e.wr,t.wr)}static Ar(e,t){return $(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ge(te.Er)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new pp(o,t,r,s);this.mutationQueue.push(l);for(const u of s)this.br=this.br.add(new te(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return R.resolve(l)}lookupMutationBatch(e,t){return R.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),o=s<0?0:s;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new te(t,0),s=new te(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],l=>{const u=this.Dr(l.wr);o.push(u)}),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ge($);return t.forEach(s=>{const o=new te(s,0),l=new te(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,l],u=>{r=r.add(u.wr)})}),R.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const l=new te(new L(o),0);let u=new ge($);return this.br.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.wr)),!0)},l),R.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){X(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return R.forEach(t.mutations,s=>{const o=new te(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new te(t,0),s=this.br.firstAfterOrEqual(r);return R.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e){this.Mr=e,this.docs=function(){return new ve(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,l=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():we.newInvalidDocument(t))}getEntries(e,t){let r=Cr();return t.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():we.newInvalidDocument(s))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=Cr();const l=t.path,u=new L(l.child("")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:E}}=h.getNext();if(!l.isPrefixOf(f.path))break;f.path.length>l.length+1||bf(Cf(E),r)<=0||(s.has(E.key)||ns(t,E))&&(o=o.insert(E.key,E.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(e,t,r,s){U()}Or(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new $p(this)}getSize(e){return R.resolve(this.size)}}class $p extends Vp{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e){this.persistence=e,this.Nr=new $t(t=>es(t),ts),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ss,this.targetCount=0,this.kr=xt.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),R.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new xt(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Kn(t),R.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.Nr.forEach((l,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Nr.delete(l),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),R.waitFor(o).next(()=>s)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(l=>{o.push(s.markPotentiallyOrphaned(e,l))}),R.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{constructor(e,t){this.qr={},this.overlays={},this.Qr=new hl(0),this.Kr=!1,this.Kr=!0,this.$r=new Fp,this.referenceDelegate=e(this),this.Ur=new Hp(this),this.indexManager=new Dp,this.remoteDocumentCache=function(s){return new jp(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new kp(t),this.Gr=new xp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Up,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Bp(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new zp(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(e,t){return R.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class zp extends Of{constructor(e){super(),this.currentSequenceNumber=e}}class os{constructor(e){this.persistence=e,this.Jr=new ss,this.Yr=null}static Zr(e){return new os(e)}get Xr(){if(this.Yr)return this.Yr;throw U()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),R.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.Xr,r=>{const s=L.fromPath(r);return this.ei(e,s).next(o=>{o||t.removeEntry(s,W.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return R.or([()=>R.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=pe(),s=pe();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new as(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return eu()?8:Df(me())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.Yi(e,t).next(l=>{o.result=l}).next(()=>{if(!o.result)return this.Zi(e,t,s,r).next(l=>{o.result=l})}).next(()=>{if(o.result)return;const l=new Gp;return this.Xi(e,t,l).next(u=>{if(o.result=u,this.zi)return this.es(e,t,l,u.size)})}).next(()=>o.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(an()<=x.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",ln(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),R.resolve()):(an()<=x.DEBUG&&O("QueryEngine","Query:",ln(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(an()<=x.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",ln(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):R.resolve())}Yi(e,t){if(Xo(t))return R.resolve(null);let r=ft(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ni(t,null,"F"),r=ft(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const l=pe(...o);return this.Ji.getDocuments(e,l).next(u=>this.indexManager.getMinOffset(e,r).next(h=>{const f=this.ts(t,u);return this.ns(t,f,l,h.readTime)?this.Yi(e,Ni(t,null,"F")):this.rs(e,f,t,h)}))})))}Zi(e,t,r,s){return Xo(t)||s.isEqual(W.min())?R.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const l=this.ts(t,o);return this.ns(t,l,r,s)?R.resolve(null):(an()<=x.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ln(t)),this.rs(e,l,t,Sf(s,-1)).next(u=>u))})}ts(e,t){let r=new ge(Zf(e));return t.forEach((s,o)=>{ns(e,o)&&(r=r.add(o))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return an()<=x.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",ln(t)),this.Ji.getDocumentsMatchingQuery(e,t,nt.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(l=>{o=o.insert(l.key,l)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new ve($),this._s=new $t(o=>es(o),ts),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Lp(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Qp(n,e,t,r){return new Wp(n,e,t,r)}async function Ll(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const l=[],u=[];let h=pe();for(const f of s){l.push(f.batchId);for(const E of f.mutations)h=h.add(E.key)}for(const f of o){u.push(f.batchId);for(const E of f.mutations)h=h.add(E.key)}return t.localDocuments.getDocuments(r,h).next(f=>({hs:f,removedBatchIds:l,addedBatchIds:u}))})})}function Xp(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(u,h,f,E){const A=f.batch,P=A.keys();let b=R.resolve();return P.forEach(k=>{b=b.next(()=>E.getEntry(h,k)).next(M=>{const D=f.docVersions.get(k);X(D!==null),M.version.compareTo(D)<0&&(A.applyToRemoteDocument(M,f),M.isValidDocument()&&(M.setReadTime(f.commitVersion),E.addEntry(M)))})}),b.next(()=>u.mutationQueue.removeMutationBatch(h,A))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=pe();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Jp(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Yp(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}class na{constructor(){this.activeTargetIds=sp()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Zp{constructor(){this.so=new na,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new na,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ar=null;function Ei(){return ar===null?ar=function(){return 268435456+Math.round(2147483648*Math.random())}():ar++,"0x"+ar.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de="WebChannelConnection";class rg extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(t,r,s,o,l){const u=Ei(),h=this.xo(t,r.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${u}:`,h,s);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,l),this.No(t,h,f,s).then(E=>(O("RestConnection",`Received RPC '${t}' ${u}: `,E),E),E=>{throw Tr("RestConnection",`RPC '${t}' ${u} failed with error: `,E,"url: ",h,"request:",s),E})}Lo(t,r,s,o,l,u){return this.Mo(t,r,s,o,l)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+jt}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,l)=>t[l]=o),s&&s.headers.forEach((o,l)=>t[l]=o)}xo(t,r){const s=tg[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const o=Ei();return new Promise((l,u)=>{const h=new rl;h.setWithCredentials(!0),h.listenOnce(il.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case dr.NO_ERROR:const E=h.getResponseJson();O(de,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(E)),l(E);break;case dr.TIMEOUT:O(de,`RPC '${e}' ${o} timed out`),u(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case dr.HTTP_ERROR:const A=h.getStatus();if(O(de,`RPC '${e}' ${o} failed with status:`,A,"response text:",h.getResponseText()),A>0){let P=h.getResponseJson();Array.isArray(P)&&(P=P[0]);const b=P==null?void 0:P.error;if(b&&b.status&&b.message){const k=function(D){const z=D.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(z)>=0?z:S.UNKNOWN}(b.status);u(new V(k,b.message))}else u(new V(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new V(S.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{O(de,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);O(de,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,r,15)})}Bo(e,t,r){const s=Ei(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],l=al(),u=ol(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const E=o.join("");O(de,`Creating RPC '${e}' stream ${s}: ${E}`,h);const A=l.createWebChannel(E,h);let P=!1,b=!1;const k=new ng({Io:D=>{b?O(de,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(P||(O(de,`Opening RPC '${e}' stream ${s} transport.`),A.open(),P=!0),O(de,`RPC '${e}' stream ${s} sending:`,D),A.send(D))},To:()=>A.close()}),M=(D,z,H)=>{D.listen(z,G=>{try{H(G)}catch(Z){setTimeout(()=>{throw Z},0)}})};return M(A,hn.EventType.OPEN,()=>{b||(O(de,`RPC '${e}' stream ${s} transport opened.`),k.yo())}),M(A,hn.EventType.CLOSE,()=>{b||(b=!0,O(de,`RPC '${e}' stream ${s} transport closed`),k.So())}),M(A,hn.EventType.ERROR,D=>{b||(b=!0,Tr(de,`RPC '${e}' stream ${s} transport errored:`,D),k.So(new V(S.UNAVAILABLE,"The operation could not be completed")))}),M(A,hn.EventType.MESSAGE,D=>{var z;if(!b){const H=D.data[0];X(!!H);const G=H,Z=G.error||((z=G[0])===null||z===void 0?void 0:z.error);if(Z){O(de,`RPC '${e}' stream ${s} received error:`,Z);const Se=Z.status;let ee=function(m){const _=J[m];if(_!==void 0)return _p(_)}(Se),v=Z.message;ee===void 0&&(ee=S.INTERNAL,v="Unknown error status: "+Se+" with message "+Z.message),b=!0,k.So(new V(ee,v)),A.close()}else O(de,`RPC '${e}' stream ${s} received:`,H),k.bo(H)}}),M(u,sl.STAT_EVENT,D=>{D.stat===bi.PROXY?O(de,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===bi.NOPROXY&&O(de,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function Ii(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(n){return new yp(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e,t,r,s,o,l,u,h){this.ui=e,this.Ho=r,this.Jo=s,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new xl(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(_t(t.toString()),_t("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new V(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sg extends ig{constructor(e,t,r,s,o,l){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,l),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return X(!!e.streamToken),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){X(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Pp(e.writeResults,e.commitTime),r=kt(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=wp(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Rp(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Mo(e,Mi(t,r),s,o,l)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(S.UNKNOWN,o.toString())})}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([l,u])=>this.connection.Lo(e,Mi(t,r),s,l,u,o)).catch(l=>{throw l.name==="FirebaseError"?(l.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new V(S.UNKNOWN,l.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ag{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(_t(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(l=>{r.enqueueAndForget(async()=>{Ln(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=q(h);f.L_.add(4),await Mn(f),f.q_.set("Unknown"),f.L_.delete(4),await Hr(f)}(this))})}),this.q_=new ag(r,s)}}async function Hr(n){if(Ln(n))for(const e of n.B_)await e(!0)}async function Mn(n){for(const e of n.B_)await e(!1)}function Ln(n){return q(n).L_.size===0}async function Ul(n,e,t){if(!Ur(e))throw e;n.L_.add(1),await Mn(n),n.q_.set("Offline"),t||(t=()=>Jp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Hr(n)})}function Fl(n,e){return e().catch(t=>Ul(n,t,e))}async function qr(n){const e=q(n),t=it(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;cg(e);)try{const s=await Yp(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,ug(e,s)}catch(s){await Ul(e,s)}Bl(e)&&jl(e)}function cg(n){return Ln(n)&&n.O_.length<10}function ug(n,e){n.O_.push(e);const t=it(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Bl(n){return Ln(n)&&!it(n).n_()&&n.O_.length>0}function jl(n){it(n).start()}async function hg(n){it(n).p_()}async function dg(n){const e=it(n);for(const t of n.O_)e.m_(t.mutations)}async function fg(n,e,t){const r=n.O_.shift(),s=is.from(r,e,t);await Fl(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await qr(n)}async function pg(n,e){e&&it(n).V_&&await async function(r,s){if(function(l){return mp(l)&&l!==S.ABORTED}(s.code)){const o=r.O_.shift();it(r).s_(),await Fl(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await qr(r)}}(n,e),Bl(n)&&jl(n)}async function ia(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const r=Ln(t);t.L_.add(3),await Mn(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Hr(t)}async function gg(n,e){const t=q(n);e?(t.L_.delete(2),await Hr(t)):e||(t.L_.add(2),await Mn(t),t.q_.set("Unknown"))}function it(n){return n.U_||(n.U_=function(t,r,s){const o=q(t);return o.w_(),new sg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:hg.bind(null,n),mo:pg.bind(null,n),f_:dg.bind(null,n),g_:fg.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await qr(n)):(await n.U_.stop(),n.O_.length>0&&(O("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new dt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const l=Date.now()+r,u=new ls(e,t,l,s,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function $l(n,e){if(_t("AsyncQueue",`${e}: ${n}`),Ur(n))return new V(S.UNAVAILABLE,`${e}: ${n}`);throw n}class mg{constructor(){this.queries=sa(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=q(t),o=s.queries;s.queries=sa(),o.forEach((l,u)=>{for(const h of u.j_)h.onError(r)})})(this,new V(S.ABORTED,"Firestore shutting down"))}}function sa(){return new $t(n=>Tl(n),Il)}function _g(n){n.Y_.forEach(e=>{e.next()})}var oa,aa;(aa=oa||(oa={})).ea="default",aa.Cache="cache";class yg{constructor(e,t,r,s,o,l){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Ca={},this.Fa=new $t(u=>Tl(u),Il),this.Ma=new Map,this.xa=new Set,this.Oa=new ve(L.comparator),this.Na=new Map,this.La=new ss,this.Ba={},this.ka=new Map,this.qa=xt.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function vg(n,e,t){const r=wg(n);try{const s=await function(l,u){const h=q(l),f=re.now(),E=u.reduce((b,k)=>b.add(k.key),pe());let A,P;return h.persistence.runTransaction("Locally write mutations","readwrite",b=>{let k=Cr(),M=pe();return h.cs.getEntries(b,E).next(D=>{k=D,k.forEach((z,H)=>{H.isValidDocument()||(M=M.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(b,k)).next(D=>{A=D;const z=[];for(const H of u){const G=dp(H,A.get(H.key).overlayedDocument);G!=null&&z.push(new Et(H.key,G,pl(G.value.mapValue),Fe.exists(!0)))}return h.mutationQueue.addMutationBatch(b,f,z,u)}).next(D=>{P=D;const z=D.applyToLocalDocumentSet(A,M);return h.documentOverlayCache.saveOverlays(b,D.batchId,z)})}).then(()=>({batchId:P.batchId,changes:Al(A)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(l,u,h){let f=l.Ba[l.currentUser.toKey()];f||(f=new ve($)),f=f.insert(u,h),l.Ba[l.currentUser.toKey()]=f}(r,s.batchId,t),await zr(r,s.changes),await qr(r.remoteStore)}catch(s){const o=$l(s,"Failed to persist write");t.reject(o)}}function la(n,e,t){const r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((o,l)=>{const u=l.view.Z_(e);u.snapshot&&s.push(u.snapshot)}),function(l,u){const h=q(l);h.onlineState=u;let f=!1;h.queries.forEach((E,A)=>{for(const P of A.j_)P.Z_(u)&&(f=!0)}),f&&_g(h)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Eg(n,e){const t=q(n),r=e.batch.batchId;try{const s=await Xp(t.localStore,e);ql(t,r,null),Hl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await zr(t,s)}catch(s){await ul(s)}}async function Ig(n,e,t){const r=q(n);try{const s=await function(l,u){const h=q(l);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let E;return h.mutationQueue.lookupMutationBatch(f,u).next(A=>(X(A!==null),E=A.keys(),h.mutationQueue.removeMutationBatch(f,A))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,E,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,E)).next(()=>h.localDocuments.getDocuments(f,E))})}(r.localStore,e);ql(r,e,t),Hl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await zr(r,s)}catch(s){await ul(s)}}function Hl(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function ql(n,e,t){const r=q(n);let s=r.Ba[r.currentUser.toKey()];if(s){const o=s.get(e);o&&(t?o.reject(t):o.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}async function zr(n,e,t){const r=q(n),s=[],o=[],l=[];r.Fa.isEmpty()||(r.Fa.forEach((u,h)=>{l.push(r.Ka(h,e,t).then(f=>{var E;if((f||t)&&r.isPrimaryClient){const A=f?!f.fromCache:(E=void 0)===null||E===void 0?void 0:E.current;r.sharedClientState.updateQueryState(h.targetId,A?"current":"not-current")}if(f){s.push(f);const A=as.Wi(h.targetId,f);o.push(A)}}))}),await Promise.all(l),r.Ca.d_(s),await async function(h,f){const E=q(h);try{await E.persistence.runTransaction("notifyLocalViewChanges","readwrite",A=>R.forEach(f,P=>R.forEach(P.$i,b=>E.persistence.referenceDelegate.addReference(A,P.targetId,b)).next(()=>R.forEach(P.Ui,b=>E.persistence.referenceDelegate.removeReference(A,P.targetId,b)))))}catch(A){if(!Ur(A))throw A;O("LocalStore","Failed to update sequence numbers: "+A)}for(const A of f){const P=A.targetId;if(!A.fromCache){const b=E.os.get(P),k=b.snapshotVersion,M=b.withLastLimboFreeSnapshotVersion(k);E.os=E.os.insert(P,M)}}}(r.localStore,o))}async function Tg(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const r=await Ll(t.localStore,e);t.currentUser=e,function(o,l){o.ka.forEach(u=>{u.forEach(h=>{h.reject(new V(S.CANCELLED,l))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await zr(t,r.hs)}}function wg(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Eg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Ig.bind(null,e),e}class Or{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$r(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Qp(this.persistence,new Kp,e.initialUser,this.serializer)}Ga(e){return new qp(os.Zr,this.serializer)}Wa(e){return new Zp}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Or.provider={build:()=>new Or};class xi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>la(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Tg.bind(null,this.syncEngine),await gg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new mg}()}createDatastore(e){const t=$r(e.databaseInfo.databaseId),r=function(o){return new rg(o)}(e.databaseInfo);return function(o,l,u,h){return new og(o,l,u,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,l,u){return new lg(r,s,o,l,u)}(this.localStore,this.datastore,e.asyncQueue,t=>la(this.syncEngine,t,0),function(){return ra.D()?new ra:new eg}())}createSyncEngine(e,t){return function(s,o,l,u,h,f,E){const A=new yg(s,o,l,u,h,f);return E&&(A.Qa=!0),A}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const o=q(s);O("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Mn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}xi.provider={build:()=>new xi};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=fe.UNAUTHENTICATED,this.clientId=cl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async l=>{O("FirestoreClient","Received user=",l.uid),await this.authCredentialListener(l),this.user=l}),this.appCheckCredentials.start(r,l=>(O("FirestoreClient","Received new app check token=",l),this.appCheckCredentialListener(l,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new dt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=$l(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Ti(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ll(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function ca(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Rg(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>ia(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>ia(e.remoteStore,s)),n._onlineComponents=e}async function Rg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ti(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Tr("Error using user provided cache. Falling back to memory cache: "+t),await Ti(n,new Or)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await Ti(n,new Or);return n._offlineComponents}async function Pg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await ca(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await ca(n,new xi))),n._onlineComponents}function Sg(n){return Pg(n).then(e=>e.syncEngine)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(n,e,t){if(!t)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function bg(n,e,t,r){if(e===!0&&r===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ha(n){if(!L.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function cs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Ui(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=cs(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}bg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zl((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class us{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new da({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new da(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new yf;switch(r.type){case"firstParty":return new Tf(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ua.get(t);r&&(O("ComponentProvider","Removing Datastore"),ua.delete(t),r.terminate())}(this),Promise.resolve()}}function kg(n,e,t,r={}){var s;const o=(n=Ui(n,us))._getSettings(),l=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==l&&Tr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:l,ssl:!1})),r.mockUserToken){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=fe.MOCK_USER;else{u=Kc(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new fe(f)}n._authCredentials=new vf(new ll(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new hs(this.firestore,e,this._query)}}class Be{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Be(this.firestore,e,this._key)}}class Pn extends hs{constructor(e,t,r){super(e,t,Xf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Be(this.firestore,null,new L(e))}withConverter(e){return new Pn(this.firestore,e,this._path)}}function Zg(n,e,...t){if(n=Ie(n),arguments.length===1&&(e=cl.newId()),Cg("doc","path",e),n instanceof us){const r=Y.fromString(e,...t);return ha(r),new Be(n,null,new L(r))}{if(!(n instanceof Be||n instanceof Pn))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return ha(r),new Be(n.firestore,n instanceof Pn?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new xl(this,"async_queue_retry"),this.Vu=()=>{const r=Ii();r&&O("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=Ii();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ii();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new dt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ur(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(l){let u=l.message||"";return l.stack&&(u=l.stack.includes(l.message)?l.stack:l.message+`
`+l.stack),u}(r);throw _t("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=ls.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&U()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Gl extends us{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new fa,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fa(e),this._firestoreClient=void 0,await e}}}function em(n,e){const t=typeof n=="object"?n:Ea(),r=typeof n=="string"?n:"(default)",s=ji(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=zc("firestore");o&&kg(s,...o)}return s}function Og(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Dg(n),n._firestoreClient}function Dg(n){var e,t,r;const s=n._freezeSettings(),o=function(u,h,f,E){return new Lf(u,h,f,E.host,E.ssl,E.experimentalForceLongPolling,E.experimentalAutoDetectLongPolling,zl(E.experimentalLongPollingOptions),E.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Ag(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Sn(ke.fromBase64String(e))}catch(t){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Sn(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=/^__.*__$/;class Vg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Et(e,this.data,this.fieldMask,t,this.fieldTransforms):new Vn(e,this.data,t,this.fieldTransforms)}}function Jl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}class ds{constructor(e,t,r,s,o,l){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ds(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Dr(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Jl(this.Cu)&&Ng.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Mg{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||$r(e)}Qu(e,t,r,s=!1){return new ds({Cu:e,methodName:t,qu:r,path:ae.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Lg(n){const e=n._freezeSettings(),t=$r(n._databaseId);return new Mg(n._databaseId,!!e.ignoreUndefinedProperties,t)}function xg(n,e,t,r,s,o={}){const l=n.Qu(o.merge||o.mergeFields?2:0,e,t,s);tc("Data must be an object, but it was:",l,r);const u=Zl(r,l);let h,f;if(o.merge)h=new Re(l.fieldMask),f=l.fieldTransforms;else if(o.mergeFields){const E=[];for(const A of o.mergeFields){const P=Ug(e,A,t);if(!l.contains(P))throw new V(S.INVALID_ARGUMENT,`Field '${P}' is specified in your field mask but missing from your input data.`);jg(E,P)||E.push(P)}h=new Re(E),f=l.fieldTransforms.filter(A=>h.covers(A.field))}else h=null,f=l.fieldTransforms;return new Vg(new Ae(u),h,f)}function Yl(n,e){if(ec(n=Ie(n)))return tc("Unsupported field value:",e,n),Zl(n,e);if(n instanceof Wl)return function(r,s){if(!Jl(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const o=[];let l=0;for(const u of r){let h=Yl(u,s.Lu(l));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),l++}return{arrayValue:{values:o}}}(n,e)}return function(r,s){if((r=Ie(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return op(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=re.fromDate(r);return{timestampValue:Vi(s.serializer,o)}}if(r instanceof re){const o=new re(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Vi(s.serializer,o)}}if(r instanceof Ql)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Sn)return{bytesValue:vp(s.serializer,r._byteString)};if(r instanceof Be){const o=s.databaseId,l=r.firestore._databaseId;if(!l.isEqual(o))throw s.Bu(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Vl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Xl)return function(l,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:l.toArray().map(h=>{if(typeof h!="number")throw u.Bu("VectorValues must only contain numeric values.");return rs(u.serializer,h)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${cs(r)}`)}(n,e)}function Zl(n,e){const t={};return dl(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Nn(n,(r,s)=>{const o=Yl(s,e.Mu(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function ec(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof re||n instanceof Ql||n instanceof Sn||n instanceof Be||n instanceof Wl||n instanceof Xl)}function tc(n,e,t){if(!ec(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=cs(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Ug(n,e,t){if((e=Ie(e))instanceof Kl)return e._internalPath;if(typeof e=="string")return Bg(n,e);throw Dr("Field path arguments must be of type string or ",n,!1,void 0,t)}const Fg=new RegExp("[~\\*/\\[\\]]");function Bg(n,e,t){if(e.search(Fg)>=0)throw Dr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Kl(...e.split("."))._internalPath}catch{throw Dr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Dr(n,e,t,r,s){const o=r&&!r.isEmpty(),l=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||l)&&(h+=" (found",o&&(h+=` in field ${r}`),l&&(h+=` in document ${s}`),h+=")"),new V(S.INVALID_ARGUMENT,u+n+h)}function jg(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}function tm(n,e,t){n=Ui(n,Be);const r=Ui(n.firestore,Gl),s=$g(n.converter,e,t);return Hg(r,[xg(Lg(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Fe.none())])}function Hg(n,e){return function(r,s){const o=new dt;return r.asyncQueue.enqueueAndForget(async()=>vg(await Sg(r),s,o)),o.promise}(Og(n),e)}(function(e,t=!0){(function(s){jt=s})(Ut),Ot(new pt("firestore",(r,{instanceIdentifier:s,options:o})=>{const l=r.getProvider("app").getImmediate(),u=new Gl(new Ef(r.getProvider("auth-internal")),new Af(r.getProvider("app-check-internal")),function(f,E){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Rr(f.options.projectId,E)}(l,s),l);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),et($o,"4.7.3",e),et($o,"4.7.3","esm2017")})();export{Ea as a,Qg as b,em as c,Zg as d,Wg as e,Gg as f,zg as g,Ju as i,Kg as o,tm as s};
