import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import RAPIER from '@dimforge/rapier3d-compat'

class Terrain extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.loadModel()
  }

  loadModel() {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    loader.setDRACOLoader(dracoLoader)
    loader.load('./robot/World.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.scale.set(1, 1, 1)
          child.castShadow = true
          child.receiveShadow = true

          if (child.material.map) {
            child.material.map.anisotropy = 4
          }

          this.add(child)

          const geometry = child.geometry
          const vertices = geometry.attributes.position.array
          const indices = geometry.index.array
          const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
          const rigidBody = this.engine.world.createRigidBody(rigidBodyDesc)
          const colliderDesc = RAPIER.ColliderDesc.trimesh(vertices, indices)

          rigidBody.setTranslation(child.position)

          this.engine.world.createCollider(colliderDesc, rigidBody)
        }
      })
    })
  }
}

export { Terrain }
