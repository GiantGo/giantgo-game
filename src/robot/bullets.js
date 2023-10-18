import * as THREE from 'three'
import { Bullet } from './bullet'

class Bullets extends THREE.Group {
  constructor(engine) {
    super()

    this.engine = engine
    this.bullets = []

    this.engine.addEventListener('shot', (args) => {
      this.addBullet(args)
    })
  }

  addBullet({ dimension, translation, linvel, color }) {
    const bullet = new Bullet(this.engine, dimension, translation, linvel, color)
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
