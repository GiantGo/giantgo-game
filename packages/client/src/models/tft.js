import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

const modelSize = 0.04

class TFT extends THREE.Group {
  constructor(path) {
    super()

    this.path = path
    this.materialMap = {}
    this.positionMap = {}
    this.rotateZhao = 0

    this.tft = new THREE.Group()
    this.tft.scale.set(modelSize, modelSize, modelSize)
    this.tft.position.set(0, -6, 0)
    this.add(this.tft)

    this.loadModel('Di')
    this.loadModel('Gai')
    this.loadModel('Zhong')
  }

  loadModel(i) {
    const loadManager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(`${this.path}/${i}Texture.jpeg`)

    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.3
    material.roughness = 0.5
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
      this.tft.add(group)
    })
  }

  splitModel(split) {
    if (split) {
      new TWEEN.Tween(this.Di.position)
        .to({ y: this.positionMap.Di.y - 200 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
      new TWEEN.Tween(this.Gai.position)
        .to({ y: this.positionMap.Gai.y + 100 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start()
    } else {
      new TWEEN.Tween(this.Di.position).to({ y: this.positionMap.Di.y }, 2000).easing(TWEEN.Easing.Linear.None).start()
      new TWEEN.Tween(this.Gai.position)
        .to({ y: this.positionMap.Gai.y }, 2000)
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

    this.tft.traverse((child) => {
      if (child.isMesh) {
        child.material = opacity ? material : this.materialMap[child.name]
      }
    })
  }

  update() {}
}

export { TFT }
