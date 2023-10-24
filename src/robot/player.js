import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

class Player extends THREE.Group {
  constructor(color) {
    super()

    this.state = 'Idle'
    this.emote = ''
    this.color = new THREE.Color(color)
    this.actions = {}
    this.emotesHandler = {}
    this.previousAction = null
    this.activeAction = null
    this.restoreStateHandler = this.restoreState.bind(this)

    this.loadModel()
  }

  loadModel() {
    return new Promise((resolve) => {
      const loader = new GLTFLoader()
      loader.load('./robot/Robot.glb', (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.translateY(-0.5)

        this.model.traverse((child) => {
          if (child.isMesh) {
            if (child.material.name === 'Main') {
              child.material.color = this.color
            }
          }
        })

        this.add(this.model)
        this.mixer = new THREE.AnimationMixer(this.model)

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

        this.fadeToAction()

        resolve()
      })
    })
  }

  createEmoteCallback(name) {
    this.emotesHandler[name] = () => {
      this.emote = name
      this.fadeToAction()
      this.mixer.addEventListener('finished', this.restoreStateHandler)
    }
  }

  restoreState() {
    this.emote = ''
    this.fadeToAction()
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

  applyServer(data) {
    this.tween = new TWEEN.Tween({
      position: this.position,
      quaternion: this.quaternion
    })
      .to({ position: data.position, quaternion: data.quaternion }, 50)
      .onUpdate((object) => {
        this.position.copy(object.position)
        this.quaternion.copy(object.quaternion)
      })
      .easing(TWEEN.Easing.Linear.None)
      .start()
    this.state = data.state
    this.emote = data.emote
    this.fadeToAction()
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
  }
}

export { Player }
