const base64 = require("base-64")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")
const verificationObjects = require("../store/verificationObjects.json")

const verifyBioAuth = (req, res) => {
  // verificationObjects.push(req.body)

  const data = req.body.data
  const username = req.body.sessionLogin

  //   result.sessionUsername = username
  //   result.rawId = data.rawId
  //   result.userAgent = req.headers["user-agent"]
  //   result.publicKeywhichisID = data.id
  //   result.clientDataJSON = JSON.parse(
  //     base64.decode(data.response.clientDataJSON)
  //   )
  //   result.challenge = base64.decode(result.clientDataJSON.challenge)
  //   result.isEqual = result.challenge === result.id ? true : false
  //   result.attestationObject = utils.parseAttestationObject(
  //     data.response.attestationObject
  //   )

  // ----------------------------------------------------------------------

  //   if (result.challenge !== database[username].session.challenge) {
  //     res.json({
  //       status: "failed",
  //       message: "Challenges don't match!",
  //     })
  //   }

  //   if (
  //     result.clientDataJSON.origin !== "https://jade-brioche-7c33fd.netlify.app"
  //   ) {
  //     res.json({
  //       status: "failed",
  //       message: "Origins dont match!",
  //     })
  //   }

  //   database[username].device.publicKey = data.id
  //   database[username].device.type = data.type
  //   database[username].device.attestationObject = data.response.attestationObject
  //   database[username].device.clientDataJSON = data.id.response.clientDataJSON
  //   database[username].device.userAgent = req.headers["user-agent"]

  //   database[username].authenticators.push(result)

  const dataForVerification = {}
  dataForVerification.counter = database[username].device.counter
  dataForVerification.attestationObject =
    database[username].device.attestationObject
  dataForVerification.clientDataJSON = data.response.clientDataJSON
  dataForVerification.authenticatorData = data.response.authenticatorData
  dataForVerification.signature = data.response.signature

  verificationObjects.push(dataForVerification)

  try {
    const verificationResult = utils.verifyAssertion(dataForVerification)
    database[username].device.counter = verificationResult
    database[username].registered = true
    res.json({
      status: "success",
      info: {
        firstName: database[username].firstName,
        lastName: database[username].lastName,
        counter: verificationResult,
      },
    })
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    })
  }
}

module.exports = verifyBioAuth
