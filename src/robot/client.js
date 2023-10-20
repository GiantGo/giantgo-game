import * as THREE from 'three'
import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.

class Client extends THREE.EventDispatcher {
  constructor(players) {
    super()

    this.players = players
    this.load()
  }

  async load() {
    this.client = new Colyseus.Client('ws://localhost:2567/test/server')
    this.room = await this.client.joinOrCreate('my_room')

    this.room.state.players.onAdd((player, sessionId) => {
      const isMe = this.room.sessionId === sessionId

      console.log('player joined', sessionId, isMe)

      if (!isMe) {
        this.players.addPlayer(sessionId)
      }

      player.onChange(() => {
        if (!isMe) {
          console.log(player)
          this.players.updatePlayer(sessionId, player)
        }
      })
    })

    this.room.state.players.onRemove((player, sessionId) => {
      this.players.removePlayer(sessionId)
      console.log('player left', sessionId)
    })
  }
}

export { Client }
