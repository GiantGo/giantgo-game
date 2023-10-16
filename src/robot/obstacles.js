import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat'

const obstacles = [
  // ['static', 'cube', { hx: 10, hy: 0.8, hz: 10 }, { x: 35, y: 2.5, z: 0 }, { x: 0, y: 0, z: 0.3 }, 'pink'],
  ['dynamic', 'sphere', { radius: 0.28 }, { x: 0.5, y: 15, z: -0.5 }, { x: 0, y: 1, z: 0 }, 'blue'],
  ['dynamic', 'sphere', { radius: 0.28 }, { x: 2, y: 15, z: -0.5 }, { x: 0, y: 1, z: 0 }, 'red'],
  ['dynamic', 'sphere', { radius: 0.28 }, { x: 3, y: 15, z: -0.5 }, { x: 0, y: 1, z: 0 }, 'yellow'],
  ['dynamic', 'sphere', { radius: 0.28 }, { x: 4, y: 15, z: -0.5 }, { x: 0, y: 1, z: 0 }, 'black']
]

class Obstacles extends THREE.Group {
  constructor(world) {
    super()

    this.world = world
    this.bodys = obstacles.map((obstacle) => this.loadModel(...obstacle))
  }

  loadModel(bodyType, colliderType, dimension, translation, rotation, color) {
    let bodyDesc

    if (bodyType === 'dynamic') {
      bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    } else if (bodyType === 'kinematicPositionBased') {
      bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
    } else if (bodyType === 'static') {
      bodyDesc = RAPIER.RigidBodyDesc.fixed()
      bodyDesc.setCanSleep(false)
    }

    if (translation) {
      bodyDesc.setTranslation(translation.x, translation.y, translation.z)
    }

    if (rotation) {
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rotation.x, rotation.y, rotation.z, 'XYZ'))
      bodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w })
    }

    const rigidBody = this.world.createRigidBody(bodyDesc)

    let collider
    if (colliderType === 'cube') {
      collider = RAPIER.ColliderDesc.cuboid(dimension.hx, dimension.hy, dimension.hz)
    } else if (colliderType === 'sphere') {
      collider = RAPIER.ColliderDesc.ball(dimension.radius)
    } else if (colliderType === 'cylinder') {
      collider = RAPIER.ColliderDesc.cylinder(dimension.hh, dimension.radius)
    } else if (colliderType === 'cone') {
      collider = RAPIER.ColliderDesc.cone(dimension.hh, dimension.radius)
      // cone center of mass is at bottom
      collider.centerOfMass = { x: 0, y: 0, z: 0 }
    }

    this.world.createCollider(collider, rigidBody)

    let bufferGeometry
    if (colliderType === 'cube') {
      bufferGeometry = new THREE.BoxGeometry(dimension.hx * 2, dimension.hy * 2, dimension.hz * 2)
    } else if (colliderType === 'sphere') {
      bufferGeometry = new THREE.SphereGeometry(dimension.radius, 32, 32)
    } else if (colliderType === 'cylinder') {
      bufferGeometry = new THREE.CylinderGeometry(dimension.radius, dimension.radius, dimension.hh * 2, 32, 32)
    } else if (colliderType === 'cone') {
      bufferGeometry = new THREE.ConeGeometry(dimension.radius, dimension.hh * 2, 32, 32)
    }

    const mesh = new THREE.Mesh(bufferGeometry, new THREE.MeshPhongMaterial({ color: color }))
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.add(mesh)

    return {
      rigidBody,
      mesh
    }
  }

  update() {
    this.bodys.forEach(({ rigidBody, mesh }) => {
      const position = rigidBody.translation()
      const rotation = rigidBody.rotation()

      mesh.position.x = position.x
      mesh.position.y = position.y
      mesh.position.z = position.z
      mesh.setRotationFromQuaternion(new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))
    })
  }
}

export { Obstacles }
