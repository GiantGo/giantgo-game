import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

class Player extends THREE.Group {
  constructor() {
    super()

    this.state = 'Idle'
    this.emote = ''
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
        const model = gltf.scene
        model.scale.set(0.2, 0.2, 0.2)
        model.translateY(-0.5)

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

        this.fadeToAction('Idle', 0.2)

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

  fadeToAction(name, duration) {
    this.previousAction = this.activeAction
    this.activeAction = this.actions[name]

    if (this.previousAction !== this.activeAction && this.activeAction) {
      this.previousAction && this.previousAction.fadeOut(duration)
      this.activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
    }
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
