import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import RAPIER from '@dimforge/rapier3d-compat'
import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

class Engine extends THREE.EventDispatcher {
  constructor() {
    super()
    this.clock = new THREE.Clock()
  }

  async init() {
    await RAPIER.init()
    this.loadScene()
    this.loadCamera()
    this.loadRenderer()
    this.loadControls()
    this.loadLights()
    this.loadWorld()
    await this.loadClient()

    this.update()

    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  loadScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xa8def0)
    this.scene.fog = new THREE.Fog(0x88ccee, 0, 50)
  }

  loadCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.x = 0
    this.camera.position.y = 3
    this.camera.position.z = 5
  }

  loadRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.VSMShadowMap
    document.getElementById('container').appendChild(this.renderer.domElement)
  }

  loadControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = false
    this.controls.rotateSpeed = 0.4
    this.controls.enablePan = false
    this.controls.minDistance = 5
    this.controls.maxDistance = 20
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05 // prevent camera below ground
    this.controls.minPolarAngle = Math.PI / 4 // prevent top down view
    this.controls.update()
  }

  loadLights() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
    hemiLight.position.set(0, 20, 0)
    this.scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 3)
    dirLight.position.set(0, 20, 10)
    dirLight.castShadow = true
    dirLight.shadow.camera.near = 0.01
    dirLight.shadow.camera.far = 500
    dirLight.shadow.camera.right = 30
    dirLight.shadow.camera.left = -30
    dirLight.shadow.camera.top = 30
    dirLight.shadow.camera.bottom = -30
    dirLight.shadow.mapSize.width = 1024
    dirLight.shadow.mapSize.height = 1024
    dirLight.shadow.radius = 4
    dirLight.shadow.bias = -0.00006
    this.scene.add(dirLight)
  }

  loadWorld() {
    this.world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 })
    this.characterController = this.world.createCharacterController(0.01)
    this.characterController.setMaxSlopeClimbAngle((45 * Math.PI) / 180)
    this.characterController.enableAutostep(0.5, 0.2, true)
    this.characterController.enableSnapToGround(0.5)
  }

  async loadClient() {
    this.client = new Colyseus.Client('ws://localhost:2567/test/server')
    this.room = await this.client.joinOrCreate('my_room')
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  update() {
    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }

    this.world.step()
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    TWEEN.update()
    this.dispatchEvent({ type: 'update', dt: this.clock.getDelta() })
    requestAnimationFrame(this.update.bind(this))
  }
}

export { Engine }
