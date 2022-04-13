const base64 = require("base-64")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")

const createBioAuth = (req, res) => {
  const result = {
    id: "randomChallengeStr",
    challenge: "",
    counter: 0,
    publicKey: "",
    attestationObject: "",
    clientDataJSON: "",
    userAgent: "",
    user: "",
  }

  result.userAgent = req.headers["user-agent"]
  result.publicKey = req.body.id
  result.clientDataJSON = JSON.parse(
    base64.decode(req.body.response.clientDataJSON)
  )
  result.challenge = base64.decode(result.clientDataJSON.challenge)
  result.isEqual = result.challenge === result.id ? true : false
  result.attestationObject = utils.parseAttestationObject(
    req.body.response.attestationObject
  )

  res.json(database)
}

module.exports = createBioAuth
