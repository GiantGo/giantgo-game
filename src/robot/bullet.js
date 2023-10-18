import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat'

class Bullet extends THREE.Group {
  constructor(engine, dimension, translation, linvel, color) {
    super()

    this.engine = engine

    this.loadModel(dimension, translation, linvel, color)
  }

  loadModel(dimension, translation, linvel, color) {
    let bodyDesc = RAPIER.RigidBodyDesc.dynamic()

    bodyDesc.setLinvel(linvel.x, linvel.y, linvel.z)

    if (translation) {
      bodyDesc.setTranslation(translation.x, translation.y, translation.z)
    }

    this.rigidBody = this.engine.world.createRigidBody(bodyDesc)
    let collider = RAPIER.ColliderDesc.ball(dimension.radius)

    this.engine.world.createCollider(collider, this.rigidBody)

    let bufferGeometry = new THREE.SphereGeometry(dimension.radius, 32, 32)

    const mesh = new THREE.Mesh(bufferGeometry, new THREE.MeshPhongMaterial({ color: color }))

    this.add(mesh)
  }

  update() {
    const position = this.rigidBody.translation()
    const rotation = this.rigidBody.rotation()

    this.position.x = position.x
    this.position.y = position.y
    this.position.z = position.z
    this.setRotationFromQuaternion(new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))
  }
}

export { Bullet }
