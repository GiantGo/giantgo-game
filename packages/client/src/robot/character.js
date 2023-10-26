import * as THREE from 'three'
import { onKeyStroke } from '@vueuse/core'
import { convertClientData } from '@/utils/transform'
import { uuid } from '@/utils/uuid'

const directionDic = [
  [
    ['LeftUp', Math.PI / 4],
    ['Up', 0],
    ['RightUp', -Math.PI / 4]
  ],
  [
    ['Left', Math.PI / 2],
    ['Stop', 0],
    ['Right', -Math.PI / 2]
  ],
  [
    ['LeftDown', Math.PI / 4 + Math.PI / 2],
    ['Down', Math.PI],
    ['RightDown', -Math.PI / 4 - Math.PI / 2]
  ]
]

class Character {
  constructor(engine, player) {
    this.engine = engine
    this.player = player
    this.speed = 4
    this.velocity = new THREE.Vector3()
    this.onFloor = false
    this.walkDirection = new THREE.Vector3()
    this.rotateAngle = new THREE.Vector3(0, 1, 0)
    this.rotateQuarternion = new THREE.Quaternion()
    this.cameraTarget = new THREE.Vector3()
    this.directions = {
      w: false,
      a: false,
      s: false,
      d: false
    }

    this.direction = directionDic[1][1]
    // 客户端待确认状态
    this.pendingSyncs = []

    onKeyStroke(
      ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
      (e) => {
        e.preventDefault()
        this.directions.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? true : this.directions.a
        this.directions.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? true : this.directions.d
        this.directions.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? true : this.directions.w
        this.directions.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? true : this.directions.s
      },
      { eventName: 'keydown', dedupe: true }
    )

    onKeyStroke(
      ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
      (e) => {
        e.preventDefault()
        this.directions.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? false : this.directions.a
        this.directions.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? false : this.directions.d
        this.directions.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? false : this.directions.w
        this.directions.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? false : this.directions.s
      },
      { eventName: 'keyup' }
    )

    onKeyStroke(
      ' ',
      (e) => {
        e.preventDefault()
        if (this.onFloor && this.player.state !== 'Death') {
          this.velocity.y = 15
          this.player.emotesHandler.Jump()
        }
      },
      { eventName: 'keydown', dedupe: true }
    )

    onKeyStroke(
      ['j', 'J', '1'],
      (e) => {
        e.preventDefault()
        if (this.player.emote !== 'Punch' && this.player.state !== 'Death') {
          this.punch()
        }
      },
      { eventName: 'keyup' }
    )

    this.player.rigidBody.setTranslation(this.player.position)
    this.updateCameraTarget(new THREE.Vector3(0, 1, 5))
  }

  punch() {
    const direction = new THREE.Vector3()
    this.player.getWorldDirection(direction)
    this.engine.room.send('punch', {
      bulletId: uuid(8),
      position: this.player.position.clone().addScaledVector(direction, -1),
      linvel: new THREE.Vector3().copy(direction).multiplyScalar(-20)
    })

    this.player.emotesHandler.Punch()
  }

  updateCameraTarget(offset) {
    // move camera
    const rigidTranslation = this.player.rigidBody.translation()
    this.engine.camera.position.x = rigidTranslation.x + offset.x
    this.engine.camera.position.y = rigidTranslation.y + offset.y
    this.engine.camera.position.z = rigidTranslation.z + offset.z

    // update camera target
    this.cameraTarget.x = rigidTranslation.x
    this.cameraTarget.y = rigidTranslation.y + 1
    this.cameraTarget.z = rigidTranslation.z
    this.engine.controls.target = this.cameraTarget
  }

  applyServer(data) {
    // 重置为服务器权威状态
    this.player.position.copy(data.position)
    this.player.quaternion.copy(data.quaternion)
    this.player.rigidBody.setTranslation(data.position)
    this.player.state = data.state
    this.player.emote = data.emote
    this.pendingSyncs.forEach((pending) => {
      if (this.player.state !== 'Death') {
        this.player.position.copy(pending.position)
        this.player.quaternion.copy(pending.quaternion)
        this.player.rigidBody.setTranslation(pending.position)
        this.player.state = pending.state
        this.player.emote = pending.emote
      }
    })
    this.pendingSyncs = []
  }

  setState() {
    let col = 1
    let row = 1

    col += this.directions.a ? -1 : 0
    col += this.directions.d ? 1 : 0
    row += this.directions.w ? -1 : 0
    row += this.directions.s ? 1 : 0
    this.direction = directionDic[row][col]

    const translation = this.player.rigidBody.translation()
    const rotation = this.player.rigidBody.rotation()

    this.updateCameraTarget(this.engine.camera.position.clone().sub(this.player.position))
    this.player.position.copy(translation)
    this.player.quaternion.copy(rotation)
    this.player.state = this.direction[0] === 'Stop' ? 'Idle' : 'Running'
  }

  sendServer() {
    if (this.engine.room) {
      const json = this.player.toJSON()
      this.pendingSyncs.push(json)
      this.engine.room.send('update_player', convertClientData(json))
    }
  }

  setNextKinematic(dt) {
    const translation = this.player.rigidBody.translation()
    const nextQuaternion = this.player.quaternion.clone()

    this.velocity.x = this.velocity.z = this.direction[0] === 'Stop' ? 0 : this.speed
    this.velocity.y = THREE.MathUtils.lerp(this.velocity.y, -9.81, 0.05)
    this.walkDirection.x = this.walkDirection.z = 0

    if (this.direction[0] !== 'Stop') {
      var angleYCameraDirection = Math.atan2(
        this.engine.camera.position.x - this.player.position.x,
        this.engine.camera.position.z - this.player.position.z
      )
      // diagonal movement angle offset
      var directionOffset = this.direction[1]

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset)
      nextQuaternion.rotateTowards(this.rotateQuarternion, 0.2)

      // calculate direction
      this.engine.camera.getWorldDirection(this.walkDirection)
      this.walkDirection.y = 0
      this.walkDirection.normalize()
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)
    }

    if (translation.y < -10) {
      // don't fall below ground
      this.player.rigidBody.setNextKinematicTranslation({
        x: 0,
        y: 10,
        z: 0
      })
    } else {
      this.walkDirection.y = 1
      this.walkDirection.multiply(this.velocity.clone().multiplyScalar(dt))

      this.engine.characterController.computeColliderMovement(
        this.player.collider, // The collider we would like to move.
        this.walkDirection
      )

      let correctedMovement = this.engine.characterController.computedMovement()

      this.onFloor = Math.abs(this.walkDirection.y - correctedMovement.y) > 0.001

      if (this.onFloor) {
        this.velocity.y = 0
      }

      const nextPosition = new THREE.Vector3().addVectors(translation, correctedMovement)

      this.player.rigidBody.setNextKinematicTranslation(nextPosition)
      this.player.rigidBody.setNextKinematicRotation(nextQuaternion)
    }
  }

  update(dt) {
    this.player.update(dt)

    if (this.player.state === 'Death') return

    this.setState()
    this.sendServer()
    this.setNextKinematic(dt)
  }
}

export { Character }
