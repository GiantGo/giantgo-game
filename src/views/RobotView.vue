<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import RAPIER from '@dimforge/rapier3d-compat'
import { Engine } from '../robot/engine'
import { Character } from '../robot/character'
import { Player } from '../robot/player'
import { Players } from '../robot/players'
import { Bullets } from '../robot/bullets'
import { Terrain } from '../robot/terrain'

onMounted(() => {
  RAPIER.init().then(() => {
    let player, character
    const engine = new Engine()
    const players = new Players(engine)
    const bullets = new Bullets(engine)
    const terrain = new Terrain(engine)

    engine.scene.add(players)
    engine.scene.add(bullets)
    engine.scene.add(terrain)

    engine.update()
    engine.addEventListener('update', ({ dt }) => {
      bullets.update()
      players.update(dt)
      character && character.update(dt)
    })

    engine.addEventListener('punch', (args) => {
      bullets.addBullet(args)
    })

    engine.addEventListener('remove_player', ({ sessionId }) => {
      players.removePlayer(sessionId)
    })

    engine.addEventListener('add_player', ({ sessionId, data, isMe }) => {
      if (isMe) {
        player = new Player(engine, data.color)
        player.position.set(data.positionX, data.positionY, data.positionZ)
        engine.scene.add(player)
        character = new Character(engine, player)
      } else {
        players.addPlayer(sessionId, data)
      }
    })

    engine.addEventListener('update_player', ({ sessionId, data, isMe }) => {
      if (isMe) {
        console.log(data.positionX, data.positionZ)
      } else {
        players.updatePlayer(sessionId, data)
      }
    })
  })
})
</script>

<style lang="scss" scoped></style>
