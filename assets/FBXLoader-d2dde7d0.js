import{O as qe,s as ue,F as V,h as Ze,e as Q,U as Pe,c as I,t as z,H as W,N as Se,C as vt,u as P,v as mt,D as Be,R as yt,M as S,V as F,A as wt,w as Le,x as Tt,y as xt,z as St,J as Mt,K as Ct,Q as Et,X as bt,Y as Pt,Z as _t,_ as At,$ as It,a0 as $e,a1 as Je,a2 as et,a3 as Rt,a4 as re,a5 as Dt,g as fe,a6 as Ft,a7 as Me,a8 as Ot,a9 as kt,T as Bt,aa as Ue,ab as Ne,l as ze,ac as ve,ad as Lt,j as le,ae as Ut,G as Ve,af as Ge,ag as he,ah as me,o as je,i as B,ai as Nt,aj as zt,ak as Vt,al as Gt,am as jt,an as Xt,ao as Ht,ap as Wt,E as G,aq as Qt,ar as Yt,as as Kt}from"./three.module-a5b5a39f.js";import{O as qt}from"./OrbitControls-390d9049.js";var Y=Object.freeze({Linear:Object.freeze({None:function(s){return s},In:function(s){return this.None(s)},Out:function(s){return this.None(s)},InOut:function(s){return this.None(s)}}),Quadratic:Object.freeze({In:function(s){return s*s},Out:function(s){return s*(2-s)},InOut:function(s){return(s*=2)<1?.5*s*s:-.5*(--s*(s-2)-1)}}),Cubic:Object.freeze({In:function(s){return s*s*s},Out:function(s){return--s*s*s+1},InOut:function(s){return(s*=2)<1?.5*s*s*s:.5*((s-=2)*s*s+2)}}),Quartic:Object.freeze({In:function(s){return s*s*s*s},Out:function(s){return 1- --s*s*s*s},InOut:function(s){return(s*=2)<1?.5*s*s*s*s:-.5*((s-=2)*s*s*s-2)}}),Quintic:Object.freeze({In:function(s){return s*s*s*s*s},Out:function(s){return--s*s*s*s*s+1},InOut:function(s){return(s*=2)<1?.5*s*s*s*s*s:.5*((s-=2)*s*s*s*s+2)}}),Sinusoidal:Object.freeze({In:function(s){return 1-Math.sin((1-s)*Math.PI/2)},Out:function(s){return Math.sin(s*Math.PI/2)},InOut:function(s){return .5*(1-Math.sin(Math.PI*(.5-s)))}}),Exponential:Object.freeze({In:function(s){return s===0?0:Math.pow(1024,s-1)},Out:function(s){return s===1?1:1-Math.pow(2,-10*s)},InOut:function(s){return s===0?0:s===1?1:(s*=2)<1?.5*Math.pow(1024,s-1):.5*(-Math.pow(2,-10*(s-1))+2)}}),Circular:Object.freeze({In:function(s){return 1-Math.sqrt(1-s*s)},Out:function(s){return Math.sqrt(1- --s*s)},InOut:function(s){return(s*=2)<1?-.5*(Math.sqrt(1-s*s)-1):.5*(Math.sqrt(1-(s-=2)*s)+1)}}),Elastic:Object.freeze({In:function(s){return s===0?0:s===1?1:-Math.pow(2,10*(s-1))*Math.sin((s-1.1)*5*Math.PI)},Out:function(s){return s===0?0:s===1?1:Math.pow(2,-10*s)*Math.sin((s-.1)*5*Math.PI)+1},InOut:function(s){return s===0?0:s===1?1:(s*=2,s<1?-.5*Math.pow(2,10*(s-1))*Math.sin((s-1.1)*5*Math.PI):.5*Math.pow(2,-10*(s-1))*Math.sin((s-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(s){var e=1.70158;return s===1?1:s*s*((e+1)*s-e)},Out:function(s){var e=1.70158;return s===0?0:--s*s*((e+1)*s+e)+1},InOut:function(s){var e=2.5949095;return(s*=2)<1?.5*(s*s*((e+1)*s-e)):.5*((s-=2)*s*((e+1)*s+e)+2)}}),Bounce:Object.freeze({In:function(s){return 1-Y.Bounce.Out(1-s)},Out:function(s){return s<1/2.75?7.5625*s*s:s<2/2.75?7.5625*(s-=1.5/2.75)*s+.75:s<2.5/2.75?7.5625*(s-=2.25/2.75)*s+.9375:7.5625*(s-=2.625/2.75)*s+.984375},InOut:function(s){return s<.5?Y.Bounce.In(s*2)*.5:Y.Bounce.Out(s*2-1)*.5+.5}}),generatePow:function(s){return s===void 0&&(s=4),s=s<Number.EPSILON?Number.EPSILON:s,s=s>1e4?1e4:s,{In:function(e){return Math.pow(e,s)},Out:function(e){return 1-Math.pow(1-e,s)},InOut:function(e){return e<.5?Math.pow(e*2,s)/2:(1-Math.pow(2-e*2,s))/2+.5}}}}),ne=function(){return performance.now()},Zt=function(){function s(){this._tweens={},this._tweensAddedDuringUpdate={}}return s.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},s.prototype.removeAll=function(){this._tweens={}},s.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},s.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},s.prototype.update=function(e,t){e===void 0&&(e=ne()),t===void 0&&(t=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<i.length;r++){var n=this._tweens[i[r]],a=!t;n&&n.update(e,a)===!1&&!t&&delete this._tweens[i[r]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},s}(),J={Linear:function(s,e){var t=s.length-1,i=t*e,r=Math.floor(i),n=J.Utils.Linear;return e<0?n(s[0],s[1],i):e>1?n(s[t],s[t-1],t-i):n(s[r],s[r+1>t?t:r+1],i-r)},Bezier:function(s,e){for(var t=0,i=s.length-1,r=Math.pow,n=J.Utils.Bernstein,a=0;a<=i;a++)t+=r(1-e,i-a)*r(e,a)*s[a]*n(i,a);return t},CatmullRom:function(s,e){var t=s.length-1,i=t*e,r=Math.floor(i),n=J.Utils.CatmullRom;return s[0]===s[t]?(e<0&&(r=Math.floor(i=t*(1+e))),n(s[(r-1+t)%t],s[r],s[(r+1)%t],s[(r+2)%t],i-r)):e<0?s[0]-(n(s[0],s[0],s[1],s[1],-i)-s[0]):e>1?s[t]-(n(s[t],s[t],s[t-1],s[t-1],i-t)-s[t]):n(s[r?r-1:0],s[r],s[t<r+1?t:r+1],s[t<r+2?t:r+2],i-r)},Utils:{Linear:function(s,e,t){return(e-s)*t+s},Bernstein:function(s,e){var t=J.Utils.Factorial;return t(s)/t(e)/t(s-e)},Factorial:function(){var s=[1];return function(e){var t=1;if(s[e])return s[e];for(var i=e;i>1;i--)t*=i;return s[e]=t,t}}(),CatmullRom:function(s,e,t,i,r){var n=(t-s)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*t+n+a)*l+(-3*e+3*t-2*n-a)*o+n*r+e}}},$t=function(){function s(){}return s.nextId=function(){return s._nextId++},s._nextId=0,s}(),Ce=new Zt,Xe=function(){function s(e,t){t===void 0&&(t=Ce),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Y.Linear.None,this._interpolationFunction=J.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=$t.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return s.prototype.getId=function(){return this._id},s.prototype.isPlaying=function(){return this._isPlaying},s.prototype.isPaused=function(){return this._isPaused},s.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t,this},s.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e,this},s.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},s.prototype.start=function(e,t){if(e===void 0&&(e=ne()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var n in this._valuesEnd)r[n]=this._valuesEnd[n];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},s.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},s.prototype._setupProperties=function(e,t,i,r,n){for(var a in i){var o=e[a],l=Array.isArray(o),u=l?"array":typeof o,h=!l&&Array.isArray(i[a]);if(!(u==="undefined"||u==="function")){if(h){var c=i[a];if(c.length===0)continue;for(var f=[o],p=0,d=c.length;p<d;p+=1){var g=this._handleRelativeValue(o,c[p]);if(isNaN(g)){h=!1,console.warn("Found invalid interpolation list. Skipping.");break}f.push(g)}h&&(i[a]=f)}if((u==="object"||l)&&o&&!h){t[a]=l?[]:{};var y=o;for(var T in y)t[a][T]=y[T];r[a]=l?[]:{};var c=i[a];if(!this._isDynamic){var w={};for(var T in c)w[T]=c[T];i[a]=c=w}this._setupProperties(y,t[a],c,r[a],n)}else(typeof t[a]>"u"||n)&&(t[a]=o),l||(t[a]*=1),h?r[a]=i[a].slice().reverse():r[a]=t[a]||0}}},s.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},s.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},s.prototype.pause=function(e){return e===void 0&&(e=ne()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},s.prototype.resume=function(e){return e===void 0&&(e=ne()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},s.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},s.prototype.group=function(e){return e===void 0&&(e=Ce),this._group=e,this},s.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},s.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},s.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},s.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},s.prototype.easing=function(e){return e===void 0&&(e=Y.Linear.None),this._easingFunction=e,this},s.prototype.interpolation=function(e){return e===void 0&&(e=J.Linear),this._interpolationFunction=e,this},s.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},s.prototype.onStart=function(e){return this._onStartCallback=e,this},s.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},s.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},s.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},s.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},s.prototype.onStop=function(e){return this._onStopCallback=e,this},s.prototype.update=function(e,t){if(e===void 0&&(e=ne()),t===void 0&&(t=!0),this._isPaused)return!0;var i,r,n=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>n)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0),r=(e-this._startTime)/this._duration,r=this._duration===0||r>1?1:r;var a=this._easingFunction(r);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,a),this._onUpdateCallback&&this._onUpdateCallback(this._object,r),r===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(i in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[i]=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,l=this._chainedTweens.length;o<l;o++)this._chainedTweens[o].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},s.prototype._updateProperties=function(e,t,i,r){for(var n in i)if(t[n]!==void 0){var a=t[n]||0,o=i[n],l=Array.isArray(e[n]),u=Array.isArray(o),h=!l&&u;h?e[n]=this._interpolationFunction(o,r):typeof o=="object"&&o?this._updateProperties(e[n],a,o,r):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[n]=a+(o-a)*r))}},s.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},s.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},s}(),L=Ce;L.getAll.bind(L);L.removeAll.bind(L);L.add.bind(L);L.remove.bind(L);var Jt=L.update.bind(L);const tt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ee{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ei=new qe(-1,1,1,-1,0,1),_e=new ue;_e.setAttribute("position",new V([-1,3,0,-1,-1,0,3,-1,0],3));_e.setAttribute("uv",new V([0,2,0,0,2,0],2));class Ae{constructor(e){this._mesh=new Ze(_e,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ei)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class it extends ee{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Q?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Pe.clone(e.uniforms),this.material=new Q({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ae(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class He extends ee{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),n.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),n.buffers.stencil.setClear(o),n.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(r.EQUAL,1,4294967295),n.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),n.buffers.stencil.setLocked(!0)}}class ti extends ee{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ii{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new I);this._width=i.width,this._height=i.height,t=new z(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:W}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new it(tt),this.copyPass.material.blending=Se,this.clock=new vt}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,n=this.passes.length;r<n;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}He!==void 0&&(a instanceof He?i=!0:a instanceof ti&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new I);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ri extends ee{constructor(e,t,i=null,r=null,n=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new P}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let n,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}class j extends ee{constructor(e,t,i,r){super(),this.renderScene=t,this.renderCamera=i,this.selectedObjects=r!==void 0?r:[],this.visibleEdgeColor=new P(1,1,1),this.hiddenEdgeColor=new P(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this.resolution=e!==void 0?new I(e.x,e.y):new I(256,256);const n=Math.round(this.resolution.x/this.downSampleRatio),a=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new z(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new mt,this.depthMaterial.side=Be,this.depthMaterial.depthPacking=yt,this.depthMaterial.blending=Se,this.prepareMaskMaterial=this.getPrepareMaskMaterial(),this.prepareMaskMaterial.side=Be,this.prepareMaskMaterial.fragmentShader=h(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new z(this.resolution.x,this.resolution.y,{type:W}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new z(n,a,{type:W}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new z(n,a,{type:W}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new z(Math.round(n/2),Math.round(a/2),{type:W}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this.getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new z(n,a,{type:W}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new z(Math.round(n/2),Math.round(a/2),{type:W}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const o=4,l=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(o),this.separableBlurMaterial1.uniforms.texSize.value.set(n,a),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(l),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(n/2),Math.round(a/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=l,this.overlayMaterial=this.getOverlayMaterial();const u=tt;this.copyUniforms=Pe.clone(u.uniforms),this.materialCopy=new Q({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Se,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new P,this.oldClearAlpha=1,this.fsQuad=new Ae(null),this.tempPulseColor1=new P,this.tempPulseColor2=new P,this.textureMatrix=new S;function h(c,f){const p=f.isPerspectiveCamera?"perspective":"orthographic";return c.replace(/DEPTH_TO_VIEW_Z/g,p+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let i=Math.round(e/this.downSampleRatio),r=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,r),this.renderTargetBlurBuffer1.setSize(i,r),this.renderTargetEdgeBuffer1.setSize(i,r),this.separableBlurMaterial1.uniforms.texSize.value.set(i,r),i=Math.round(i/2),r=Math.round(r/2),this.renderTargetBlurBuffer2.setSize(i,r),this.renderTargetEdgeBuffer2.setSize(i,r),this.separableBlurMaterial2.uniforms.texSize.value.set(i,r)}changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;function i(r){r.isMesh&&(e===!0?r.visible=t.get(r):(t.set(r,r.visible),r.visible=e))}for(let r=0;r<this.selectedObjects.length;r++)this.selectedObjects[r].traverse(i)}changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,i=[];function r(a){a.isMesh&&i.push(a)}for(let a=0;a<this.selectedObjects.length;a++)this.selectedObjects[a].traverse(r);function n(a){if(a.isMesh||a.isSprite){let o=!1;for(let l=0;l<i.length;l++)if(i[l].id===a.id){o=!0;break}if(o===!1){const l=a.visible;(e===!1||t.get(a)===!0)&&(a.visible=e),t.set(a,l)}}else(a.isPoints||a.isLine)&&(e===!0?a.visible=t.get(a):(t.set(a,a.visible),a.visible=e))}this.renderScene.traverse(n)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}render(e,t,i,r,n){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,n&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeVisibilityOfSelectedObjects(!1);const o=this.renderScene.background;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this.updateTextureMatrix(),this.changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this.renderScene.background=o,this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const l=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(l),this.tempPulseColor2.multiplyScalar(l)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=j.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=j.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=j.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=j.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,n&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this.fsQuad.render(e))}getPrepareMaskMaterial(){return new Q({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new I(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif
					
					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}getEdgeDetectionMaterial(){return new Q({uniforms:{maskTexture:{value:null},texSize:{value:new I(.5,.5)},visibleEdgeColor:{value:new F(1,1,1)},hiddenEdgeColor:{value:new F(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}getSeperableBlurMaterial(e){return new Q({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new I(.5,.5)},direction:{value:new I(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}getOverlayMaterial(){return new Q({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:wt,depthTest:!1,depthWrite:!1,transparent:!0})}}j.BlurDirectionX=new I(1,0);j.BlurDirectionY=new I(0,1);const ni={uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		`+Le.tonemapping_pars_fragment+Le.colorspace_pars_fragment+`

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class si extends ee{constructor(){super();const e=ni;this.uniforms=Pe.clone(e.uniforms),this.material=new Tt({uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ae(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},xt.getTransfer(this._outputColorSpace)===St&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Mt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ct?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Et?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===bt&&(this.material.defines.ACES_FILMIC_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const ai={uniforms:{tDiffuse:{value:null},resolution:{value:new I(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	precision highp float;

	uniform sampler2D tDiffuse;

	uniform vec2 resolution;

	varying vec2 vUv;

	// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

	//----------------------------------------------------------------------------------
	// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
	// SDK Version: v3.00
	// Email:       gameworks@nvidia.com
	// Site:        http://developer.nvidia.com/
	//
	// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions
	// are met:
	//  * Redistributions of source code must retain the above copyright
	//    notice, this list of conditions and the following disclaimer.
	//  * Redistributions in binary form must reproduce the above copyright
	//    notice, this list of conditions and the following disclaimer in the
	//    documentation and/or other materials provided with the distribution.
	//  * Neither the name of NVIDIA CORPORATION nor the names of its
	//    contributors may be used to endorse or promote products derived
	//    from this software without specific prior written permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
	// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	//----------------------------------------------------------------------------------

	#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
	#endif

	/*--------------------------------------------------------------------------*/
	#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
	#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
	/*--------------------------------------------------------------------------*/

	#define NUM_SAMPLES 5

	// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
	float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
	}

	/*============================================================================

									FXAA3 QUALITY - PC

	============================================================================*/

	/*--------------------------------------------------------------------------*/
	vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
	) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
					if(earlyExit) FxaaDiscard;
			#else
					if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
					// locate the edge
					vec2 dirToEdge;
					dirToEdge.x = contrastE > contrastW ? 1. : -1.;
					dirToEdge.y = contrastS > contrastN ? 1. : -1.;
					// . 2 .      . 1 .
					// 1 0 2  ~=  0 0 1
					// . 1 .      . 0 .

					// tap 2 pixels and see which ones are "outside" the edge, to
					// determine if the edge is vertical or horizontal

					vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongH = contrast( rgbaM, rgbaAlongH );
					// . 1 .
					// 0 0 1
					// . 0 H

					vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongV = contrast( rgbaM, rgbaAlongV );
					// V 1 .
					// 0 0 1
					// . 0 .

					relativeVContrast = matchAlongV - matchAlongH;
					relativeVContrast *= fxaaQualityinvEdgeThreshold;

					if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
							// 1 1 .
							// 0 0 1
							// . 0 1

							// do a simple blur
							return mix(
									rgbaM,
									(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
									.4
							);
					}

					horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
					iterationsUsed = i;

					float increment = float(i + 1);

					if(!doneN) {
							nDist += increment;
							posN = posM + offNP * nDist;
							vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
							doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
							iterationsUsedN = i;
					}

					if(!doneP) {
							pDist += increment;
							posP = posM - offNP * pDist;
							vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
							doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
							iterationsUsedP = i;
					}

					if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
					doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
					doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
					rgbaM,
					rgbaN,
					dist * .5
			);
	}

	void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
					vUv,
					tDiffuse,
					resolution,
					edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
					invEdgeDetectionQuality
			);

	}
	`},oi={type:"update"};class ji extends Pt{constructor(){super(),this.moving=!1,this.pickPosition=new I(0,0),this.raycaster=new _t,this.pickedObject=null,this.scene=new At,this.loadOther(),this.loadCamera(),this.loadRenderer(),this.loadControls(),this.loadOutline(),window.addEventListener("resize",this.onWindowResize.bind(this)),window.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this))}loadOther(){const e=new It(2e4);this.scene.add(e);const t=new $e(16777215);this.scene.add(t)}loadCamera(){const e=new Je(16777215,3);e.position.set(0,0,0),this.camera=new et(45,window.innerWidth/window.innerHeight,1,2e3),this.camera.position.set(0,0,60),this.camera.add(e),this.scene.add(this.camera)}loadRenderer(){this.renderer=new Rt({antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setClearColor(1055529,1),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,document.getElementById("container").appendChild(this.renderer.domElement)}loadControls(){this.controls=new qt(this.camera,this.renderer.domElement),this.controls.minDistance=10,this.controls.maxDistance=80,this.controls.enableDamping=!0,this.controls.autoRotate=!1,this.controls.enablePan=!0,this.controls.addEventListener("end",()=>{console.log(JSON.stringify({radius:this.controls.getDistance(),phi:this.controls.getPolarAngle(),theta:this.controls.getAzimuthalAngle()}),JSON.stringify(this.controls.target))})}loadOutline(){this.composer=new ii(this.renderer);const e=new ri(this.scene,this.camera);e.clearColor=new P(0,0,0),e.clearAlpha=0,this.composer.addPass(e),this.outlinePass=new j(new I(window.innerWidth,window.innerHeight),this.scene,this.camera),this.composer.addPass(this.outlinePass);const t=new si;this.composer.addPass(t),this.effectFXAA=new it(ai),this.effectFXAA.uniforms.resolution.value.set(1/window.innerWidth,1/window.innerHeight),this.effectFXAA.renderToScreen=!0,this.effectFXAA.material.transparent=!0,this.composer.addPass(this.effectFXAA)}focusModel(e){const i=new re().setFromUnitVectors(this.camera.up,new F(0,1,0)).clone().invert(),r=new Dt;r.phi=this.controls.getPolarAngle(),r.theta=this.controls.getAzimuthalAngle(),r.radius=this.camera.position.distanceTo(this.controls.target),new Xe(this.controls.target).to(e.target,1e3).easing(Y.Exponential.Out).start(),new Xe(r).to(e.spherical,1e3).onUpdate(()=>{const n=new F;n.setFromSpherical(r),n.applyQuaternion(i),this.camera.position.copy(this.controls.target).add(n)}).easing(Y.Exponential.Out).start()}getCanvasRelativePosition(e){const t=this.renderer.domElement,i=t.getBoundingClientRect();return{x:(e.clientX-i.left)*t.width/i.width,y:(e.clientY-i.top)*t.height/i.height}}setPickPosition(e){const t=this.getCanvasRelativePosition(e),i=this.renderer.domElement;this.pickPosition.x=t.x/i.width*2-1,this.pickPosition.y=t.y/i.height*-2+1}pick(e,t,i){this.raycaster.setFromCamera(e,i);const r=this.raycaster.intersectObjects(t.children);r.length&&(this.pickedObject=r[0].object,this.outlinePass.selectedObjects=[this.pickedObject])}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer.setSize(window.innerWidth,window.innerHeight),this.effectFXAA.uniforms.resolution.value.set(1/window.innerWidth,1/window.innerHeight)}onMouseDown(){this.moving=!1}onMouseUp(e){this.moving?this.moving=!1:(this.setPickPosition(e),this.pick(this.pickPosition,this.scene,this.camera,.01))}onMouseMove(){this.moving=!0}resizeRendererToDisplaySize(e){const t=e.domElement,i=window.devicePixelRatio,r=t.clientWidth*i|0,n=t.clientHeight*i|0,a=t.width!==r||t.height!==n;return a&&e.setSize(r,n,!1),a}update(){if(requestAnimationFrame(this.update.bind(this)),this.resizeRendererToDisplaySize(this.renderer)){const e=this.renderer.domElement;this.camera.aspect=e.clientWidth/e.clientHeight,this.camera.updateProjectionMatrix()}this.renderer.render(this.scene,this.camera),Jt(),this.controls.update(),this.composer.render(),this.dispatchEvent(oi)}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var We=function(s){return URL.createObjectURL(new Blob([s],{type:"text/javascript"}))};try{URL.revokeObjectURL(We(""))}catch{We=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var D=Uint8Array,X=Uint16Array,Ee=Uint32Array,rt=new D([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),nt=new D([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),li=new D([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),st=function(s,e){for(var t=new X(31),i=0;i<31;++i)t[i]=e+=1<<s[i-1];for(var r=new Ee(t[30]),i=1;i<30;++i)for(var n=t[i];n<t[i+1];++n)r[n]=n-t[i]<<5|i;return[t,r]},at=st(rt,2),ot=at[0],ci=at[1];ot[28]=258,ci[258]=28;var ui=st(nt,0),hi=ui[0],be=new X(32768);for(var x=0;x<32768;++x){var N=(x&43690)>>>1|(x&21845)<<1;N=(N&52428)>>>2|(N&13107)<<2,N=(N&61680)>>>4|(N&3855)<<4,be[x]=((N&65280)>>>8|(N&255)<<8)>>>1}var se=function(s,e,t){for(var i=s.length,r=0,n=new X(e);r<i;++r)++n[s[r]-1];var a=new X(e);for(r=0;r<e;++r)a[r]=a[r-1]+n[r-1]<<1;var o;if(t){o=new X(1<<e);var l=15-e;for(r=0;r<i;++r)if(s[r])for(var u=r<<4|s[r],h=e-s[r],c=a[s[r]-1]++<<h,f=c|(1<<h)-1;c<=f;++c)o[be[c]>>>l]=u}else for(o=new X(i),r=0;r<i;++r)s[r]&&(o[r]=be[a[s[r]-1]++]>>>15-s[r]);return o},ae=new D(288);for(var x=0;x<144;++x)ae[x]=8;for(var x=144;x<256;++x)ae[x]=9;for(var x=256;x<280;++x)ae[x]=7;for(var x=280;x<288;++x)ae[x]=8;var lt=new D(32);for(var x=0;x<32;++x)lt[x]=5;var fi=se(ae,9,1),pi=se(lt,5,1),ye=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},k=function(s,e,t){var i=e/8|0;return(s[i]|s[i+1]<<8)>>(e&7)&t},we=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},di=function(s){return(s/8|0)+(s&7&&1)},gi=function(s,e,t){(e==null||e<0)&&(e=0),(t==null||t>s.length)&&(t=s.length);var i=new(s instanceof X?X:s instanceof Ee?Ee:D)(t-e);return i.set(s.subarray(e,t)),i},vi=function(s,e,t){var i=s.length;if(!i||t&&!t.l&&i<5)return e||new D(0);var r=!e||t,n=!t||t.i;t||(t={}),e||(e=new D(i*3));var a=function(Fe){var Oe=e.length;if(Fe>Oe){var ke=new D(Math.max(Oe*2,Fe));ke.set(e),e=ke}},o=t.f||0,l=t.p||0,u=t.b||0,h=t.l,c=t.d,f=t.m,p=t.n,d=i*8;do{if(!h){t.f=o=k(s,l,1);var g=k(s,l+1,3);if(l+=3,g)if(g==1)h=fi,c=pi,f=9,p=5;else if(g==2){var m=k(s,l,31)+257,E=k(s,l+10,15)+4,O=m+k(s,l+5,31)+1;l+=14;for(var C=new D(O),R=new D(19),b=0;b<E;++b)R[li[b]]=k(s,l+b*3,7);l+=E*3;for(var H=ye(R),_=(1<<H)-1,te=se(R,H,1),b=0;b<O;){var K=te[k(s,l,_)];l+=K&15;var y=K>>>4;if(y<16)C[b++]=y;else{var q=0,oe=0;for(y==16?(oe=3+k(s,l,3),l+=2,q=C[b-1]):y==17?(oe=3+k(s,l,7),l+=3):y==18&&(oe=11+k(s,l,127),l+=7);oe--;)C[b++]=q}}var Ie=C.subarray(0,m),U=C.subarray(m);f=ye(Ie),p=ye(U),h=se(Ie,f,1),c=se(U,p,1)}else throw"invalid block type";else{var y=di(l)+4,T=s[y-4]|s[y-3]<<8,w=y+T;if(w>i){if(n)throw"unexpected EOF";break}r&&a(u+T),e.set(s.subarray(y,w),u),t.b=u+=T,t.p=l=w*8;continue}if(l>d){if(n)throw"unexpected EOF";break}}r&&a(u+131072);for(var dt=(1<<f)-1,gt=(1<<p)-1,pe=l;;pe=l){var q=h[we(s,l)&dt],Z=q>>>4;if(l+=q&15,l>d){if(n)throw"unexpected EOF";break}if(!q)throw"invalid length/literal";if(Z<256)e[u++]=Z;else if(Z==256){pe=l,h=null;break}else{var Re=Z-254;if(Z>264){var b=Z-257,ie=rt[b];Re=k(s,l,(1<<ie)-1)+ot[b],l+=ie}var de=c[we(s,l)&gt],ge=de>>>4;if(!de)throw"invalid distance";l+=de&15;var U=hi[ge];if(ge>3){var ie=nt[ge];U+=we(s,l)&(1<<ie)-1,l+=ie}if(l>d){if(n)throw"unexpected EOF";break}r&&a(u+131072);for(var De=u+Re;u<De;u+=4)e[u]=e[u-U],e[u+1]=e[u+1-U],e[u+2]=e[u+2-U],e[u+3]=e[u+3-U];u=De}}t.l=h,t.p=pe,t.b=u,h&&(o=1,t.m=f,t.d=c,t.n=p)}while(!o);return u==e.length?e:gi(e,0,u)},mi=new D(0),yi=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function wi(s,e){return vi((yi(s),s.subarray(2,-4)),e)}var Ti=typeof TextDecoder<"u"&&new TextDecoder,xi=0;try{Ti.decode(mi,{stream:!0}),xi=1}catch{}function ct(s,e,t){const i=t.length-s-1;if(e>=t[i])return i-1;if(e<=t[s])return s;let r=s,n=i,a=Math.floor((r+n)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?n=a:r=a,a=Math.floor((r+n)/2);return a}function Si(s,e,t,i){const r=[],n=[],a=[];r[0]=1;for(let o=1;o<=t;++o){n[o]=e-i[s+1-o],a[o]=i[s+o]-e;let l=0;for(let u=0;u<o;++u){const h=a[u+1],c=n[o-u],f=r[u]/(h+c);r[u]=l+h*f,l=c*f}r[o]=l}return r}function Mi(s,e,t,i){const r=ct(s,i,e),n=Si(r,i,s,e),a=new fe(0,0,0,0);for(let o=0;o<=s;++o){const l=t[r-s+o],u=n[o],h=l.w*u;a.x+=l.x*h,a.y+=l.y*h,a.z+=l.z*h,a.w+=l.w*u}return a}function Ci(s,e,t,i,r){const n=[];for(let c=0;c<=t;++c)n[c]=0;const a=[];for(let c=0;c<=i;++c)a[c]=n.slice(0);const o=[];for(let c=0;c<=t;++c)o[c]=n.slice(0);o[0][0]=1;const l=n.slice(0),u=n.slice(0);for(let c=1;c<=t;++c){l[c]=e-r[s+1-c],u[c]=r[s+c]-e;let f=0;for(let p=0;p<c;++p){const d=u[p+1],g=l[c-p];o[c][p]=d+g;const y=o[p][c-1]/o[c][p];o[p][c]=f+d*y,f=g*y}o[c][c]=f}for(let c=0;c<=t;++c)a[0][c]=o[c][t];for(let c=0;c<=t;++c){let f=0,p=1;const d=[];for(let g=0;g<=t;++g)d[g]=n.slice(0);d[0][0]=1;for(let g=1;g<=i;++g){let y=0;const T=c-g,w=t-g;c>=g&&(d[p][0]=d[f][0]/o[w+1][T],y=d[p][0]*o[T][w]);const m=T>=-1?1:-T,E=c-1<=w?g-1:t-c;for(let C=m;C<=E;++C)d[p][C]=(d[f][C]-d[f][C-1])/o[w+1][T+C],y+=d[p][C]*o[T+C][w];c<=w&&(d[p][g]=-d[f][g-1]/o[w+1][c],y+=d[p][g]*o[c][w]),a[g][c]=y;const O=f;f=p,p=O}}let h=t;for(let c=1;c<=i;++c){for(let f=0;f<=t;++f)a[c][f]*=h;h*=t-c}return a}function Ei(s,e,t,i,r){const n=r<s?r:s,a=[],o=ct(s,i,e),l=Ci(o,i,s,n,e),u=[];for(let h=0;h<t.length;++h){const c=t[h].clone(),f=c.w;c.x*=f,c.y*=f,c.z*=f,u[h]=c}for(let h=0;h<=n;++h){const c=u[o-s].clone().multiplyScalar(l[h][0]);for(let f=1;f<=s;++f)c.add(u[o-s+f].clone().multiplyScalar(l[h][f]));a[h]=c}for(let h=n+1;h<=r+1;++h)a[h]=new fe(0,0,0);return a}function bi(s,e){let t=1;for(let r=2;r<=s;++r)t*=r;let i=1;for(let r=2;r<=e;++r)i*=r;for(let r=2;r<=s-e;++r)i*=r;return t/i}function Pi(s){const e=s.length,t=[],i=[];for(let n=0;n<e;++n){const a=s[n];t[n]=new F(a.x,a.y,a.z),i[n]=a.w}const r=[];for(let n=0;n<e;++n){const a=t[n].clone();for(let o=1;o<=n;++o)a.sub(r[n-o].clone().multiplyScalar(bi(n,o)*i[o]));r[n]=a.divideScalar(i[0])}return r}function _i(s,e,t,i,r){const n=Ei(s,e,t,i,r);return Pi(n)}class Ai extends Ft{constructor(e,t,i,r,n){super(),this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=n||this.knots.length-1;for(let a=0;a<i.length;++a){const o=i[a];this.controlPoints[a]=new fe(o.x,o.y,o.z,o.w)}}getPoint(e,t=new F){const i=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),n=Mi(this.degree,this.knots,this.controlPoints,r);return n.w!==1&&n.divideScalar(n.w),i.set(n.x,n.y,n.z)}getTangent(e,t=new F){const i=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),n=_i(this.degree,this.knots,this.controlPoints,r,1);return i.copy(n[1]).normalize(),i}}let v,M,A;class Xi extends Me{constructor(e){super(e)}load(e,t,i,r){const n=this,a=n.path===""?Ot.extractUrlBase(e):n.path,o=new kt(this.manager);o.setPath(n.path),o.setResponseType("arraybuffer"),o.setRequestHeader(n.requestHeader),o.setWithCredentials(n.withCredentials),o.load(e,function(l){try{t(n.parse(l,a))}catch(u){r?r(u):console.error(u),n.manager.itemError(e)}},i,r)}parse(e,t){if(ki(e))v=new Oi().parse(e);else{const r=pt(e);if(!Bi(r))throw new Error("THREE.FBXLoader: Unknown format.");if(Ye(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Ye(r));v=new Fi().parse(r)}const i=new Bt(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new Ii(i,this.manager).parse(v)}}class Ii{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){M=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),i=this.parseMaterials(t),r=this.parseDeformers(),n=new Ri().parse(r);return this.parseScene(r,n,i),A}parseConnections(){const e=new Map;return"Connections"in v&&v.Connections.connections.forEach(function(i){const r=i[0],n=i[1],a=i[2];e.has(r)||e.set(r,{parents:[],children:[]});const o={ID:n,relationship:a};e.get(r).parents.push(o),e.has(n)||e.set(n,{parents:[],children:[]});const l={ID:r,relationship:a};e.get(n).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in v.Objects){const i=v.Objects.Video;for(const r in i){const n=i[r],a=parseInt(r);if(e[a]=n.RelativeFilename||n.Filename,"Content"in n){const o=n.Content instanceof ArrayBuffer&&n.Content.byteLength>0,l=typeof n.Content=="string"&&n.Content!=="";if(o||l){const u=this.parseImage(i[r]);t[n.RelativeFilename||n.Filename]=u}}}}for(const i in e){const r=e[i];t[r]!==void 0?e[i]=t[r]:e[i]=e[i].split("\\").pop()}return e}parseImage(e){const t=e.Content,i=e.RelativeFilename||e.Filename,r=i.slice(i.lastIndexOf(".")+1).toLowerCase();let n;switch(r){case"bmp":n="image/bmp";break;case"jpg":case"jpeg":n="image/jpeg";break;case"png":n="image/png";break;case"tif":n="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",i),n="image/tga";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+n+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:n}))}}parseTextures(e){const t=new Map;if("Texture"in v.Objects){const i=v.Objects.Texture;for(const r in i){const n=this.parseTexture(i[r],e);t.set(parseInt(r),n)}}return t}parseTexture(e,t){const i=this.loadTexture(e,t);i.ID=e.id,i.name=e.attrName;const r=e.WrapModeU,n=e.WrapModeV,a=r!==void 0?r.value:0,o=n!==void 0?n.value:0;if(i.wrapS=a===0?Ue:Ne,i.wrapT=o===0?Ue:Ne,"Scaling"in e){const l=e.Scaling.value;i.repeat.x=l[0],i.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;i.offset.x=l[0],i.offset.y=l[1]}return i}loadTexture(e,t){let i;const r=this.textureLoader.path,n=M.get(e.id).children;n!==void 0&&n.length>0&&t[n[0].ID]!==void 0&&(i=t[n[0].ID],(i.indexOf("blob:")===0||i.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let a;const o=e.FileName.slice(-3).toLowerCase();if(o==="tga"){const l=this.manager.getHandler(".tga");l===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",e.RelativeFilename),a=new ze):(l.setPath(this.textureLoader.path),a=l.load(i))}else o==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",e.RelativeFilename),a=new ze):a=this.textureLoader.load(i);return this.textureLoader.setPath(r),a}parseMaterials(e){const t=new Map;if("Material"in v.Objects){const i=v.Objects.Material;for(const r in i){const n=this.parseMaterial(i[r],e);n!==null&&t.set(parseInt(r),n)}}return t}parseMaterial(e,t){const i=e.id,r=e.attrName;let n=e.ShadingModel;if(typeof n=="object"&&(n=n.value),!M.has(i))return null;const a=this.parseParameters(e,t,i);let o;switch(n.toLowerCase()){case"phong":o=new ve;break;case"lambert":o=new Lt;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',n),o=new ve;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,i){const r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=new P().fromArray(e.Diffuse.value).convertSRGBToLinear():e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=new P().fromArray(e.DiffuseColor.value).convertSRGBToLinear()),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=new P().fromArray(e.Emissive.value).convertSRGBToLinear():e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=new P().fromArray(e.EmissiveColor.value).convertSRGBToLinear()),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),e.Opacity&&(r.opacity=parseFloat(e.Opacity.value)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=new P().fromArray(e.Specular.value).convertSRGBToLinear():e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=new P().fromArray(e.SpecularColor.value).convertSRGBToLinear());const n=this;return M.get(i).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":r.bumpMap=n.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=n.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=n.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=le);break;case"DisplacementColor":r.displacementMap=n.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=n.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=le);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=n.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=n.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=Ut,r.envMap.colorSpace=le);break;case"SpecularColor":r.specularMap=n.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=le);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=n.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in v.Objects&&t in v.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=M.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in v.Objects){const i=v.Objects.Deformer;for(const r in i){const n=i[r],a=M.get(parseInt(r));if(n.attrType==="Skin"){const o=this.parseSkeleton(a,i);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(n.attrType==="BlendShape"){const o={id:r};o.rawTargets=this.parseMorphTargets(a,i),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const i=[];return e.children.forEach(function(r){const n=t[r.ID];if(n.attrType!=="Cluster")return;const a={ID:r.ID,indices:[],weights:[],transformLink:new S().fromArray(n.TransformLink.a)};"Indexes"in n&&(a.indices=n.Indexes.a,a.weights=n.Weights.a),i.push(a)}),{rawBones:i,bones:[]}}parseMorphTargets(e,t){const i=[];for(let r=0;r<e.children.length;r++){const n=e.children[r],a=t[n.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=M.get(parseInt(n.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,i.push(o)}return i}parseScene(e,t,i){A=new Ve;const r=this.parseModels(e.skeletons,t,i),n=v.Objects.Model,a=this;r.forEach(function(l){const u=n[l.ID];a.setLookAtProperties(l,u),M.get(l.ID).parents.forEach(function(c){const f=r.get(c.ID);f!==void 0&&f.add(l)}),l.parent===null&&A.add(l)}),this.bindSkeleton(e.skeletons,t,r),this.createAmbientLight(),A.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);const u=ht(l.userData.transformData);l.applyMatrix4(u),l.updateWorldMatrix()}});const o=new Di().parse();A.children.length===1&&A.children[0].isGroup&&(A.children[0].animations=o,A=A.children[0]),A.animations=o}parseModels(e,t,i){const r=new Map,n=v.Objects.Model;for(const a in n){const o=parseInt(a),l=n[a],u=M.get(o);let h=this.buildSkeleton(u,e,o,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(u);break;case"Light":h=this.createLight(u);break;case"Mesh":h=this.createMesh(u,t,i);break;case"NurbsCurve":h=this.createCurve(u,t);break;case"LimbNode":case"Root":h=new Ge;break;case"Null":default:h=new Ve;break}h.name=l.attrName?he.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=o}this.getTransformData(h,l),r.set(o,h)}return r}buildSkeleton(e,t,i,r){let n=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(u,h){if(u.ID===a.ID){const c=n;n=new Ge,n.matrixWorld.copy(u.transformLink),n.name=r?he.sanitizeNodeName(r):"",n.userData.originalName=r,n.ID=i,l.bones[h]=n,c!==null&&n.add(c)}})}}),n}createCamera(e){let t,i;if(e.children.forEach(function(r){const n=v.Objects.NodeAttribute[r.ID];n!==void 0&&(i=n)}),i===void 0)t=new me;else{let r=0;i.CameraProjectionType!==void 0&&i.CameraProjectionType.value===1&&(r=1);let n=1;i.NearPlane!==void 0&&(n=i.NearPlane.value/1e3);let a=1e3;i.FarPlane!==void 0&&(a=i.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;i.AspectWidth!==void 0&&i.AspectHeight!==void 0&&(o=i.AspectWidth.value,l=i.AspectHeight.value);const u=o/l;let h=45;i.FieldOfView!==void 0&&(h=i.FieldOfView.value);const c=i.FocalLength?i.FocalLength.value:null;switch(r){case 0:t=new et(h,u,n,a),c!==null&&t.setFocalLength(c);break;case 1:t=new qe(-o/2,o/2,l/2,-l/2,n,a);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new me;break}}return t}createLight(e){let t,i;if(e.children.forEach(function(r){const n=v.Objects.NodeAttribute[r.ID];n!==void 0&&(i=n)}),i===void 0)t=new me;else{let r;i.LightType===void 0?r=0:r=i.LightType.value;let n=16777215;i.Color!==void 0&&(n=new P().fromArray(i.Color.value).convertSRGBToLinear());let a=i.Intensity===void 0?1:i.Intensity.value/100;i.CastLightOnObject!==void 0&&i.CastLightOnObject.value===0&&(a=0);let o=0;i.FarAttenuationEnd!==void 0&&(i.EnableFarAttenuation!==void 0&&i.EnableFarAttenuation.value===0?o=0:o=i.FarAttenuationEnd.value);const l=1;switch(r){case 0:t=new je(n,a,o,l);break;case 1:t=new Je(n,a);break;case 2:let u=Math.PI/3;i.InnerAngle!==void 0&&(u=B.degToRad(i.InnerAngle.value));let h=0;i.OuterAngle!==void 0&&(h=B.degToRad(i.OuterAngle.value),h=Math.max(h,1)),t=new Nt(n,a,o,u,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+i.LightType.value+", defaulting to a PointLight."),t=new je(n,a);break}i.CastShadows!==void 0&&i.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,i){let r,n=null,a=null;const o=[];return e.children.forEach(function(l){t.has(l.ID)&&(n=t.get(l.ID)),i.has(l.ID)&&o.push(i.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new ve({name:Me.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in n.attributes&&o.forEach(function(l){l.vertexColors=!0}),n.FBX_Deformer?(r=new zt(n,a),r.normalizeSkinWeights()):r=new Ze(n,a),r}createCurve(e,t){const i=e.children.reduce(function(n,a){return t.has(a.ID)&&(n=t.get(a.ID)),n},null),r=new Vt({name:Me.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Gt(i,r)}getTransformData(e,t){const i={};"InheritType"in t&&(i.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?i.eulerOrder=ft(t.RotationOrder.value):i.eulerOrder="ZYX","Lcl_Translation"in t&&(i.translation=t.Lcl_Translation.value),"PreRotation"in t&&(i.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(i.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(i.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(i.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(i.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(i.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(i.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(i.rotationPivot=t.RotationPivot.value),e.userData.transformData=i}setLookAtProperties(e,t){"LookAtProperty"in t&&M.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){const n=v.Objects.Model[r.ID];if("Lcl_Translation"in n){const a=n.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),A.add(e.target)):e.lookAt(new F().fromArray(a))}}})}bindSkeleton(e,t,i){const r=this.parsePoseNodes();for(const n in e){const a=e[n];M.get(parseInt(a.ID)).parents.forEach(function(l){if(t.has(l.ID)){const u=l.ID;M.get(u).parents.forEach(function(c){i.has(c.ID)&&i.get(c.ID).bind(new jt(a.bones),r[c.ID])})}})}}parsePoseNodes(){const e={};if("Pose"in v.Objects){const t=v.Objects.Pose;for(const i in t)if(t[i].attrType==="BindPose"&&t[i].NbPoseNodes>0){const r=t[i].PoseNode;Array.isArray(r)?r.forEach(function(n){e[n.Node]=new S().fromArray(n.Matrix.a)}):e[r.Node]=new S().fromArray(r.Matrix.a)}}return e}createAmbientLight(){if("GlobalSettings"in v&&"AmbientColor"in v.GlobalSettings){const e=v.GlobalSettings.AmbientColor.value,t=e[0],i=e[1],r=e[2];if(t!==0||i!==0||r!==0){const n=new P(t,i,r).convertSRGBToLinear();A.add(new $e(n,1))}}}}class Ri{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in v.Objects){const i=v.Objects.Geometry;for(const r in i){const n=M.get(parseInt(r)),a=this.parseGeometry(n,i[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,i){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,i);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,i){const r=i.skeletons,n=[],a=e.parents.map(function(c){return v.Objects.Model[c.ID]});if(a.length===0)return;const o=e.children.reduce(function(c,f){return r[f.ID]!==void 0&&(c=r[f.ID]),c},null);e.children.forEach(function(c){i.morphTargets[c.ID]!==void 0&&n.push(i.morphTargets[c.ID])});const l=a[0],u={};"RotationOrder"in l&&(u.eulerOrder=ft(l.RotationOrder.value)),"InheritType"in l&&(u.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(u.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(u.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(u.scale=l.GeometricScaling.value);const h=ht(u);return this.genGeometry(t,o,n,h)}genGeometry(e,t,i,r){const n=new ue;e.attrName&&(n.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new V(o.vertex,3);if(l.applyMatrix4(r),n.setAttribute("position",l),o.colors.length>0&&n.setAttribute("color",new V(o.colors,3)),t&&(n.setAttribute("skinIndex",new Xt(o.weightsIndices,4)),n.setAttribute("skinWeight",new V(o.vertexWeights,4)),n.FBX_Deformer=t),o.normal.length>0){const u=new Ht().getNormalMatrix(r),h=new V(o.normal,3);h.applyNormalMatrix(u),n.setAttribute("normal",h)}if(o.uvs.forEach(function(u,h){const c=h===0?"uv":`uv${h}`;n.setAttribute(c,new V(o.uvs[h],2))}),a.material&&a.material.mappingType!=="AllSame"){let u=o.materialIndex[0],h=0;if(o.materialIndex.forEach(function(c,f){c!==u&&(n.addGroup(h,f-h,u),u=c,h=f)}),n.groups.length>0){const c=n.groups[n.groups.length-1],f=c.start+c.count;f!==o.materialIndex.length&&n.addGroup(f,o.materialIndex.length-f,u)}n.groups.length===0&&n.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(n,e,i,r),n}parseGeoNode(e,t){const i={};if(i.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],i.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&(i.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(i.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(i.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){i.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&i.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return i.weightTable={},t!==null&&(i.skeleton=t,t.rawBones.forEach(function(r,n){r.indices.forEach(function(a,o){i.weightTable[a]===void 0&&(i.weightTable[a]=[]),i.weightTable[a].push({id:n,weight:r.weights[o]})})})),i}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let i=0,r=0,n=!1,a=[],o=[],l=[],u=[],h=[],c=[];const f=this;return e.vertexIndices.forEach(function(p,d){let g,y=!1;p<0&&(p=p^-1,y=!0);let T=[],w=[];if(a.push(p*3,p*3+1,p*3+2),e.color){const m=ce(d,i,p,e.color);l.push(m[0],m[1],m[2])}if(e.skeleton){if(e.weightTable[p]!==void 0&&e.weightTable[p].forEach(function(m){w.push(m.weight),T.push(m.id)}),w.length>4){n||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),n=!0);const m=[0,0,0,0],E=[0,0,0,0];w.forEach(function(O,C){let R=O,b=T[C];E.forEach(function(H,_,te){if(R>H){te[_]=R,R=H;const K=m[_];m[_]=b,b=K}})}),T=m,w=E}for(;w.length<4;)w.push(0),T.push(0);for(let m=0;m<4;++m)h.push(w[m]),c.push(T[m])}if(e.normal){const m=ce(d,i,p,e.normal);o.push(m[0],m[1],m[2])}e.material&&e.material.mappingType!=="AllSame"&&(g=ce(d,i,p,e.material)[0],g<0&&(f.negativeMaterialIndices=!0,g=0)),e.uv&&e.uv.forEach(function(m,E){const O=ce(d,i,p,m);u[E]===void 0&&(u[E]=[]),u[E].push(O[0]),u[E].push(O[1])}),r++,y&&(r>4&&console.warn("THREE.FBXLoader: Polygons with more than four sides are not supported. Make sure to triangulate the geometry during export."),f.genFace(t,e,a,g,o,l,u,h,c,r),i++,r=0,a=[],o=[],l=[],u=[],h=[],c=[])}),t}genFace(e,t,i,r,n,a,o,l,u,h){for(let c=2;c<h;c++)e.vertex.push(t.vertexPositions[i[0]]),e.vertex.push(t.vertexPositions[i[1]]),e.vertex.push(t.vertexPositions[i[2]]),e.vertex.push(t.vertexPositions[i[(c-1)*3]]),e.vertex.push(t.vertexPositions[i[(c-1)*3+1]]),e.vertex.push(t.vertexPositions[i[(c-1)*3+2]]),e.vertex.push(t.vertexPositions[i[c*3]]),e.vertex.push(t.vertexPositions[i[c*3+1]]),e.vertex.push(t.vertexPositions[i[c*3+2]]),t.skeleton&&(e.vertexWeights.push(l[0]),e.vertexWeights.push(l[1]),e.vertexWeights.push(l[2]),e.vertexWeights.push(l[3]),e.vertexWeights.push(l[(c-1)*4]),e.vertexWeights.push(l[(c-1)*4+1]),e.vertexWeights.push(l[(c-1)*4+2]),e.vertexWeights.push(l[(c-1)*4+3]),e.vertexWeights.push(l[c*4]),e.vertexWeights.push(l[c*4+1]),e.vertexWeights.push(l[c*4+2]),e.vertexWeights.push(l[c*4+3]),e.weightsIndices.push(u[0]),e.weightsIndices.push(u[1]),e.weightsIndices.push(u[2]),e.weightsIndices.push(u[3]),e.weightsIndices.push(u[(c-1)*4]),e.weightsIndices.push(u[(c-1)*4+1]),e.weightsIndices.push(u[(c-1)*4+2]),e.weightsIndices.push(u[(c-1)*4+3]),e.weightsIndices.push(u[c*4]),e.weightsIndices.push(u[c*4+1]),e.weightsIndices.push(u[c*4+2]),e.weightsIndices.push(u[c*4+3])),t.color&&(e.colors.push(a[0]),e.colors.push(a[1]),e.colors.push(a[2]),e.colors.push(a[(c-1)*3]),e.colors.push(a[(c-1)*3+1]),e.colors.push(a[(c-1)*3+2]),e.colors.push(a[c*3]),e.colors.push(a[c*3+1]),e.colors.push(a[c*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(n[0]),e.normal.push(n[1]),e.normal.push(n[2]),e.normal.push(n[(c-1)*3]),e.normal.push(n[(c-1)*3+1]),e.normal.push(n[(c-1)*3+2]),e.normal.push(n[c*3]),e.normal.push(n[c*3+1]),e.normal.push(n[c*3+2])),t.uv&&t.uv.forEach(function(f,p){e.uvs[p]===void 0&&(e.uvs[p]=[]),e.uvs[p].push(o[p][0]),e.uvs[p].push(o[p][1]),e.uvs[p].push(o[p][(c-1)*2]),e.uvs[p].push(o[p][(c-1)*2+1]),e.uvs[p].push(o[p][c*2]),e.uvs[p].push(o[p][c*2+1])})}addMorphTargets(e,t,i,r){if(i.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const n=this;i.forEach(function(a){a.rawTargets.forEach(function(o){const l=v.Objects.Geometry[o.geoID];l!==void 0&&n.genMorphGeometry(e,t,l,r,o.name)})})}genMorphGeometry(e,t,i,r,n){const a=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],o=i.Vertices!==void 0?i.Vertices.a:[],l=i.Indexes!==void 0?i.Indexes.a:[],u=e.attributes.position.count*3,h=new Float32Array(u);for(let d=0;d<l.length;d++){const g=l[d]*3;h[g]=o[d*3],h[g+1]=o[d*3+1],h[g+2]=o[d*3+2]}const c={vertexIndices:a,vertexPositions:h},f=this.genBuffers(c),p=new V(f.vertex,3);p.name=n||i.attrName,p.applyMatrix4(r),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,i=e.ReferenceInformationType,r=e.Normals.a;let n=[];return i==="IndexToDirect"&&("NormalIndex"in e?n=e.NormalIndex.a:"NormalsIndex"in e&&(n=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:n,mappingType:t,referenceType:i}}parseUVs(e){const t=e.MappingInformationType,i=e.ReferenceInformationType,r=e.UV.a;let n=[];return i==="IndexToDirect"&&(n=e.UVIndex.a),{dataSize:2,buffer:r,indices:n,mappingType:t,referenceType:i}}parseVertexColors(e){const t=e.MappingInformationType,i=e.ReferenceInformationType,r=e.Colors.a;let n=[];i==="IndexToDirect"&&(n=e.ColorIndex.a);for(let a=0,o=new P;a<r.length;a+=4)o.fromArray(r,a).convertSRGBToLinear().toArray(r,a);return{dataSize:4,buffer:r,indices:n,mappingType:t,referenceType:i}}parseMaterialIndices(e){const t=e.MappingInformationType,i=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:i};const r=e.Materials.a,n=[];for(let a=0;a<r.length;++a)n.push(a);return{dataSize:1,buffer:r,indices:n,mappingType:t,referenceType:i}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new ue;const i=t-1,r=e.KnotVector.a,n=[],a=e.Points.a;for(let c=0,f=a.length;c<f;c+=4)n.push(new fe().fromArray(a,c));let o,l;if(e.Form==="Closed")n.push(n[0]);else if(e.Form==="Periodic"){o=i,l=r.length-1-o;for(let c=0;c<i;++c)n.push(n[c])}const h=new Ai(i,r,n,o,l).getPoints(n.length*12);return new ue().setFromPoints(h)}}class Di{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const i in t){const r=t[i],n=this.addClip(r);e.push(n)}return e}parseClips(){if(v.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=v.Objects.AnimationCurveNode,t=new Map;for(const i in e){const r=e[i];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){const n={id:r.id,attr:r.attrName,curves:{}};t.set(n.id,n)}}return t}parseAnimationCurves(e){const t=v.Objects.AnimationCurve;for(const i in t){const r={id:t[i].id,times:t[i].KeyTime.a.map(Li),values:t[i].KeyValueFloat.a},n=M.get(r.id);if(n!==void 0){const a=n.parents[0].ID,o=n.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){const t=v.Objects.AnimationLayer,i=new Map;for(const r in t){const n=[],a=M.get(parseInt(r));a!==void 0&&(a.children.forEach(function(l,u){if(e.has(l.ID)){const h=e.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(n[u]===void 0){const c=M.get(l.ID).parents.filter(function(f){return f.relationship!==void 0})[0].ID;if(c!==void 0){const f=v.Objects.Model[c.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const p={modelName:f.attrName?he.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};A.traverse(function(d){d.ID===f.id&&(p.transform=d.matrix,d.userData.transformData&&(p.eulerOrder=d.userData.transformData.eulerOrder))}),p.transform||(p.transform=new S),"PreRotation"in f&&(p.preRotation=f.PreRotation.value),"PostRotation"in f&&(p.postRotation=f.PostRotation.value),n[u]=p}}n[u]&&(n[u][h.attr]=h)}else if(h.curves.morph!==void 0){if(n[u]===void 0){const c=M.get(l.ID).parents.filter(function(T){return T.relationship!==void 0})[0].ID,f=M.get(c).parents[0].ID,p=M.get(f).parents[0].ID,d=M.get(p).parents[0].ID,g=v.Objects.Model[d],y={modelName:g.attrName?he.sanitizeNodeName(g.attrName):"",morphName:v.Objects.Deformer[c].attrName};n[u]=y}n[u][h.attr]=h}}}),i.set(parseInt(r),n))}return i}parseAnimStacks(e){const t=v.Objects.AnimationStack,i={};for(const r in t){const n=M.get(parseInt(r)).children;n.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(n[0].ID);i[r]={name:t[r].attrName,layer:a}}return i}addClip(e){let t=[];const i=this;return e.layer.forEach(function(r){t=t.concat(i.generateTracks(r))}),new Wt(e.name,-1,t)}generateTracks(e){const t=[];let i=new F,r=new re,n=new F;if(e.transform&&e.transform.decompose(i,r,n),i=i.toArray(),r=new G().setFromQuaternion(r,e.eulerOrder).toArray(),n=n.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const a=this.generateVectorTrack(e.modelName,e.T.curves,i,"position");a!==void 0&&t.push(a)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const a=this.generateRotationTrack(e.modelName,e.R.curves,r,e.preRotation,e.postRotation,e.eulerOrder);a!==void 0&&t.push(a)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const a=this.generateVectorTrack(e.modelName,e.S.curves,n,"scale");a!==void 0&&t.push(a)}if(e.DeformPercent!==void 0){const a=this.generateMorphTrack(e);a!==void 0&&t.push(a)}return t}generateVectorTrack(e,t,i,r){const n=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(n,t,i);return new Qt(e+"."+r,n,a)}generateRotationTrack(e,t,i,r,n,a){t.x!==void 0&&(this.interpolateRotations(t.x),t.x.values=t.x.values.map(B.degToRad)),t.y!==void 0&&(this.interpolateRotations(t.y),t.y.values=t.y.values.map(B.degToRad)),t.z!==void 0&&(this.interpolateRotations(t.z),t.z.values=t.z.values.map(B.degToRad));const o=this.getTimesForAllAxes(t),l=this.getKeyframeTrackValues(o,t,i);r!==void 0&&(r=r.map(B.degToRad),r.push(a),r=new G().fromArray(r),r=new re().setFromEuler(r)),n!==void 0&&(n=n.map(B.degToRad),n.push(a),n=new G().fromArray(n),n=new re().setFromEuler(n).invert());const u=new re,h=new G,c=[];for(let f=0;f<l.length;f+=3)h.set(l[f],l[f+1],l[f+2],a),u.setFromEuler(h),r!==void 0&&u.premultiply(r),n!==void 0&&u.multiply(n),u.toArray(c,f/3*4);return new Yt(e+".quaternion",o,c)}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,i=t.values.map(function(n){return n/100}),r=A.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new Kt(e.modelName+".morphTargetInfluences["+r+"]",t.times,i)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(i,r){return i-r}),t.length>1){let i=1,r=t[0];for(let n=1;n<t.length;n++){const a=t[n];a!==r&&(t[i]=a,r=a,i++)}t=t.slice(0,i)}return t}getKeyframeTrackValues(e,t,i){const r=i,n=[];let a=-1,o=-1,l=-1;return e.forEach(function(u){if(t.x&&(a=t.x.times.indexOf(u)),t.y&&(o=t.y.times.indexOf(u)),t.z&&(l=t.z.times.indexOf(u)),a!==-1){const h=t.x.values[a];n.push(h),r[0]=h}else n.push(r[0]);if(o!==-1){const h=t.y.values[o];n.push(h),r[1]=h}else n.push(r[1]);if(l!==-1){const h=t.z.values[l];n.push(h),r[2]=h}else n.push(r[2])}),n}interpolateRotations(e){for(let t=1;t<e.values.length;t++){const i=e.values[t-1],r=e.values[t]-i,n=Math.abs(r);if(n>=180){const a=n/180,o=r/a;let l=i+o;const u=e.times[t-1],c=(e.times[t]-u)/a;let f=u+c;const p=[],d=[];for(;f<e.times[t];)p.push(f),f+=c,d.push(l),l+=o;e.times=Ke(e.times,t,p),e.values=Ke(e.values,t,d)}}}}class Fi{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new ut,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,i=e.split(/[\r\n]+/);return i.forEach(function(r,n){const a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;const l=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),u=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=r.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(r,l):u?t.parseNodeProperty(r,u,i[++n]):h?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){const i=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),n={name:i},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(i,n):i in o?(i==="PoseNode"?o.PoseNode.push(n):o[i].id!==void 0&&(o[i]={},o[i][o[i].id]=o[i]),a.id!==""&&(o[i][a.id]=n)):typeof a.id=="number"?(o[i]={},o[i][a.id]=n):i!=="Properties70"&&(i==="PoseNode"?o[i]=[n]:o[i]=n),typeof a.id=="number"&&(n.id=a.id),a.name!==""&&(n.attrName=a.name),a.type!==""&&(n.attrType=a.type),this.pushStack(n)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let i="",r="";return e.length>1&&(i=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:i,type:r}}parseNodeProperty(e,t,i){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),n=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&n===","&&(n=i.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,n);return}if(r==="C"){const l=n.split(",").slice(1),u=parseInt(l[0]),h=parseInt(l[1]);let c=n.split(",").slice(3);c=c.map(function(f){return f.trim().replace(/^"/,"")}),r="connections",n=[u,h],Ni(n,c),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=n),r in a&&Array.isArray(a[r])?a[r].push(n):r!=="a"?a[r]=n:a.a=n,this.setCurrentProp(a,r),r==="a"&&n.slice(-1)!==","&&(a.a=xe(n))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=xe(t.a))}parseNodeSpecialProperty(e,t,i){const r=i.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),n=r[0],a=r[1],o=r[2],l=r[3];let u=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":u=parseFloat(u);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":u=xe(u);break}this.getPrevNode()[n]={type:a,type2:o,flag:l,value:u},this.setCurrentProp(this.getPrevNode(),n)}}class Oi{parse(e){const t=new Qe(e);t.skip(23);const i=t.getUint32();if(i<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+i);const r=new ut;for(;!this.endOfContent(t);){const n=this.parseNode(t,i);n!==null&&r.add(n.name,n)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const i={},r=t>=7500?e.getUint64():e.getUint32(),n=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(r===0)return null;const l=[];for(let f=0;f<n;f++)l.push(this.parseProperty(e));const u=l.length>0?l[0]:"",h=l.length>1?l[1]:"",c=l.length>2?l[2]:"";for(i.singleProperty=n===1&&e.getOffset()===r;r>e.getOffset();){const f=this.parseNode(e,t);f!==null&&this.parseSubNode(o,i,f)}return i.propertyList=l,typeof u=="number"&&(i.id=u),h!==""&&(i.attrName=h),c!==""&&(i.attrType=c),o!==""&&(i.name=o),i}parseSubNode(e,t,i){if(i.singleProperty===!0){const r=i.propertyList[0];Array.isArray(r)?(t[i.name]=i,i.a=r):t[i.name]=r}else if(e==="Connections"&&i.name==="C"){const r=[];i.propertyList.forEach(function(n,a){a!==0&&r.push(n)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(i.name==="Properties70")Object.keys(i).forEach(function(n){t[n]=i[n]});else if(e==="Properties70"&&i.name==="P"){let r=i.propertyList[0],n=i.propertyList[1];const a=i.propertyList[2],o=i.propertyList[3];let l;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),n.indexOf("Lcl ")===0&&(n=n.replace("Lcl ","Lcl_")),n==="Color"||n==="ColorRGB"||n==="Vector"||n==="Vector3D"||n.indexOf("Lcl_")===0?l=[i.propertyList[4],i.propertyList[5],i.propertyList[6]]:l=i.propertyList[4],t[r]={type:n,type2:a,flag:o,value:l}}else t[i.name]===void 0?typeof i.id=="number"?(t[i.name]={},t[i.name][i.id]=i):t[i.name]=i:i.name==="PoseNode"?(Array.isArray(t[i.name])||(t[i.name]=[t[i.name]]),t[i.name].push(i)):t[i.name][i.id]===void 0&&(t[i.name][i.id]=i)}parseProperty(e){const t=e.getString(1);let i;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return i=e.getUint32(),e.getArrayBuffer(i);case"S":return i=e.getUint32(),e.getString(i);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const r=e.getUint32(),n=e.getUint32(),a=e.getUint32();if(n===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}const o=wi(new Uint8Array(e.getArrayBuffer(a))),l=new Qe(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(r);case"d":return l.getFloat64Array(r);case"f":return l.getFloat32Array(r);case"i":return l.getInt32Array(r);case"l":return l.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class Qe{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let i=0;i<e;i++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let i=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const r=i.indexOf(0);return r>=0&&(i=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(i)}}class ut{add(e,t){this[e]=t}}function ki(s){const e="Kaydara FBX Binary  \0";return s.byteLength>=e.length&&e===pt(s,0,e.length)}function Bi(s){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function i(r){const n=s[r-1];return s=s.slice(t+r),t++,n}for(let r=0;r<e.length;++r)if(i(1)===e[r])return!1;return!0}function Ye(s){const e=/FBXVersion: (\d+)/,t=s.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function Li(s){return s/46186158e3}const Ui=[];function ce(s,e,t,i){let r;switch(i.mappingType){case"ByPolygonVertex":r=s;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=i.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+i.mappingType)}i.referenceType==="IndexToDirect"&&(r=i.indices[r]);const n=r*i.dataSize,a=n+i.dataSize;return zi(Ui,i.buffer,n,a)}const Te=new G,$=new F;function ht(s){const e=new S,t=new S,i=new S,r=new S,n=new S,a=new S,o=new S,l=new S,u=new S,h=new S,c=new S,f=new S,p=s.inheritType?s.inheritType:0;if(s.translation&&e.setPosition($.fromArray(s.translation)),s.preRotation){const _=s.preRotation.map(B.degToRad);_.push(s.eulerOrder||G.DEFAULT_ORDER),t.makeRotationFromEuler(Te.fromArray(_))}if(s.rotation){const _=s.rotation.map(B.degToRad);_.push(s.eulerOrder||G.DEFAULT_ORDER),i.makeRotationFromEuler(Te.fromArray(_))}if(s.postRotation){const _=s.postRotation.map(B.degToRad);_.push(s.eulerOrder||G.DEFAULT_ORDER),r.makeRotationFromEuler(Te.fromArray(_)),r.invert()}s.scale&&n.scale($.fromArray(s.scale)),s.scalingOffset&&o.setPosition($.fromArray(s.scalingOffset)),s.scalingPivot&&a.setPosition($.fromArray(s.scalingPivot)),s.rotationOffset&&l.setPosition($.fromArray(s.rotationOffset)),s.rotationPivot&&u.setPosition($.fromArray(s.rotationPivot)),s.parentMatrixWorld&&(c.copy(s.parentMatrix),h.copy(s.parentMatrixWorld));const d=t.clone().multiply(i).multiply(r),g=new S;g.extractRotation(h);const y=new S;y.copyPosition(h);const T=y.clone().invert().multiply(h),w=g.clone().invert().multiply(T),m=n,E=new S;if(p===0)E.copy(g).multiply(d).multiply(w).multiply(m);else if(p===1)E.copy(g).multiply(w).multiply(d).multiply(m);else{const te=new S().scale(new F().setFromMatrixScale(c)).clone().invert(),K=w.clone().multiply(te);E.copy(g).multiply(d).multiply(K).multiply(m)}const O=u.clone().invert(),C=a.clone().invert();let R=e.clone().multiply(l).multiply(u).multiply(t).multiply(i).multiply(r).multiply(O).multiply(o).multiply(a).multiply(n).multiply(C);const b=new S().copyPosition(R),H=h.clone().multiply(b);return f.copyPosition(H),R=f.clone().multiply(E),R.premultiply(h.invert()),R}function ft(s){s=s||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return s===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[s]}function xe(s){return s.split(",").map(function(t){return parseFloat(t)})}function pt(s,e,t){return e===void 0&&(e=0),t===void 0&&(t=s.byteLength),new TextDecoder().decode(new Uint8Array(s,e,t))}function Ni(s,e){for(let t=0,i=s.length,r=e.length;t<r;t++,i++)s[i]=e[t]}function zi(s,e,t,i){for(let r=t,n=0;r<i;r++,n++)s[n]=e[r];return s}function Ke(s,e,t){return s.slice(0,e).concat(t).concat(s.slice(e))}export{Y as E,Xi as F,Xe as T,ji as W};
