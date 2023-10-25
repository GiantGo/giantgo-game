import * as THREE from 'three'
import { Player } from './player'
import { Character } from '../robot/character'
import { convertServerData } from '@/utils/transform'

class Players extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.players = new Map()

    this.engine.room.state.players.onAdd((player, sessionId) => {
      const isMe = this.engine.room.sessionId === sessionId
      const data = convertServerData(player)

      if (isMe) {
        const myPlayer = new Player(engine, data.color)
        myPlayer.position.copy(data.position)
        engine.scene.add(myPlayer)
        this.character = new Character(engine, myPlayer)
      } else {
        this.addPlayer(sessionId, data)
      }

      player.onChange(() => {
        const data = convertServerData(player)
        if (isMe) {
          this.character.applyServer(data)
        } else {
          this.updatePlayer(sessionId, data)
        }
      })
    })

    this.engine.room.state.players.onRemove((player, sessionId) => {
      this.removePlayer(sessionId)
    })
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
    this.character && this.character.update(dt)
    this.players.forEach((player) => {
      player.update(dt)
    })
  }
}

export { Players }
