import * as THREE from 'three'
import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.

class Client extends THREE.EventDispatcher {
  constructor() {
    super()

    this.load()
  }

  async load() {
    this.client = new Colyseus.Client('ws://localhost:2567')
    this.room = await this.client.joinOrCreate('my_room')

    this.room.state.players.onAdd((player, sessionId) => {
      console.log('player joined', sessionId)

      const isMe = this.room.sessionId === sessionId

      player.onChange(() => {
        console.log(player, isMe)
      })
    })

    this.room.state.players.onRemove((player, sessionId) => {
      console.log('player left', sessionId)
    })
  }
}

export { Client }
