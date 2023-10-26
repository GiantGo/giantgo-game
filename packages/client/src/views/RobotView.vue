<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Engine } from '../robot/engine'
import { Players } from '../robot/players'
import { Bullets } from '../robot/bullets'
import { Terrain } from '../robot/terrain'

onMounted(() => {
  const engine = new Engine()

  engine.init().then(() => {
    const players = new Players(engine)
    const bullets = new Bullets(engine)
    const terrain = new Terrain(engine)

    engine.scene.add(players)
    engine.scene.add(bullets)
    engine.scene.add(terrain)

    engine.addEventListener('update', ({ dt }) => {
      bullets.update()
      players.update(dt)
    })
  })
})
</script>

<style lang="scss" scoped></style>
