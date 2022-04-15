const { v4: uuidv4 } = require("uuid")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")

const bioPrepareVerification = (req, res) => {
  if (!req.body.data || !req.body.data.userName) {
    res.json({
      status: "failed",
      message: "Request missing username field!",
    })
    return
  }
  //   const newId = uuidv4()
  let username = req.body.data.userName
  //   let name = req.body.data.name

  //   const checkLogin = userData.find((user) => user.login === newLogin)

  if (database[username]) {
    res.json({
      status: "failed",
      message: `Username ${username} is not registered in DB`,
    })
    return
  }

  const publicKeyDevise = database[username].device.publicKey
  const verificationCreds = utils.generateVerificationCreds(publicKeyDevise)

  // req.session.challenge = challengeMakeCred.challenge
  // req.session.username = username

  database[username].session.challenge = verificationCreds.challenge

  res.json({
    status: "success",
    data: verificationCreds,
  })
}

module.exports = bioPrepareVerification
