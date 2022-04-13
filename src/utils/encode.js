const encode = (string) => {
  return new TextEncoder().encode(string)
}

module.exports = encode
