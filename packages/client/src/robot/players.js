import * as THREE from 'three'
import { Player } from './player'
import { Character } from '../robot/character'
import { convertServerData } from '@/utils/transform'

class Players extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.players = new Map()

    this.engine.addEventListener('room_ready', () => this.roomReady())
  }

  roomReady() {
    this.clearPlayers()
    this.engine.room.state.players.onAdd((player) => {
      const isMe = this.engine.clientId === player.clientId
      const data = convertServerData(player)

      if (isMe) {
        if (!this.mine) {
          this.mine = new Player(this.engine, data.color)
          this.mine.position.copy(data.position)
          this.add(this.mine)
          this.character = new Character(this.engine, this.mine)
        }
      } else {
        this.addPlayer(player.clientId, data)
      }

      player.onChange(() => {
        const data = convertServerData(player)
        if (isMe) {
          this.character.applyServer(data)
        } else {
          this.updatePlayer(player.clientId, data)
        }
      })
    })

    this.engine.room.state.players.onRemove((player) => {
      this.removePlayer(player.clientId)
    })
  }

  addPlayer(clientId, data) {
    const player = new Player(this.engine, data.color)
    this.add(player)
    this.players.set(clientId, player)
    return player
  }

  removePlayer(clientId) {
    const player = this.players.get(clientId)
    this.remove(player)
    this.players.delete(clientId)
  }

  updatePlayer(clientId, data) {
    let player = this.players.get(clientId)
    player.applyServer(data)
  }

  clearPlayers() {
    this.players.forEach((player) => {
      this.remove(player)
      this.players.clear()
    })
  }

  update(dt) {
    this.character && this.character.update(dt)
    this.players.forEach((player) => {
      player.update(dt)
    })
  }
}

export { Players }
