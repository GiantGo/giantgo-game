<template>
  <div id="container"></div>
  <div class="operator">
    <el-switch v-model="split" @change="splitModel" />
    <el-switch v-model="opacity" @change="opacityModel" />
    <el-radio-group v-model="focus" size="large" @change="focusModel">
      <el-radio-button v-for="item in focusItems" :key="item.name" :label="item.name">{{ item.title }}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { World } from '../models/world'
import { TFT } from '../models/tft'

let world, model

const split = ref(false)
const opacity = ref(false)
const focus = ref('reset')
const focusItems = [
  {
    name: 'long',
    title: '龙',
    target: { x: 5.2341511539334356, y: 1.8115384291325431, z: 4.1176166498866005 },
    spherical: { radius: 12.251389996424269, phi: 1.2212141685457136, theta: -0.5160486477685453 }
  },
  {
    name: 'feng',
    title: '凤',
    target: { x: -5.678530140999049, y: 1.1183546022219402, z: 0.672154998385697 },
    spherical: { radius: 10, phi: 1.0182607407291495, theta: -2.2506624046053245 }
  },
  {
    name: 'lu',
    title: '鹿',
    target: { x: 0, y: -4.779653898326491, z: 5.875845016045369 },
    spherical: { radius: 10, phi: 0.8959051092742718, theta: 0.17941576926377914 },
    minDistance: 6
  },
  {
    name: 'an',
    title: '案',
    target: { x: 0, y: 0, z: -1 },
    spherical: { radius: 39.8604725741288, phi: 0.44573177914027046, theta: -0.048847963957853055 }
  },
  {
    name: 'gou',
    title: '构',
    target: { x: -0.3765508488828831, y: 5.014251245390728, z: 1.0209967804492102 },
    spherical: { radius: 10.000000000000025, phi: 0.6425084358108344, theta: -0.07204908450772043 }
  },
  {
    name: 'reset',
    title: '重置',
    target: { x: 0, y: 0, z: -1 },
    spherical: { radius: 63.245553203367585, phi: 1.2490457723982544, theta: 0 }
  }
]

function splitModel(split) {
  model.splitModel(split)
}

function opacityModel(opacity) {
  model.opacityModel(opacity)
}

function focusModel(value) {
  const data = focusItems.find((i) => i.name === value)
  world.controls.minDistance = data.minDistance || 10
  world.focusModel(data)
}

onMounted(() => {
  world = new World()
  model = new TFT('./tft')
  world.camera.position.y = 20
  world.scene.add(model)
  world.update()
  world.addEventListener('update', () => {
    model.update()
  })
})
</script>

<style lang="scss" scoped>
.operator {
  top: 15%;
  right: 3%;
  position: absolute;
  z-index: 2;
  width: 100px;
  height: 60vh;
}
</style>
