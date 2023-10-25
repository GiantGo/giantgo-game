import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat'

class Bullet extends THREE.Group {
  constructor(engine, args) {
    super()

    this.engine = engine

    this.loadModel(args)
  }

  loadModel({ radius, translation, linvel, color }) {
    let bodyDesc = RAPIER.RigidBodyDesc.dynamic()

    bodyDesc.setLinvel(linvel.x, 10, linvel.z)

    if (translation) {
      bodyDesc.setTranslation(translation.x, translation.y, translation.z)
    }

    this.rigidBody = this.engine.world.createRigidBody(bodyDesc)
    let collider = RAPIER.ColliderDesc.ball(radius)

    this.engine.world.createCollider(collider, this.rigidBody)

    let bufferGeometry = new THREE.SphereGeometry(radius, 32, 32)

    const mesh = new THREE.Mesh(bufferGeometry, new THREE.MeshPhongMaterial({ color: color }))

    this.add(mesh)
  }

  update() {
    const position = this.rigidBody.translation()
    const rotation = this.rigidBody.rotation()

    this.position.copy(position)
    this.quaternion.copy(rotation)
  }
}

export { Bullet }
