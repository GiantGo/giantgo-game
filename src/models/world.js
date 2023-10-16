import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

const _updateEvent = { type: 'update' }

class World extends THREE.EventDispatcher {
  constructor() {
    super()

    this.moving = false
    this.pickPosition = new THREE.Vector2(0, 0)
    this.raycaster = new THREE.Raycaster()
    this.pickedObject = null

    this.scene = new THREE.Scene()

    this.loadOther()
    this.loadCamera()
    this.loadRenderer()
    this.loadControls()
    this.loadOutline()

    window.addEventListener('resize', this.onWindowResize.bind(this))
    window.addEventListener('mousedown', this.onMouseDown.bind(this))
    window.addEventListener('mouseup', this.onMouseUp.bind(this))
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  loadOther() {
    // 轴helper
    const axesHelper = new THREE.AxesHelper(20000)
    this.scene.add(axesHelper)

    //自然光
    const ambientLight = new THREE.AmbientLight(0xffffff)
    this.scene.add(ambientLight)
  }

  loadCamera() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(0, 0, 0)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
    this.camera.position.set(0, 0, 60)
    this.camera.add(directionalLight)
    this.scene.add(this.camera)
  }

  loadRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x101b29, 1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    document.getElementById('container').appendChild(this.renderer.domElement)
  }

  loadControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.minDistance = 10
    this.controls.maxDistance = 80
    this.controls.enableDamping = true
    this.controls.autoRotate = false
    this.controls.enablePan = true
    this.controls.addEventListener('end', () => {
      console.log(
        JSON.stringify({
          radius: this.controls.getDistance(),
          phi: this.controls.getPolarAngle(),
          theta: this.controls.getAzimuthalAngle()
        }),
        JSON.stringify(this.controls.target)
      )
    })
  }

  loadOutline() {
    this.composer = new EffectComposer(this.renderer)

    const renderPass = new RenderPass(this.scene, this.camera)
    renderPass.clearColor = new THREE.Color(0, 0, 0)
    renderPass.clearAlpha = 0
    this.composer.addPass(renderPass)

    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    )
    this.composer.addPass(this.outlinePass)

    const outputPass = new OutputPass()
    this.composer.addPass(outputPass)

    this.effectFXAA = new ShaderPass(FXAAShader)
    this.effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
    this.effectFXAA.renderToScreen = true
    this.effectFXAA.material.transparent = true // FIX
    this.composer.addPass(this.effectFXAA)
  }

  focusModel(data) {
    const quat = new THREE.Quaternion().setFromUnitVectors(this.camera.up, new THREE.Vector3(0, 1, 0))
    const quatInverse = quat.clone().invert()
    const spherical = new THREE.Spherical()
    spherical.phi = this.controls.getPolarAngle()
    spherical.theta = this.controls.getAzimuthalAngle()
    spherical.radius = this.camera.position.distanceTo(this.controls.target)
    new TWEEN.Tween(this.controls.target).to(data.target, 1000).easing(TWEEN.Easing.Exponential.Out).start()
    new TWEEN.Tween(spherical)
      .to(data.spherical, 1000)
      .onUpdate(() => {
        const offset = new THREE.Vector3()
        offset.setFromSpherical(spherical)
        offset.applyQuaternion(quatInverse)
        this.camera.position.copy(this.controls.target).add(offset)
      })
      .easing(TWEEN.Easing.Exponential.Out)
      .start()
  }

  getCanvasRelativePosition(event) {
    const canvas = this.renderer.domElement
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height
    }
  }

  setPickPosition(event) {
    const pos = this.getCanvasRelativePosition(event)
    const canvas = this.renderer.domElement
    this.pickPosition.x = (pos.x / canvas.width) * 2 - 1
    this.pickPosition.y = (pos.y / canvas.height) * -2 + 1 // note we flip Y
  }

  pick(normalizedPosition, scene, camera) {
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera)
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children)
    if (intersectedObjects.length) {
      // // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object
      this.outlinePass.selectedObjects = [this.pickedObject]
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
  }

  onMouseDown() {
    this.moving = false
  }

  onMouseUp(event) {
    if (!this.moving) {
      this.setPickPosition(event)
      this.pick(this.pickPosition, this.scene, this.camera, 0.01)
    } else {
      this.moving = false
    }
  }

  onMouseMove() {
    this.moving = true
  }

  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  update() {
    requestAnimationFrame(this.update.bind(this))

    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }

    this.renderer.render(this.scene, this.camera)
    TWEEN.update()
    this.controls.update()
    this.composer.render()
    this.dispatchEvent(_updateEvent)
  }
}

export { World }
