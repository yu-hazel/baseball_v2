if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/browser-CpMLf2gf.js",revision:null},{url:"assets/index-BAVZs57u.js",revision:null},{url:"assets/index-Bhk6XCEP.css",revision:null},{url:"index.html",revision:"2dd18b5e07ae646da3aafe9a54c52440"},{url:"registerSW.js",revision:"a5b7c4df54dc396ce34bd7b92269efaf"},{url:"manifest.webmanifest",revision:"70c2477f15a547ad00b9d2a1ac11af47"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
