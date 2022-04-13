const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer)
}

module.exports = decode
