<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import * as THREE from 'three'
import SpriteMixer from '../utils/sprite-mixer'

var scene, camera, renderer
var clock, delta, spriteMixer, actionSprite
var actions = {}
const directions = {
  w: false,
  a: false,
  s: false,
  d: false
}

const directionDic = [
  [
    ['LeftUp', -1, 1],
    ['Up', 0, 1],
    ['RightUp', 1, 1]
  ],
  [
    ['Left', -1, 0],
    ['Stop', 0, 0],
    ['Right', 1, 0]
  ],
  [
    ['LeftDown', -1, -1],
    ['Down', 0, -1],
    ['RightDown', 1, -1]
  ]
]

// 默认不动
let direction = directionDic[1][1]
let preDirection = direction

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

function init() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 50)
  camera.position.z = 10
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setClearColor(0x101b29, 1)
  document.getElementById('container').appendChild(renderer.domElement)

  clock = new THREE.Clock()

  const loader = new THREE.TextureLoader()
  const texture = loader.load('./sprite/boy.png')

  spriteMixer = SpriteMixer()

  // An ActionSprite is instantiated with these arguments :
  // - which THREE.Texture to use
  // - the number of columns in your animation
  // - the number of rows in your animation
  actionSprite = spriteMixer.ActionSprite(texture, 9, 8)
  actionSprite.setFrame(0)

  // Two actions are created with these arguments :
  // - which actionSprite to use
  // - index of the beginning of the action
  // - index of the end of the action
  // - duration of ONE FRAME in the animation, in milliseconds
  actions.runStop = spriteMixer.Action(actionSprite, 0, 0, 40)

  actions.runLeftDown = spriteMixer.Action(actionSprite, 1, 8, 40)
  actions.runLeftDownStop = spriteMixer.Action(actionSprite, 0, 0, 40)

  actions.runDown = spriteMixer.Action(actionSprite, 10, 17, 40)
  actions.runDownStop = spriteMixer.Action(actionSprite, 9, 9, 40)

  actions.runRightDown = spriteMixer.Action(actionSprite, 19, 26, 40)
  actions.runRightDownStop = spriteMixer.Action(actionSprite, 18, 18, 40)

  actions.runLeft = spriteMixer.Action(actionSprite, 28, 35, 40)
  actions.runLeftStop = spriteMixer.Action(actionSprite, 27, 27, 40)

  actions.runLeftUp = spriteMixer.Action(actionSprite, 37, 44, 40)
  actions.runLeftUpStop = spriteMixer.Action(actionSprite, 36, 36, 40)

  actions.runRight = spriteMixer.Action(actionSprite, 46, 53, 40)
  actions.runRightStop = spriteMixer.Action(actionSprite, 45, 45, 40)

  actions.runRightUp = spriteMixer.Action(actionSprite, 55, 62, 40)
  actions.runRightUpStop = spriteMixer.Action(actionSprite, 54, 54, 40)

  actions.runUp = spriteMixer.Action(actionSprite, 64, 71, 40)
  actions.runUpStop = spriteMixer.Action(actionSprite, 63, 63, 40)

  actionSprite.scale.set(1.7, 2, 1)
  scene.add(actionSprite)
}

function loop() {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)

  delta = clock.getDelta()
  spriteMixer.update(delta)

  const unit = 0.05

  if (actionSprite) {
    actionSprite.position.x += direction[1] * unit
    actionSprite.position.y += direction[2] * unit
  }
}

function spriteAnimate() {
  let col = 1
  let row = 1

  preDirection = direction

  col += directions.a ? -1 : 0
  col += directions.d ? 1 : 0
  row += directions.w ? -1 : 0
  row += directions.s ? 1 : 0

  direction = directionDic[row][col]

  if (direction[0] === 'Stop' && preDirection[0] !== 'Stop') {
    actions['run' + preDirection[0] + direction[0]].playLoop()
  } else {
    actions['run' + direction[0]].playLoop()
  }
}

const debounceAnimate = useDebounceFn(() => {
  spriteAnimate()
}, 100)

onKeyStroke(
  ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
  (e) => {
    e.preventDefault()
    directions.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? true : directions.a
    directions.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? true : directions.d
    directions.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? true : directions.w
    directions.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? true : directions.s
    spriteAnimate()
  },
  { eventName: 'keydown', dedupe: true }
)

onKeyStroke(
  ['a', 'A', 'ArrowLeft', 'd', 'D', 'ArrowRight', 'w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
  (e) => {
    e.preventDefault()
    directions.a = ['a', 'A', 'ArrowLeft'].includes(e.key) ? false : directions.a
    directions.d = ['d', 'D', 'ArrowRight'].includes(e.key) ? false : directions.d
    directions.w = ['w', 'W', 'ArrowUp'].includes(e.key) ? false : directions.w
    directions.s = ['s', 'S', 'ArrowDown'].includes(e.key) ? false : directions.s
    debounceAnimate()
  },
  { eventName: 'keyup' }
)

onMounted(() => {
  init()
  loop()
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<style lang="scss" scoped></style>
