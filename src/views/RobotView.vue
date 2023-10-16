<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import RAPIER from '@dimforge/rapier3d-compat'
import { Engine } from '../robot/engine'
import { Robot } from '../robot/robot'
import { Terrain } from '../robot/terrain'

onMounted(() => {
  RAPIER.init().then(() => {
    const engine = new Engine()
    const robot = new Robot(engine.world, engine.camera, engine.controls)
    const terrain = new Terrain(engine.world)

    engine.scene.add(robot)
    engine.scene.add(terrain)

    engine.update()
    engine.addEventListener('update', ({ dt }) => {
      robot.update(dt)
    })
  })
})
</script>

<style lang="scss" scoped></style>
