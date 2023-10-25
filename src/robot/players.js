import * as THREE from 'three'
import { Player } from './player'

class Players extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.players = new Map()
  }

  addPlayer(sessionId, data) {
    const player = new Player(this.engine, data.color)
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
    player.applyServer(data)
  }

  update(dt) {
    this.players.forEach((player) => {
      player.update(dt)
    })
  }
}

export { Players }
