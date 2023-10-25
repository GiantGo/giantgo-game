import * as THREE from 'three'
import { Bullet } from './bullet'

class Bullets extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.bullets = []

    this.engine.room.state.bullets.onAdd((bullet, bulletId) => {
      this.addBullet(bullet)
    })

    this.engine.room.state.bullets.onRemove((bullet, sessionId) => {
      console.log(bullet, sessionId)
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
