<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import RAPIER from '@dimforge/rapier3d-compat'
import { Engine } from '../robot/engine'
import { Client } from '../robot/client'
import { Character } from '../robot/character'
import { Player } from '../robot/player'
import { Bullets } from '../robot/bullets'
import { Terrain } from '../robot/terrain'

onMounted(() => {
  RAPIER.init().then(() => {
    const engine = new Engine()
    const client = new Client()
    const player = new Player(engine)
    const character = new Character(engine, player)
    const bullets = new Bullets(engine)
    const terrain = new Terrain(engine)

    engine.scene.add(player)
    engine.scene.add(bullets)
    engine.scene.add(terrain)

    engine.update()
    engine.addEventListener('update', ({ dt }) => {
      bullets.update()
      character.update(dt)
      player.update(dt)

      if (client.room) {
        client.room.send('update_player', player.toJSON())
      }
    })
  })
})
</script>

<style lang="scss" scoped></style>
