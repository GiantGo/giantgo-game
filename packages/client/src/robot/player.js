import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import RAPIER from '@dimforge/rapier3d-compat'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const states = ['Idle', 'Running', 'RunningBack', 'Death']
const emotes = ['Jump', 'Punch']
const CONTROLLER_BODY_RADIUS = 0.4

class Player extends THREE.Group {
  constructor(engine, color) {
    super()

    this.engine = engine
    this.state = 'Idle'
    this.emote = ''
    this.color = new THREE.Color(color)
    this.actions = {}
    this.emotesHandler = {}
    this.previousAction = null
    this.activeAction = null
    this.restoreStateHandler = this.restoreState.bind(this)

    this.loadModel()
    this.loadRigidBody()
  }

  loadModel() {
    return new Promise((resolve) => {
      const loader = new GLTFLoader()
      loader.load('./robot/Bot.glb', (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(0.01, 0.01, 0.01)

        this.model.traverse((child) => {
          if (child.isMesh) {
            child.material.color = this.color
          }
        })

        this.add(this.model)
        this.mixer = new THREE.AnimationMixer(this.model)

        for (let i = 0; i < gltf.animations.length; i++) {
          const clip = gltf.animations[i]
          const action = this.mixer.clipAction(clip)
          this.actions[clip.name] = action

          if (emotes.indexOf(clip.name) > -1 || states.indexOf(clip.name) >= 3) {
            action.clampWhenFinished = true
            action.loop = THREE.LoopOnce
          }
        }

        for (let i = 0; i < emotes.length; i++) {
          this.createEmoteCallback(emotes[i])
        }

        resolve()
      })
    })
  }

  createEmoteCallback(name) {
    this.emotesHandler[name] = () => {
      this.emote = name
      this.mixer.addEventListener('finished', this.restoreStateHandler)
    }
  }

  restoreState() {
    this.emote = ''
    this.mixer.removeEventListener('finished', this.restoreStateHandler)
  }

  fadeToAction(duration = 0.2) {
    this.previousAction = this.activeAction
    this.activeAction = this.actions[this.emote || this.state]

    if (!this.activeAction) return

    if (this.previousAction !== this.activeAction) {
      this.previousAction && this.previousAction.fadeOut(duration)
      this.activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
    }
  }

  loadRigidBody() {
    let bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
    this.rigidBody = this.engine.world.createRigidBody(bodyDesc)
    let dynamicCollider = RAPIER.ColliderDesc.capsule(0.7, CONTROLLER_BODY_RADIUS)
    this.collider = this.engine.world.createCollider(dynamicCollider, this.rigidBody)
  }

  // 应用服务器端状态
  applyServer(data) {
    this.tween = new TWEEN.Tween({
      position: this.position,
      quaternion: this.quaternion
    })
      .to({ position: data.position, quaternion: data.quaternion }, 50)
      .onUpdate((object) => {
        this.position.copy(object.position)
        this.quaternion.copy(object.quaternion)
        this.rigidBody.setTranslation(object.position)
      })
      .easing(TWEEN.Easing.Linear.None)
      .start()
    this.state = data.state
    this.emote = data.emote
  }

  toJSON() {
    return {
      position: { x: this.position.x, y: this.position.y, z: this.position.z },
      quaternion: { x: this.quaternion.x, y: this.quaternion.y, z: this.quaternion.z, w: this.quaternion.w },
      state: this.state,
      emote: this.emote
    }
  }

  update(dt) {
    if (this.mixer) this.mixer.update(dt)
    if (this.mixer1) this.mixer1.update(dt)
    this.fadeToAction()
  }
}

export { Player }
