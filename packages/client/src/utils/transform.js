export function convertServerData(data) {
  return {
    ...data,
    position: {
      x: data.positionX,
      y: data.positionY,
      z: data.positionZ
    },
    quaternion: {
      x: data.quaternionX,
      y: data.quaternionY,
      z: data.quaternionZ,
      w: data.quaternionW
    }
  }
}

export function convertClientData(data) {
  return {
    state: data.state,
    emote: data.emote,
    color: data.color,
    positionX: data.position.x,
    positionY: data.position.y,
    positionZ: data.position.z,
    quaternionX: data.quaternion.x,
    quaternionY: data.quaternion.y,
    quaternionZ: data.quaternion.z,
    quaternionW: data.quaternion.w
  }
}
