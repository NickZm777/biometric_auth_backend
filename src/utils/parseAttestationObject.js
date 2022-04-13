const base64url = require("base64url")
const cbor = require("cbor")

function parseAttestationObject(attestationObject) {
  const buffer = base64url.toBuffer(attestationObject)
  return cbor.decodeAllSync(buffer)[0]
}

module.exports = parseAttestationObject
