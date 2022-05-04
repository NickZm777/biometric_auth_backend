const base64 = require("base-64")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")
const verificationObjects = require("../store/verificationObjects.json")
const keys = require("../store/keys.json")

const error_challenge = require("../auth/error_challenge.json")
const error_clientDataType = require("../auth/error_clientDataType.json")
const error_origin = require("../auth/error_origin.json")

const verifyUser = (req, res) => {
  const data = req.body.data
  const username = req.body.sessionLogin

  keys.push(data)

  if (data.id !== database[username].device.publicKeyNotRaw) {
    res.json({
      status: "error",
      message: "значения publicKey ID не совпадают",
    })
  }

  try {
    const clientDataJSON = JSON.parse(
      base64.decode(data.response.clientDataJSON)
    )

    keys.push(clientDataJSON)

    if (clientDataJSON.origin !== "https://jade-brioche-7c33fd.netlify.app") {
      res.json(error_origin)
    }

    if (clientDataJSON.type !== "webauthn.get") {
      res.json(error_clientDataType)
    }

    const receivedChallenge = base64.decode(clientDataJSON.challenge)
    if (receivedChallenge !== database[username].session.challenge) {
      res.json(error_challenge)
    }
  } catch (error) {
    res.json({
      status: "error",
      message: `Ошибка при декодировании clientDataJSON на сервере: ${error.message}`,
    })
  }

  const dataForVerification = {}
  dataForVerification.counter = database[username].device.counter
  dataForVerification.attestationObject =
    database[username].device.attestationObject
  dataForVerification.clientDataJSON = data.response.clientDataJSON
  dataForVerification.authenticatorData = data.response.authenticatorData
  dataForVerification.signature = data.response.signature

  verificationObjects.push(dataForVerification)

  try {
    const verificationResultCounter = utils.verifyAssertion(dataForVerification)
    database[username].device.counter = verificationResultCounter
    database[username].registered = true
    res.json({
      status: "success",
      info: {
        firstName: database[username].firstName,
        lastName: database[username].lastName,
        counter: verificationResultCounter,
      },
    })
  } catch (error) {
    res.json({
      status: "error",
      message: `Не пройден verifyAssertion на сервере: ${error.message}`,
    })
  }
}

module.exports = verifyUser
