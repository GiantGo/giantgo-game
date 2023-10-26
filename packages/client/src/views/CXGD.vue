<template>
  <div id="container"></div>
  <div class="operator">
    <el-slider v-model="rotate" :min="-40" :max="40" :step="1" @input="rotateModel" />
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
import { CXGD } from '../models/cxgd'

let world, model

const rotate = ref(0)
const split = ref(false)
const opacity = ref(false)
const focus = ref('reset')
const focusItems = [
  {
    name: 'jiao',
    title: '脚',
    target: { x: 0, y: -6, z: 0 },
    spherical: { radius: 30, phi: 1.5437919695926463, theta: 3.013340719774144 }
  },
  {
    name: 'mingwen',
    title: '铭文',
    target: { x: -6, y: 6, z: 6 },
    spherical: { radius: 20, phi: 1.5595536338254037, theta: -0.28851214861705055 }
  },
  {
    name: 'yifu',
    title: '衣服',
    target: { x: 0, y: 0, z: -1 },
    spherical: { radius: 40, phi: 1.5707963267948966, theta: 0 }
  },
  {
    name: 'tou',
    title: '头',
    target: { x: 0, y: 6, z: -1 },
    spherical: { radius: 20, phi: 1.4286683975156138, theta: -0.09558304890136755 }
  },
  {
    name: 'faji',
    title: '发髻',
    target: { x: 0, y: 6, z: -1 },
    spherical: { radius: 30, phi: 1.2149865747997122, theta: 2.5586513764535024 }
  },
  {
    name: 'reset',
    title: '重置',
    target: { x: 0, y: 0, z: -1 },
    spherical: { radius: 60, phi: 1.5707963267948966, theta: 0 }
  }
]

function splitModel(split) {
  model.splitModel(split)
}

function opacityModel(opacity) {
  model.opacityModel(opacity)
}

function rotateModel(rotate) {
  model.rotateZhao = rotate
}

function focusModel(value) {
  const data = focusItems.find((i) => i.name === value)
  world.focusModel(data)
}

onMounted(() => {
  world = new World()
  model = new CXGD('./cxgd')
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
