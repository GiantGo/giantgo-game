import * as THREE from 'three'
import { Player } from './player'

class Players extends THREE.Group {
  constructor() {
    super()

    this.players = new Map()
  }

  addPlayer(sessionId) {
    const player = new Player()
    player.name = sessionId
    this.add(player)
    this.players.set(sessionId, player)
  }

  removePlayer(sessionId) {
    const player = this.players.get(sessionId)
    this.remove(player)
    this.players.delete(sessionId)
  }

  updatePlayer(sessionId, data) {
    const player = this.players.get(sessionId)
    // 应用服务器端状态
    player.applyServer({
      state: data.state,
      emote: data.emote,
      position: {
        x: data.positionX,
        y: data.positionY,
        z: data.positionZ
      },
      quaternion: {
        x: data.quaternionX,
        y: data.quaternionY,
        z: data.quaternionZ,
        w: data.quaternionW
      }
    })
  }

  update(dt) {
    this.players.forEach((player) => {
      player.update(dt)
    })
  }
}

export { Players }
