import { Schema, type, MapSchema } from '@colyseus/schema'

export class Vector3 extends Schema {
  @type('number') x: number = 0
  @type('number') y: number = 0
  @type('number') z: number = 0
}

export class Quaternion extends Schema {
  @type('number') x: number = 0
  @type('number') y: number = 0
  @type('number') z: number = 0
  @type('number') w: number = 0
}

export class Bullet extends Schema {
  @type('string') color = ''
  @type('number') radius = 0.5
  @type(Vector3) position = new Vector3()
  @type(Quaternion) quaternion = new Quaternion()
  @type(Vector3) linvel = new Vector3()
}

export class Player extends Schema {
  @type('string') public state = 'Idle'
  @type('string') public emote = ''
  @type('string') color = ''
  @type('number') positionX: number = 0
  @type('number') positionY: number = 0
  @type('number') positionZ: number = 0
  @type('number') quaternionX: number = 0
  @type('number') quaternionY: number = 0
  @type('number') quaternionZ: number = 0
  @type('number') quaternionW: number = 0
  @type('number') deathTime: number = 0
}

export class RoomState extends Schema {
  @type({ map: Player }) public players = new MapSchema<Player>()
  @type({ map: Bullet }) bullets = new MapSchema<Bullet>()
}
