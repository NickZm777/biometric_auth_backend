const base64 = require("base-64")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")
const keys = require("../store/keys.json")
const error_attestationType = require("../auth/error_attestationType.json")
const error_challenge = require("../auth/error_challenge.json")
const error_clientDataType = require("../auth/error_clientDataType.json")
const error_origin = require("../auth/error_origin.json")
const register_success = require("../auth/register_success.json")
const error_fmt = require("../auth/error_fmt.json")
const error_authData = require("../auth/error_authData.json")

const registerUser = (req, res) => {
  const result = {
    id: "randomChallengeStr",
    counter: 0,
  }

  keys.push(req.body)

  const data = req.body.data
  const username = req.body.userInfoforSession

  result.sessionUsername = username
  result.rawId = data.rawId
  result.userAgent = req.headers["user-agent"]
  result.publicKeywhichisID = data.id
  result.clientDataJSON = JSON.parse(
    base64.decode(data.response.clientDataJSON)
  )
  result.challenge = base64.decode(result.clientDataJSON.challenge)
  result.isEqual = result.challenge === result.id ? true : false
  result.attestationObject = utils.parseAttestationObject(
    data.response.attestationObject
  )

  if (data.type !== "public-key") {
    res.json(error_attestationType)
  }

  if (result.clientDataJSON.type !== "webauthn.create") {
    res.json(error_clientDataType)
  }

  if (result.challenge !== database[username].session.challenge) {
    res.json(error_challenge)
  }

  if (
    result.clientDataJSON.origin !== "https://jade-brioche-7c33fd.netlify.app"
  ) {
    res.json(error_origin)
  }

  // if (result.attestationObject.fmt !== "none") {
  //   res.json(error_fmt)
  // }

  if (!result.attestationObject.authData) {
    res.json(error_authData)
  }

  database[username].device.counter = 0
  database[username].device.publicKey = data.rawId
  database[username].device.type = data.type
  database[username].device.attestationObject = data.response.attestationObject
  database[username].device.clientDataJSON = data.response.clientDataJSON
  database[username].device.userAgent = req.headers["user-agent"]

  database[username].authenticators.push(result)
  keys.push(database)

  res.json(register_success)
}

module.exports = registerUser
