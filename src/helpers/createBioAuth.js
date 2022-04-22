const base64 = require("base-64")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")
const keys = require("../store/keys.json")

const createBioAuth = (req, res) => {
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

  if (result.challenge !== database[username].session.challenge) {
    res.json({
      status: "failed",
      message: "Challenges don't match!",
    })
  }

  if (
    result.clientDataJSON.origin !== "https://jade-brioche-7c33fd.netlify.app"
  ) {
    res.json({
      status: "failed",
      message: "Origins dont match!",
    })
  }

  database[username].device.counter = 0
  database[username].device.publicKey = data.rawId
  database[username].device.type = data.type
  database[username].device.attestationObject = data.response.attestationObject
  database[username].device.clientDataJSON = data.response.clientDataJSON
  database[username].device.userAgent = req.headers["user-agent"]

  database[username].authenticators.push(result)
  keys.push(database)

  res.json(database)
}

module.exports = createBioAuth
