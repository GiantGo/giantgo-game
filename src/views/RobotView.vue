<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import RAPIER from '@dimforge/rapier3d-compat'
import { Engine } from '../robot/engine'
import { Bullets } from '../robot/bullets'
import { Robot } from '../robot/robot'
import { Terrain } from '../robot/terrain'

onMounted(() => {
  RAPIER.init().then(() => {
    const engine = new Engine()
    const bullets = new Bullets(engine)
    const robot = new Robot(engine)
    const terrain = new Terrain(engine)

    engine.scene.add(bullets)
    engine.scene.add(robot)
    engine.scene.add(terrain)

    engine.update()
    engine.addEventListener('update', ({ dt }) => {
      robot.update(dt)
      bullets.update()
    })
  })
})
</script>

<style lang="scss" scoped></style>
