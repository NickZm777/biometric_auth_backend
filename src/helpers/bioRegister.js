const { v4: uuidv4 } = require("uuid")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")

const bioRegister = (req, res) => {
  if (!req.body.data || !req.body.data.userName || !req.body.data.name) {
    res.json({
      status: "failed",
      message: "Request missing name or username field!",
    })
    return
  }
  const newId = uuidv4()
  let username = req.body.data.userName
  let name = req.body.data.name

  //   const checkLogin = userData.find((user) => user.login === newLogin)

  if (database[username] && database[username].registered) {
    res.json({
      status: "failed",
      message: `Username ${username} already exists`,
    })
    return
  }

  database[username] = {
    name: name,
    registered: false,
    id: newId,
    session: { challenge: null },
    authenticators: [],
    device: {
      counter: 0,
      publicKey: null,
      type: null,
      attestationObject: null,
      clientDataJSON: null,
      userAgent: null,
    },
  }

  const challengeMakeCred = utils.generateServerMakeCredRequest(
    username,
    name,
    database[username].id
  )

  // req.session.challenge = challengeMakeCred.challenge
  // req.session.username = username

  database[username].session.challenge = challengeMakeCred.challenge

  res.json({
    status: "success",
    data: challengeMakeCred,
    database: database,
  })
}

module.exports = bioRegister
