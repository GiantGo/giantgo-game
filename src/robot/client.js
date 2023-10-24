import * as THREE from 'three'
import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.

class Client extends THREE.EventDispatcher {
  constructor() {
    super()

    this.load()
  }

  async load() {
    this.client = new Colyseus.Client('ws://localhost:2567/test/server')
    this.room = await this.client.joinOrCreate('my_room')

    this.room.state.players.onAdd((player, sessionId) => {
      const isMe = this.room.sessionId === sessionId

      this.dispatchEvent({ type: 'add_player', sessionId, data: player, isMe })

      player.onChange(() => {
        this.dispatchEvent({ type: 'update_player', sessionId, data: player, isMe })
      })
    })

    this.room.state.players.onRemove((player, sessionId) => {
      this.dispatchEvent({ type: 'remove_player', sessionId })
    })
  }
}

export { Client }
