import * as THREE from 'three'
import { onKeyStroke } from '@vueuse/core'
import { convertClientData } from '@/utils/transform'
import { uuid } from '@/utils'

class Character {
  constructor(engine, player) {
    this.engine = engine
    this.player = player
    this.speed = 8
    this.velocity = new THREE.Vector3()
    this.onFloor = false
    this.walkDirection = new THREE.Vector3()
    this.rotateAngle = new THREE.Vector3(0, 1, 0)
    this.rotateQuarternion = new THREE.Quaternion()
    this.cameraTarget = new THREE.Vector3()
    this.keyStroke = {
      w: false,
      a: false,
      s: false,
      d: false
    }
    this.directionDic = [
      [
        ['LeftUp', 'Running', this.speed, Math.PI / 4],
        ['Up', 'Running', this.speed, 0],
        ['RightUp', 'Running', this.speed, -Math.PI / 4]
      ],
      [
        ['Left', 'Running', this.speed, Math.PI / 2],
        ['Stop', 'Idle', 0, 0],
        ['Right', 'Running', this.speed, -Math.PI / 2]
      ],
      [
        ['LeftDown', 'RunningBack', -this.speed * 0.6, -Math.PI / 4],
        ['Down', 'RunningBack', -this.speed * 0.6, 0],
        ['RightDown', 'RunningBack', -this.speed * 0.6, Math.PI / 4]
      ]
    ]
    this.direction = this.directionDic[1][1]
    // 客户端待确认状态
    this.pendingSyncs = []

    onKeyStroke(
      ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
      (e) => {
        e.preventDefault()
        this.keyStroke.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? true : this.keyStroke.a
        this.keyStroke.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? true : this.keyStroke.d
        this.keyStroke.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? true : this.keyStroke.w
        this.keyStroke.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? true : this.keyStroke.s
      },
      { eventName: 'keydown', dedupe: true }
    )

    onKeyStroke(
      ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
      (e) => {
        e.preventDefault()
        this.keyStroke.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? false : this.keyStroke.a
        this.keyStroke.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? false : this.keyStroke.d
        this.keyStroke.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? false : this.keyStroke.w
        this.keyStroke.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? false : this.keyStroke.s
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

    window.addEventListener('pointerdown', () => {
      if (this.player.emote !== 'Punch' && this.player.state !== 'Death') {
        this.punch()
      }
    })

    this.player.rigidBody.setTranslation(this.player.position)
    this.updateCameraTarget(new THREE.Vector3(0, 1, 5))
  }

  punch() {
    this.player.emotesHandler.Punch()
    window.setTimeout(() => {
      const direction = new THREE.Vector3()
      this.player.getWorldDirection(direction)
      this.engine.sendRoom('punch', {
        bulletId: uuid(8),
        position: this.player.position.clone().addScaledVector(direction, -1),
        linvel: new THREE.Vector3().copy(direction).multiplyScalar(-20)
      })
    }, 200)
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

    col += this.keyStroke.a ? -1 : 0
    col += this.keyStroke.d ? 1 : 0
    row += this.keyStroke.w ? -1 : 0
    row += this.keyStroke.s ? 1 : 0
    this.direction = this.directionDic[row][col]

    const translation = this.player.rigidBody.translation()
    const rotation = this.player.rigidBody.rotation()

    this.updateCameraTarget(this.engine.camera.position.clone().sub(this.player.position))
    this.player.position.copy(translation)
    this.player.quaternion.copy(rotation)
    this.player.state = this.direction[1]
  }

  sendServer() {
    const json = this.player.toJSON()
    this.pendingSyncs.push(json)
    this.engine.sendRoom('update_player', convertClientData(json))
  }

  setNextKinematic(dt) {
    const translation = this.player.rigidBody.translation()
    const nextQuaternion = this.player.quaternion.clone()
    const speed = this.direction[2]

    this.velocity.x = this.velocity.z = speed
    this.velocity.y = THREE.MathUtils.lerp(this.velocity.y, -9.81, 0.05)
    this.walkDirection.x = this.walkDirection.z = 0

    const angleYCameraDirection = Math.atan2(
      this.engine.camera.position.x - this.player.position.x,
      this.engine.camera.position.z - this.player.position.z
    )
    // diagonal movement angle offset
    const directionOffset = this.direction[3]

    // rotate model
    this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset)
    nextQuaternion.rotateTowards(this.rotateQuarternion, 0.2)

    // calculate direction
    this.engine.camera.getWorldDirection(this.walkDirection)
    this.walkDirection.y = 0
    this.walkDirection.normalize()
    this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)

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
