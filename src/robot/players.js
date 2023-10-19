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
    player.position.x = data.position.x
    player.position.y = data.position.y
    player.position.z = data.position.z
    player.quaternion.x = data.quaternion.x
    player.quaternion.y = data.quaternion.y
    player.quaternion.z = data.quaternion.z
    player.quaternion.w = data.quaternion.w
    player.state = data.state
    player.emote = data.emote
    player.fadeToAction(player.emote || player.state, 0.2)
  }

  update(dt) {
    this.players.forEach((player) => {
      player.update(dt)
    })
  }
}

export { Players }
