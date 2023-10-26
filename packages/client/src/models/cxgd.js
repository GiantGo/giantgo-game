import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'

const modelSize = 0.01

class CXGD extends THREE.Group {
  constructor(path) {
    super()

    this.path = path
    this.materialMap = {}
    this.positionMap = {}
    this.rotateZhao = 0

    this.cxgd = new THREE.Group()
    this.cxgd.scale.set(modelSize, modelSize, modelSize)
    this.cxgd.position.set(0, -3, 0)
    this.add(this.cxgd)

    this.loadModel('tou')
    this.loadModel('shen')
    this.loadModel('yanguan')
    this.loadModel('lzhao')
    this.loadModel('rzhao')
    this.loadModel('dengpan')
    this.loadModel('zuo')
    this.loadCandle()
    this.loadOutSize()
  }

  loadModel(i) {
    const loadManager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(`${this.path}/${i}Texture.jpg`)
    const roughnessMap = textureLoader.load(`${this.path}/${i}Roughness.jpg`)

    texture.colorSpace = THREE.SRGBColorSpace
    roughnessMap.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.3
    material.roughnessMap = roughnessMap
    material.roughness = 0.6
    material.map = texture
    this.materialMap[i] = material

    // model
    const loader = new FBXLoader(loadManager)
    loader.load(`${this.path}/${i}.FBX`, (group) => {
      let center

      group.traverse((child) => {
        if (child.isMesh) {
          child.material = material

          const box = new THREE.Box3().setFromObject(child)
          center = new THREE.Vector3()
          box.getCenter(center)
          child.position.sub(center)
          child.name = i
        }
      })

      group.name = 'Group' + i
      group.position.add(center)

      this[i] = group
      this.positionMap[i] = new THREE.Vector3().copy(group.position)
      this.cxgd.add(group)
    })
  }

  loadCandle() {
    this.candle = new Candle(0xffaa33, 200)
    this.candle.position.set(-6, 1.5, 5.5)
    this.add(this.candle)
  }

  loadOutSize() {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.fillStyle = '#bb9c61'
    context.font = '12px Arial'
    context.fillText('48cm', canvas.width / 2, canvas.height / 2)
    context.textAlign = 'right'

    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    })
    material.transparent = true

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(50, 10), material)
    mesh.position.set(8, 1, 0)
    this.add(mesh)

    this.loadSizeLine([8, 14, 0, 10, 14, 0, 10, 3, 0])
    this.loadSizeLine([10, 0, 0, 10, -11.5, 0, 8, -11.5, 0])
  }

  loadSizeLine(positions) {
    const geometry = new LineGeometry()
    geometry.setPositions(positions)
    geometry.setColors([187, 156, 97, 187, 156, 97, 187, 156, 97])

    const matLine = new LineMaterial({
      color: 0xba9b5c,
      linewidth: 2, // in world units with size attenuation, pixels otherwise
      vertexColors: true,
      //resolution:  // to be set by renderer, eventually
      dashed: false,
      alphaToCoverage: true
    })
    matLine.resolution.set(window.innerWidth, window.innerHeight)

    const line = new Line2(geometry, matLine)
    line.computeLineDistances()
    line.scale.set(1, 1, 1)

    this.add(line)
  }

  splitModel(split) {
    if (split) {
      new TWEEN.Tween(this.dengpan.position)
        .to({ y: this.positionMap.dengpan.y - 500 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
      new TWEEN.Tween(this.zuo.position)
        .to({ y: this.positionMap.zuo.y - 300 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
      new TWEEN.Tween(this.yanguan.position)
        .to({ y: this.positionMap.yanguan.y + 300 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
      new TWEEN.Tween(this.tou.position)
        .to({ y: this.positionMap.tou.y + 100 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
      new TWEEN.Tween(this.shen.position)
        .to({ y: this.positionMap.shen.y - 400 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
    } else {
      new TWEEN.Tween(this.dengpan.position)
        .to({ y: this.positionMap.dengpan.y }, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .start()
      new TWEEN.Tween(this.zuo.position)
        .to({ y: this.positionMap.zuo.y }, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .start()
      new TWEEN.Tween(this.yanguan.position)
        .to({ y: this.positionMap.yanguan.y }, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .start()
      new TWEEN.Tween(this.tou.position)
        .to({ y: this.positionMap.tou.y }, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .start()
      new TWEEN.Tween(this.shen.position)
        .to({ y: this.positionMap.shen.y }, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .start()
    }
  }

  opacityModel(opacity) {
    const material = new THREE.MeshStandardMaterial()
    material.transparent = true
    material.opacity = 0.2
    material.metalness = 0
    material.roughness = 1
    material.depthTest = false
    material.depthWrite = false
    material.side = THREE.FrontSide

    this.cxgd.traverse((child) => {
      if (child.isMesh) {
        child.material = opacity ? material : this.materialMap[child.name]
      }
    })
  }

  update() {
    this.candle.light.intensity = 400 - (this.rotateZhao + 40) * 5
    this.lzhao && this.lzhao.setRotationFromEuler(new THREE.Euler(0, THREE.MathUtils.degToRad(this.rotateZhao), 0))
    this.candle.update()
  }
}

class Candle extends THREE.Group {
  constructor(color, intensity) {
    super()

    this.flameMaterials = []

    this.clock = new THREE.Clock()

    this.time = 0

    this.loadLight(color, intensity)
    this.loadFlame(true)
    this.loadFlame(false)
  }

  loadLight(color, intensity) {
    this.light = new THREE.PointLight(color, intensity)
    this.light.castShadow = true
    this.add(this.light)
  }

  loadFlame(isFrontSide) {
    const flameGeo = new THREE.SphereGeometry(0.5, 32, 32)
    flameGeo.translate(0, 0.5, 0)

    const flameMat = this.getFlameMaterial(isFrontSide)
    this.flameMaterials.push(flameMat)

    const flame = new THREE.Mesh(flameGeo, flameMat)
    flame.rotation.y = THREE.MathUtils.degToRad(-45)

    this.add(flame)
  }

  getFlameMaterial(isFrontSide) {
    let side = isFrontSide ? THREE.FrontSide : THREE.BackSide
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
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
        `,
      fragmentShader: `
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
        `,
      transparent: true,
      side: side
    })
  }

  update() {
    this.time += this.clock.getDelta()
    this.flameMaterials[0].uniforms.time.value = this.time
    this.flameMaterials[1].uniforms.time.value = this.time
  }
}

export { CXGD, Candle }
