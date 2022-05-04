const database = require("../store/bioUsersData.json")
const utils = require("../utils")

const prepareVerification = (req, res) => {
  if (!req.body || !req.body.userName) {
    res.json({
      status: "failed",
      message: "Request missing username field!",
    })
    return
  }

  let username = req.body.userName

  if (!database[username]) {
    res.json({
      status: "error",
      message: `Пользователь "${username}" не зарегистрирован`,
    })
    return
  }

  const publicKeyDevise = database[username].device.publicKey

  const verificationCreds = utils.generateVerificationCreds(publicKeyDevise)

  database[username].session.challenge = verificationCreds.challenge

  res.json({
    status: "success",
    data: verificationCreds,
  })
}

module.exports = prepareVerification
