import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'

const CONTROLLER_BODY_RADIUS = 0.25

class Character {
  constructor(engine, player) {
    this.engine = engine
    this.player = player
    this.toggleRun = true
    this.runVelocity = 4
    this.walkVelocity = 2
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
    this.directionDic = [
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
    this.direction = this.directionDic[1][1]

    const debounceAnimate = useDebounceFn(() => {
      this.animate()
    }, 100)

    onKeyStroke(
      ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
      (e) => {
        e.preventDefault()
        this.directions.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? true : this.directions.a
        this.directions.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? true : this.directions.d
        this.directions.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? true : this.directions.w
        this.directions.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? true : this.directions.s
        this.animate()
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
        debounceAnimate()
      },
      { eventName: 'keyup' }
    )

    onKeyStroke(
      'Shift',
      (e) => {
        e.preventDefault()
        this.toggleRun = !this.toggleRun
        debounceAnimate()
      },
      { eventName: 'keyup' }
    )

    onKeyStroke(
      ' ',
      (e) => {
        e.preventDefault()
        if (this.onFloor) {
          this.velocity.y = 15
          this.player.emotesHandler.Jump()
        }
      },
      { eventName: 'keyup' }
    )

    onKeyStroke(
      ['j', 'J', '1'],
      (e) => {
        e.preventDefault()
        this.shot()
      },
      { eventName: 'keyup' }
    )

    // document.addEventListener('mouseup', () => {
    //   this.shot()
    // })

    this.loadModel()
  }

  loadModel() {
    // RIGID BODY
    let bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(-5, 2.4, -0.5)
    this.rigidBody = this.engine.world.createRigidBody(bodyDesc)
    let dynamicCollider = RAPIER.ColliderDesc.capsule(CONTROLLER_BODY_RADIUS, CONTROLLER_BODY_RADIUS)
    this.collider = this.engine.world.createCollider(dynamicCollider, this.rigidBody)
  }

  animate() {
    let col = 1
    let row = 1

    col += this.directions.a ? -1 : 0
    col += this.directions.d ? 1 : 0
    row += this.directions.w ? -1 : 0
    row += this.directions.s ? 1 : 0

    this.direction = this.directionDic[row][col]
    this.player.state = this.direction[0] === 'Stop' ? 'Idle' : this.toggleRun ? 'Running' : 'Walking'
    this.player.fadeToAction(this.player.state, 0.2)
  }

  shot() {
    const direction = new THREE.Vector3()
    this.player.getWorldDirection(direction)
    this.engine.dispatchEvent({
      type: 'shot',
      dimension: { radius: 0.2 },
      translation: this.player.position.clone().addScaledVector(direction, -1),
      linvel: new THREE.Vector3().copy(direction).multiplyScalar(-20),
      color: 'red'
    })
    this.player.emotesHandler.Punch()
  }

  updateCameraTarget(offset) {
    // move camera
    const rigidTranslation = this.rigidBody.translation()
    this.engine.camera.position.x = rigidTranslation.x + offset.x
    this.engine.camera.position.y = rigidTranslation.y + offset.y
    this.engine.camera.position.z = rigidTranslation.z + offset.z

    // update camera target
    this.cameraTarget.x = rigidTranslation.x
    this.cameraTarget.y = rigidTranslation.y + 1
    this.cameraTarget.z = rigidTranslation.z
    this.engine.controls.target = this.cameraTarget
  }

  update(dt) {
    if (this.mixer) this.mixer.update(dt)

    if (!this.rigidBody) return

    this.velocity.x = this.velocity.z =
      this.direction[0] === 'Stop' ? 0 : this.toggleRun ? this.runVelocity : this.walkVelocity
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
      this.player.quaternion.rotateTowards(this.rotateQuarternion, 0.2)

      // calculate direction
      this.engine.camera.getWorldDirection(this.walkDirection)
      this.walkDirection.y = 0
      this.walkDirection.normalize()
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)
    }

    const translation = this.rigidBody.translation()

    if (translation.y < -10) {
      // don't fall below ground
      this.rigidBody.setNextKinematicTranslation({
        x: 0,
        y: 10,
        z: 0
      })
    } else {
      const cameraPositionOffset = this.engine.camera.position.clone().sub(this.player.position)
      this.updateCameraTarget(cameraPositionOffset)

      // update model and camera
      this.player.position.x = translation.x
      this.player.position.y = translation.y
      this.player.position.z = translation.z

      this.walkDirection.y = 1
      this.walkDirection.multiply(this.velocity.clone().multiplyScalar(dt))

      this.engine.characterController.computeColliderMovement(
        this.collider, // The collider we would like to move.
        this.walkDirection
      )

      let correctedMovement = this.engine.characterController.computedMovement()

      this.onFloor = Math.abs(this.walkDirection.y - correctedMovement.y) > 0.001

      if (this.onFloor) {
        this.velocity.y = 0
      }

      this.rigidBody.setNextKinematicTranslation({
        x: translation.x + correctedMovement.x,
        y: translation.y + correctedMovement.y,
        z: translation.z + correctedMovement.z
      })
    }
  }
}

export { Character }
