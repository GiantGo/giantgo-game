import * as THREE from 'three'
import { Bullet } from './bullet'

class Bullets extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.bullets = []

    this.engine.addEventListener('room_ready', () => this.roomReady())
  }

  roomReady() {
    this.engine.room.state.bullets.onAdd((bullet, bulletId) => {
      this.addBullet(bullet, bulletId)
    })

    this.engine.room.state.bullets.onRemove((bullet, bulletId) => {
      console.log(bullet, bulletId)
    })
  }

  addBullet(args) {
    const bullet = new Bullet(this.engine, args)
    this.add(bullet)
    this.bullets.push(bullet)
  }

  update() {
    this.bullets.forEach((bullet) => {
      bullet.update()
    })
  }
}

export { Bullets }
