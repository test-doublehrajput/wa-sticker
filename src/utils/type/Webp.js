const log = console.log;
export const isWebp = (buffer)=> {
    var WEBP = [0x57, 0x45, 0x42, 0x50]
    for (var i = 0; i < WEBP.length; i++) {
      if (buffer[i + 8] !== WEBP[i]) {
        return false
      }
    }
    return true
}

export const isWebpAnimated = (buffer)=> {
    var ANIM = [0x41, 0x4E, 0x49, 0x4D]
    for (var i = 0; i < buffer.length; i++) {
      for (var j = 0; j < ANIM.length; j++) {
        if (buffer[i + j] !== ANIM[j]) {
          break
        }
      }
      if (j === ANIM.length) {
        return true
      }
    }
    return false
}
