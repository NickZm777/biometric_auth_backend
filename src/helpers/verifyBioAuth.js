const base64 = require("base-64")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")
const verificationObjects = require("../store/verificationObjects.json")

const verifyBioAuth = (req, res) => {
  verificationObjects.push(req.body)

  const data = req.body.data
  const username = req.body.userInfoforSession

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

  res.json(database)
}

module.exports = verifyBioAuth