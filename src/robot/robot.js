import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import RAPIER from '@dimforge/rapier3d-compat'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'

const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']
const CONTROLLER_BODY_RADIUS = 0.25

class Robot extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.state = 'Idle'
    this.emote = ''
    this.actions = {}
    this.emotesHandler = {}
    this.previousAction = null
    this.activeAction = null
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
    this.restoreStateHandler = this.restoreState.bind(this)

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
          this.emotesHandler.Jump()
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

    document.addEventListener('mouseup', () => {
      this.shot()
    })

    this.loadModel()
  }

  loadModel() {
    return new Promise((resolve) => {
      const loader = new GLTFLoader()
      loader.load('./robot/Robot.glb', (gltf) => {
        const model = gltf.scene
        model.scale.set(0.2, 0.2, 0.2)
        model.translateY(-CONTROLLER_BODY_RADIUS * 2)

        this.add(model)
        this.mixer = new THREE.AnimationMixer(model)

        for (let i = 0; i < gltf.animations.length; i++) {
          const clip = gltf.animations[i]
          const action = this.mixer.clipAction(clip)
          this.actions[clip.name] = action

          if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
            action.clampWhenFinished = true
            action.loop = THREE.LoopOnce
          }
        }

        for (let i = 0; i < emotes.length; i++) {
          this.createEmoteCallback(emotes[i])
        }

        // RIGID BODY
        let bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(-5, 2.4, -0.5)
        this.rigidBody = this.engine.world.createRigidBody(bodyDesc)
        let dynamicCollider = RAPIER.ColliderDesc.capsule(CONTROLLER_BODY_RADIUS, CONTROLLER_BODY_RADIUS)
        this.collider = this.engine.world.createCollider(dynamicCollider, this.rigidBody)
        this.characterController = this.engine.world.createCharacterController(0.01)
        this.characterController.setMaxSlopeClimbAngle((45 * Math.PI) / 180)
        this.characterController.enableAutostep(0.5, 0.2, true)
        this.characterController.enableSnapToGround(0.5)

        this.animate(0.2)
        resolve()
      })
    })
  }

  createEmoteCallback(name) {
    this.emotesHandler[name] = () => {
      this.emote = name
      this.fadeToAction(name, 0.2)
      this.mixer.addEventListener('finished', this.restoreStateHandler)
    }
  }

  restoreState() {
    this.emote = ''
    this.fadeToAction(this.state, 0.2)
    this.mixer.removeEventListener('finished', this.restoreStateHandler)
  }

  animate() {
    let col = 1
    let row = 1

    col += this.directions.a ? -1 : 0
    col += this.directions.d ? 1 : 0
    row += this.directions.w ? -1 : 0
    row += this.directions.s ? 1 : 0

    this.direction = this.directionDic[row][col]

    if (this.direction[0] === 'Stop') {
      this.state = 'Idle'
    } else {
      this.state = this.toggleRun ? 'Running' : 'Walking'
    }

    this.fadeToAction(this.state, 0.2)
  }

  fadeToAction(name, duration) {
    this.previousAction = this.activeAction
    this.activeAction = this.actions[name]

    if (this.previousAction !== this.activeAction) {
      this.previousAction && this.previousAction.fadeOut(duration)
      this.activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
    }
  }

  shot() {
    const direction = new THREE.Vector3()
    this.getWorldDirection(direction)
    this.engine.dispatchEvent({
      type: 'shot',
      dimension: { radius: 0.2 },
      translation: this.position.clone().addScaledVector(direction, -1),
      linvel: new THREE.Vector3().copy(direction).multiplyScalar(-20),
      color: 'red'
    })
    this.emotesHandler['Punch']()
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
        this.engine.camera.position.x - this.position.x,
        this.engine.camera.position.z - this.position.z
      )
      // diagonal movement angle offset
      var directionOffset = this.direction[1]

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset)
      this.quaternion.rotateTowards(this.rotateQuarternion, 0.2)

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
      const cameraPositionOffset = this.engine.camera.position.clone().sub(this.position)
      this.updateCameraTarget(cameraPositionOffset)

      // update model and camera
      this.position.x = translation.x
      this.position.y = translation.y
      this.position.z = translation.z

      this.walkDirection.y = 1
      this.walkDirection.multiply(this.velocity.clone().multiplyScalar(dt))

      this.characterController.computeColliderMovement(
        this.collider, // The collider we would like to move.
        this.walkDirection
      )

      let correctedMovement = this.characterController.computedMovement()

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

export { Robot }
