const base64 = require("base-64")
const userKeys = require("../store/keys.json")
const utils = require("../utils")

const createAuth = (req, res) => {
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
  const object = req.body
  // // object.rawIdconverted = decode(object.rawId, "utf-8")
  result.userAgent = req.headers["user-agent"]
  result.publicKey = object.id
  result.clientDataJSON = JSON.parse(
    base64.decode(object.response.clientDataJSON)
  )
  result.challenge = base64.decode(result.clientDataJSON.challenge)
  result.isEqual = result.challenge === result.id ? true : false
  result.attestationObject = utils.parseAttestationObject(
    object.response.attestationObject
  )

  // const checkUser = userKeys.find((user) => user.challenge === result.challenge)
  // if (checkUser) {
  //   userKeys[userKeys.indexOf(checkUser)] = result
  // } else userKeys.push(result)
  userKeys.push(result)

  res.json(userKeys)
}

module.exports = createAuth
