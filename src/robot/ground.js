import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat'

class Ground extends THREE.Group {
  constructor(world, nsubdivs = 20, s = { x: 70.0, y: 3.0, z: 70.0 }) {
    super()

    this.world = world
    this.nsubdivs = nsubdivs
    this.rapierScale = new RAPIER.Vector3(s.x, s.y, s.z)

    this.loadModel()
  }

  loadModel() {
    let heights = []
    // three plane
    const threeFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(this.rapierScale.x, this.rapierScale.z, this.nsubdivs, this.nsubdivs),
      new THREE.MeshStandardMaterial({
        map: this.loadTexture('./robot/Grass_005_BaseColor.jpg'),
        normalMap: this.loadTexture('./robot/Grass_005_Normal.jpg'),
        aoMap: this.loadTexture('./robot/Grass_005_AmbientOcclusion.jpg'),
        roughnessMap: this.loadTexture('./robot/Grass_005_Roughness.jpg'),
        roughness: 0.6
      })
    )
    threeFloor.rotateX(-Math.PI / 2)
    threeFloor.receiveShadow = true
    threeFloor.castShadow = true
    this.add(threeFloor)

    // add height data to plane
    const vertices = threeFloor.geometry.attributes.position.array
    const dx = this.rapierScale.x / this.nsubdivs
    const dy = this.rapierScale.z / this.nsubdivs
    // store height data in map column-row map
    const columsRows = new Map()
    for (let i = 0; i < vertices.length; i += 3) {
      // translate into colum / row indices
      let row = Math.floor(Math.abs(vertices[i] + this.rapierScale.x / 2) / dx)
      let column = Math.floor(Math.abs(vertices[i + 1] - this.rapierScale.z / 2) / dy)
      // generate height for this column & row
      const randomHeight = Math.random()
      vertices[i + 2] = this.rapierScale.y * randomHeight

      // store height
      if (!columsRows.get(column)) {
        columsRows.set(column, new Map())
      }
      columsRows.get(column).set(row, randomHeight)
    }
    threeFloor.geometry.computeVertexNormals()

    // store height data into column-major-order matrix array
    for (let i = 0; i <= this.nsubdivs; ++i) {
      for (let j = 0; j <= this.nsubdivs; ++j) {
        heights.push(columsRows.get(j).get(i))
      }
    }

    let groundBodyDesc = RAPIER.RigidBodyDesc.fixed()
    let groundBody = this.world.createRigidBody(groundBodyDesc)
    let groundCollider = RAPIER.ColliderDesc.heightfield(
      this.nsubdivs,
      this.nsubdivs,
      new Float32Array(heights),
      this.rapierScale
    )
    this.world.createCollider(groundCollider, groundBody.handle)
  }

  loadTexture(path) {
    const texture = new THREE.TextureLoader().load(path)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.x = 10
    texture.repeat.y = 10
    return texture
  }
}

export { Ground }
