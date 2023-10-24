import * as THREE from 'three'
import { Bullet } from './bullet'

class Bullets extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.bullets = []
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
