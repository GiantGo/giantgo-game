import{F as me,T as w,E as x,W as ge}from"./FBXLoader-d2dde7d0.js";import{B as I,V as y,I as ve,F as J,a as k,b as L,W as ye,S as le,c as we,U as de,d as P,e as ce,f as G,g as W,M as xe,L as Se,h as q,i as $,G as X,T as be,j as K,k as Q,l as _e,m as Me,D as ze,P as Ee,n as ue,E as Le,C as Ue,o as Ae,p as Ce,q as Be,r as De}from"./three.module-a5b5a39f.js";import{_ as Te,r as D,o as Oe,a as T,b as Y,c as ee,d as pe,e as A,w as te,F as ie,f as Ve,p as Fe,g as Pe,h as Ge,t as Ie}from"./index-47d512da.js";import"./OrbitControls-390d9049.js";const ne=new I,O=new y;class fe extends ve{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new J(e,3)),this.setAttribute("uv",new J(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new k(t,6,1);return this.setAttribute("instanceStart",new L(n,3,0)),this.setAttribute("instanceEnd",new L(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new k(t,6,1);return this.setAttribute("instanceColorStart",new L(n,3,0)),this.setAttribute("instanceColorEnd",new L(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ye(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new I);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ne.setFromBufferAttribute(t),this.boundingBox.union(ne))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new le),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)O.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(O)),O.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(O));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}P.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new we(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};G.line={uniforms:de.merge([P.common,P.fog,P.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Z extends ce{constructor(e){super({type:"LineMaterial",uniforms:de.clone(G.line.uniforms),vertexShader:G.line.vertexShader,fragmentShader:G.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const se=new y,oe=new y,u=new W,p=new W,S=new W,N=new y,R=new xe,f=new Se,ae=new y,V=new I,F=new le,b=new W;let _,z;function re(r,e,t){return b.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),b.multiplyScalar(1/b.w),b.x=z/t.width,b.y=z/t.height,b.applyMatrix4(r.projectionMatrixInverse),b.multiplyScalar(1/b.w),Math.abs(Math.max(b.x,b.y))}function We(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){f.start.fromBufferAttribute(i,o),f.end.fromBufferAttribute(s,o),f.applyMatrix4(t);const c=new y,d=new y;_.distanceSqToSegment(f.start,f.end,d,c),d.distanceTo(c)<z*.5&&e.push({point:d,pointOnLine:c,distance:_.origin.distanceTo(d),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function je(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),m=-e.near;_.at(1,S),S.w=1,S.applyMatrix4(e.matrixWorldInverse),S.applyMatrix4(n),S.multiplyScalar(1/S.w),S.x*=s.x/2,S.y*=s.y/2,S.z=0,N.copy(S),R.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,v=d;h<v;h++){if(u.fromBufferAttribute(l,h),p.fromBufferAttribute(c,h),u.w=1,p.w=1,u.applyMatrix4(R),p.applyMatrix4(R),u.z>m&&p.z>m)continue;if(u.z>m){const E=u.z-p.z,M=(u.z-m)/E;u.lerp(p,M)}else if(p.z>m){const E=p.z-u.z,M=(p.z-m)/E;p.lerp(u,M)}u.applyMatrix4(n),p.applyMatrix4(n),u.multiplyScalar(1/u.w),p.multiplyScalar(1/p.w),u.x*=s.x/2,u.y*=s.y/2,p.x*=s.x/2,p.y*=s.y/2,f.start.copy(u),f.start.z=0,f.end.copy(p),f.end.z=0;const U=f.closestPointToPointParameter(N,!0);f.at(U,ae);const B=$.lerp(u.z,p.z,U),j=B>=-1&&B<=1,g=N.distanceTo(ae)<z*.5;if(j&&g){f.start.fromBufferAttribute(l,h),f.end.fromBufferAttribute(c,h),f.start.applyMatrix4(a),f.end.applyMatrix4(a);const E=new y,M=new y;_.distanceSqToSegment(f.start,f.end,M,E),t.push({point:M,pointOnLine:E,distance:_.origin.distanceTo(M),object:r,face:null,faceIndex:h,uv:null,uv1:null})}}}class Ne extends q{constructor(e=new fe,t=new Z({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)se.fromBufferAttribute(t,a),oe.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+se.distanceTo(oe);const s=new k(i,2,1);return e.setAttribute("instanceDistanceStart",new L(s,1,0)),e.setAttribute("instanceDistanceEnd",new L(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;_=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;z=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),F.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=z*.5;else{const m=Math.max(i.near,F.distanceToPoint(_.origin));c=re(i,m,l.resolution)}if(F.radius+=c,_.intersectsSphere(F)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),V.copy(o.boundingBox).applyMatrix4(a);let d;if(n)d=z*.5;else{const m=Math.max(i.near,V.distanceToPoint(_.origin));d=re(i,m,l.resolution)}V.expandByScalar(d),_.intersectsBox(V)!==!1&&(n?We(this,t):je(this,i,t))}}class he extends fe{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Re extends Ne{constructor(e=new he,t=new Z({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const H=.01;let He=class extends X{constructor(e){super(),this.path=e,this.materialMap={},this.positionMap={},this.rotateZhao=0,this.cxgd=new X,this.cxgd.scale.set(H,H,H),this.cxgd.position.set(0,-3,0),this.add(this.cxgd),this.loadModel("tou"),this.loadModel("shen"),this.loadModel("yanguan"),this.loadModel("lzhao"),this.loadModel("rzhao"),this.loadModel("dengpan"),this.loadModel("zuo"),this.loadCandle(),this.loadOutSize()}loadModel(e){const t=new Be,n=new be,i=n.load(`${this.path}/${e}Texture.jpg`),s=n.load(`${this.path}/${e}Roughness.jpg`);i.colorSpace=K,s.colorSpace=K;const a=new Q;a.metalness=.3,a.roughnessMap=s,a.roughness=.6,a.map=i,this.materialMap[e]=a,new me(t).load(`${this.path}/${e}.FBX`,l=>{let c;l.traverse(d=>{if(d.isMesh){d.material=a;const m=new I().setFromObject(d);c=new y,m.getCenter(c),d.position.sub(c),d.name=e}}),l.name="Group"+e,l.position.add(c),this[e]=l,this.positionMap[e]=new y().copy(l.position),this.cxgd.add(l)})}loadCandle(){this.candle=new ke(16755251,200),this.candle.position.set(-6,1.5,5.5),this.add(this.candle)}loadOutSize(){const e=document.createElement("canvas"),t=e.getContext("2d");t.fillStyle="#bb9c61",t.font="12px Arial",t.fillText("48cm",e.width/2,e.height/2),t.textAlign="right";const n=new _e(e);n.needsUpdate=!0;const i=new Me({map:n,side:ze});i.transparent=!0;const s=new q(new Ee(50,10),i);s.position.set(8,1,0),this.add(s),this.loadSizeLine([8,14,0,10,14,0,10,3,0]),this.loadSizeLine([10,0,0,10,-11.5,0,8,-11.5,0])}loadSizeLine(e){const t=new he;t.setPositions(e),t.setColors([187,156,97,187,156,97,187,156,97]);const n=new Z({color:12229468,linewidth:2,vertexColors:!0,dashed:!1,alphaToCoverage:!0});n.resolution.set(window.innerWidth,window.innerHeight);const i=new Re(t,n);i.computeLineDistances(),i.scale.set(1,1,1),this.add(i)}splitModel(e){e?(new w(this.dengpan.position).to({y:this.positionMap.dengpan.y-500},2e3).easing(x.Elastic.Out).start(),new w(this.zuo.position).to({y:this.positionMap.zuo.y-300},2e3).easing(x.Elastic.Out).start(),new w(this.yanguan.position).to({y:this.positionMap.yanguan.y+300},2e3).easing(x.Elastic.Out).start(),new w(this.tou.position).to({y:this.positionMap.tou.y+100},2e3).easing(x.Elastic.Out).start(),new w(this.shen.position).to({y:this.positionMap.shen.y-400},2e3).easing(x.Elastic.Out).start()):(new w(this.dengpan.position).to({y:this.positionMap.dengpan.y},2e3).easing(x.Linear.None).start(),new w(this.zuo.position).to({y:this.positionMap.zuo.y},2e3).easing(x.Linear.None).start(),new w(this.yanguan.position).to({y:this.positionMap.yanguan.y},2e3).easing(x.Linear.None).start(),new w(this.tou.position).to({y:this.positionMap.tou.y},2e3).easing(x.Linear.None).start(),new w(this.shen.position).to({y:this.positionMap.shen.y},2e3).easing(x.Linear.None).start())}opacityModel(e){const t=new Q;t.transparent=!0,t.opacity=.2,t.metalness=0,t.roughness=1,t.depthTest=!1,t.depthWrite=!1,t.side=ue,this.cxgd.traverse(n=>{n.isMesh&&(n.material=e?t:this.materialMap[n.name])})}update(){this.candle.light.intensity=400-(this.rotateZhao+40)*5,this.lzhao&&this.lzhao.setRotationFromEuler(new Le(0,$.degToRad(this.rotateZhao),0)),this.candle.update()}};class ke extends X{constructor(e,t){super(),this.flameMaterials=[],this.clock=new Ue,this.time=0,this.loadLight(e,t),this.loadFlame(!0),this.loadFlame(!1)}loadLight(e,t){this.light=new Ae(e,t),this.light.castShadow=!0,this.add(this.light)}loadFlame(e){const t=new Ce(.5,32,32);t.translate(0,.5,0);const n=this.getFlameMaterial(e);this.flameMaterials.push(n);const i=new q(t,n);i.rotation.y=$.degToRad(-45),this.add(i)}getFlameMaterial(e){let t=e?ue:De;return new ce({uniforms:{time:{value:0}},vertexShader:`
          uniform float time;
          varying vec2 vUv;
          varying float hValue;
  
          //https://thebookofshaders.com/11/
          // 2D Random
          float random (in vec2 st) {
              return fract(sin(dot(st.xy,
                                   vec2(12.9898,78.233)))
                           * 43758.5453123);
          }
  
          // 2D Noise based on Morgan McGuire @morgan3d
          // https://www.shadertoy.com/view/4dS3Wd
          float noise (in vec2 st) {
              vec2 i = floor(st);
              vec2 f = fract(st);
  
              // Four corners in 2D of a tile
              float a = random(i);
              float b = random(i + vec2(1.0, 0.0));
              float c = random(i + vec2(0.0, 1.0));
              float d = random(i + vec2(1.0, 1.0));
  
              // Smooth Interpolation
  
              // Cubic Hermine Curve.  Same as SmoothStep()
              vec2 u = f*f*(3.0-2.0*f);
              // u = smoothstep(0.,1.,f);
  
              // Mix 4 coorners percentages
              return mix(a, b, u.x) +
                      (c - a)* u.y * (1.0 - u.x) +
                      (d - b) * u.x * u.y;
          }
  
          void main() {
            vUv = uv;
            vec3 pos = position;
  
            pos *= vec3(0.8, 2, 0.725);
            hValue = position.y;
            //float sinT = sin(time * 2.) * 0.5 + 0.5;
            float posXZlen = length(position.xz);
  
            pos.y *= 1. + (cos((posXZlen + 0.25) * 3.1415926) * 0.25 + noise(vec2(0, time)) * 0.125 + noise(vec2(position.x + time, position.z + time)) * 0.5) * position.y; // flame height
  
            pos.x += noise(vec2(time * 2., (position.y - time) * 4.0)) * hValue * 0.0312; // flame trembling
            pos.z += noise(vec2((position.y - time) * 4.0, time * 2.)) * hValue * 0.0312; // flame trembling
  
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
          }
        `,fragmentShader:`
          varying float hValue;
          varying vec2 vUv;
  
          // honestly stolen from https://www.shadertoy.com/view/4dsSzr
          vec3 heatmapGradient(float t) {
            return clamp((pow(t, 1.5) * 0.8 + 0.2) * vec3(smoothstep(0.0, 0.35, t) + t * 0.5, smoothstep(0.5, 1.0, t), max(1.0 - t * 1.7, t * 7.0 - 6.0)), 0.0, 1.0);
          }
  
          void main() {
            float v = abs(smoothstep(0.0, 0.4, hValue) - 1.);
            float alpha = (1. - v) * 0.99; // bottom transparency
            alpha -= 1. - smoothstep(1.0, 0.97, hValue); // tip transparency
            gl_FragColor = vec4(heatmapGradient(smoothstep(0.0, 0.3, hValue)) * vec3(0.95,0.95,0.4), alpha) ;
            gl_FragColor.rgb = mix(vec3(0,0,1), gl_FragColor.rgb, smoothstep(0.0, 0.3, hValue)); // blueish for bottom
            gl_FragColor.rgb += vec3(1, 0.9, 0.5) * (1.25 - vUv.y); // make the midst brighter
            gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.66, 0.32, 0.03), smoothstep(0.95, 1., hValue)); // tip
          }
        `,transparent:!0,side:t})}update(){this.time+=this.clock.getDelta(),this.flameMaterials[0].uniforms.time.value=this.time,this.flameMaterials[1].uniforms.time.value=this.time}}const Xe=r=>(Fe("data-v-d205b974"),r=r(),Pe(),r),qe=Xe(()=>pe("div",{id:"container"},null,-1)),$e={class:"operator"},Ze={__name:"CXGD",setup(r){let e,t;const n=D(0),i=D(!1),s=D(!1),a=D("reset"),o=[{name:"jiao",title:"脚",target:{x:0,y:-6,z:0},spherical:{radius:30,phi:1.5437919695926463,theta:3.013340719774144}},{name:"mingwen",title:"铭文",target:{x:-6,y:6,z:6},spherical:{radius:20,phi:1.5595536338254037,theta:-.28851214861705055}},{name:"yifu",title:"衣服",target:{x:0,y:0,z:-1},spherical:{radius:40,phi:1.5707963267948966,theta:0}},{name:"tou",title:"头",target:{x:0,y:6,z:-1},spherical:{radius:20,phi:1.4286683975156138,theta:-.09558304890136755}},{name:"faji",title:"发髻",target:{x:0,y:6,z:-1},spherical:{radius:30,phi:1.2149865747997122,theta:2.5586513764535024}},{name:"reset",title:"重置",target:{x:0,y:0,z:-1},spherical:{radius:60,phi:1.5707963267948966,theta:0}}];function l(h){t.splitModel(h)}function c(h){t.opacityModel(h)}function d(h){t.rotateZhao=h}function m(h){const v=o.find(C=>C.name===h);e.focusModel(v)}return Oe(()=>{e=new ge,t=new He("./cxgd"),e.scene.add(t),e.update(),e.addEventListener("update",()=>{t.update()})}),(h,v)=>{const C=T("el-slider"),U=T("el-switch"),B=T("el-radio-button"),j=T("el-radio-group");return Y(),ee(ie,null,[qe,pe("div",$e,[A(C,{modelValue:n.value,"onUpdate:modelValue":v[0]||(v[0]=g=>n.value=g),min:-40,max:40,step:1,onInput:d},null,8,["modelValue"]),A(U,{modelValue:i.value,"onUpdate:modelValue":v[1]||(v[1]=g=>i.value=g),onChange:l},null,8,["modelValue"]),A(U,{modelValue:s.value,"onUpdate:modelValue":v[2]||(v[2]=g=>s.value=g),onChange:c},null,8,["modelValue"]),A(j,{modelValue:a.value,"onUpdate:modelValue":v[3]||(v[3]=g=>a.value=g),size:"large",onChange:m},{default:te(()=>[(Y(),ee(ie,null,Ve(o,g=>A(B,{key:g.name,label:g.name},{default:te(()=>[Ge(Ie(g.title),1)]),_:2},1032,["label"])),64))]),_:1},8,["modelValue"])])],64)}}},tt=Te(Ze,[["__scopeId","data-v-d205b974"]]);export{tt as default};
