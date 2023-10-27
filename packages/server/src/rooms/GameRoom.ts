import { Room, Client } from '@colyseus/core'
import { RoomState, Player, Bullet, Vector3 } from './schema/RoomState'
const PLAYER_RADIUS = 0.25
const PUNCH_RADIUS = 0.5

function random(lower = 0, upper = 255) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

export class GameRoom extends Room<RoomState> {
  public onCreate(options: any) {
    this.setState(new RoomState())
    this.clock.start()

    this.onMessage('update_player', (client, data) => this.updatePlayer(client, data))
    this.onMessage('punch', (client, data) => this.punch(client, data))
    this.onMessage('add_bullet', (client, data) => this.addBullet(client, data))
    this.onMessage('update_bullet', (client, data) => this.updateBullet(client, data))

    this.setSimulationInterval((deltaTime) => this.update(deltaTime))
  }

  public onJoin(client: Client, options: any) {
    console.log(client.sessionId, 'joined!', options)
    this.addPlayer(client, options)
  }

  public onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!')
    this.removePlayer(client)
  }

  public onDispose() {
    console.log('room', this.roomId, 'disposing...')
  }

  addPlayer(client: Client, data: any) {
    const player = new Player()
    player.clientId = data.clientId
    player.color = data.color
    player.positionX = Math.random() * 60 - 35
    player.positionZ = Math.random() * 60 - 50
    player.positionY = 10
    this.state.players.set(client.sessionId, player)
  }

  updatePlayer(client: Client, data: any) {
    const player = this.state.players.get(client.sessionId)
    if (!player) return

    if (player.state !== 'Death') {
      player.state = data.state
      player.emote = data.emote
      player.positionX = data.positionX
      player.positionY = data.positionY
      player.positionZ = data.positionZ
      player.quaternionX = data.quaternionX
      player.quaternionY = data.quaternionY
      player.quaternionZ = data.quaternionZ
      player.quaternionW = data.quaternionW
    }
  }

  removePlayer(client: Client) {
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId)
    }
  }

  punch(client: Client, data: any) {
    this.state.players.forEach((player) => {
      if (
        (player.positionX - data.position.x) ** 2 + (player.positionZ - data.position.z) ** 2 <=
          (PLAYER_RADIUS + PUNCH_RADIUS) ** 2 &&
        player.positionY - data.position.y <= PLAYER_RADIUS * 2 &&
        player.state !== 'Death'
      ) {
        player.deathTime = this.clock.currentTime + 3000
        player.state = 'Death'
        player.emote = ''
      }
    })
  }

  addBullet(client: Client, data: any) {
    const player = this.state.players.get(client.sessionId)
    if (!player) return

    const bullet = new Bullet()
    const position = new Vector3()
    position.x = data.position.x
    position.y = data.position.y
    position.z = data.position.z
    const linvel = new Vector3()
    linvel.x = data.linvel.x
    linvel.y = data.linvel.y
    linvel.z = data.linvel.z
    bullet.color = player.color
    bullet.position = position
    bullet.linvel = linvel
    this.state.bullets.set(data.bulletId, bullet)
  }

  updateBullet(client: Client, data: any) {
    const bullet = this.state.bullets.get(data.bulletId)
    if (!bullet) return

    const position = new Vector3()
    position.x = data.position.x
    position.y = data.position.y
    position.z = data.position.z

    bullet.position = position
  }

  update(deltaTime: number) {
    // implement your physics or world updates here!
    // this is a good place to update the room state
    // console.log(this.clock.currentTime)
    this.state.players.forEach((player, sessionId) => {
      if (player.deathTime < this.clock.currentTime && player.state === 'Death') {
        player.state = 'Idle'
        player.deathTime = 0
      }
    })
  }
}
