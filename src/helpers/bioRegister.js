const { v4: uuidv4 } = require("uuid")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")
const login_exists = require("../auth/login_exists.json")

const bioRegister = (req, res) => {
  if (!req.body.data || !req.body.data.username || !req.body.data.name) {
    res.json({
      status: "failed",
      message: "Request missing name or username field!",
    })
    return
  }
  const newId = uuidv4()
  let username = req.body.data.username
  let name = req.body.data.name

  //   const checkLogin = userData.find((user) => user.login === newLogin)

  if (database[username] && database[username].registered) {
    response.json({
      status: "failed",
      message: `Username ${username} already exists`,
    })
    return
  }

  database[username] = {
    name: name,
    registered: false,
    id: newId,
    authenticators: [],
  }

  const challengeMakeCred = utils.generateServerMakeCredRequest(
    username,
    name,
    database[username].id
  )

  // req.session.challenge = challengeMakeCred.challenge
  // req.session.username = username

  res.json({
    status: "success",
    data: challengeMakeCred,
  })
}

module.exports = bioRegister
