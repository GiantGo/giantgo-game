<template>
  <div id="container"></div>
  <div id="mobileInterface" class="noSelect" v-if="engine.isMobile">
    <div id="joystickWrapper1"></div>
    <div id="joystickWrapper2">
      <div id="punchButton">
        <p>PUNCH</p>
      </div>
      <div id="jumpButton">
        <p>JUMP</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Engine } from '../robot/engine'
import { Players } from '../robot/players'
import { Bullets } from '../robot/bullets'
import { Terrain } from '../robot/terrain'
const engine = new Engine()

onMounted(() => {
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

<style lang="scss" scoped>
#mobileInterface {
  position: fixed;
  width: calc(100% - 20px);
  height: 120px;
  pointer-events: none;
  z-index: 11;
  top: auto;
  bottom: 40px;
  left: 10px;
  touch-action: manipulation;

  #joystickWrapper1 {
    pointer-events: auto;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: transparent;
    width: 120px;
    height: 120px;
    z-index: 12;
    touch-action: manipulation;
  }

  #joystickWrapper2 {
    pointer-events: auto;
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    left: auto;
    background-color: transparent;
    width: 50vw;
    height: 120px;
    z-index: 12;
    touch-action: manipulation;

    #jumpButton,
    #punchButton {
      position: absolute;
      top: 0px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: rgba($color: white, $alpha: 0.2);
      opacity: 1;
      touch-action: manipulation;

      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: auto;

      p {
        position: relative;
        display: inline-block;
        color: white;
        opacity: 1;
        margin: 0;
        padding: 0;
        letter-spacing: 4px;
        margin-left: 4px;
      }
    }

    #punchButton {
      right: 140px;
    }

    #jumpButton {
      right: 0px;
    }
  }
}

.noSelect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
