const { v4: uuidv4 } = require("uuid")
const database = require("../store/bioUsersData.json")
const utils = require("../utils")

const prepareRegistration = (req, res) => {
  if (
    !req.body.data ||
    !req.body.data.userName ||
    !req.body.data.firstName ||
    !req.body.data.lastName
  ) {
    res.json({
      status: "error",
      message: "Request missing firstName, lastName or userName fields info!",
    })
    return
  }
  const newId = uuidv4()
  const username = req.body.data.userName
  const firstName = req.body.data.firstName
  const lastName = req.body.data.lastName

  if (database[username] && database[username].registered) {
    res.json({
      status: "error",
      message: `Пользователь "${username}" уже зарегистрирован`,
    })
    return
  }

  database[username] = {
    firstName: firstName,
    lastName: lastName,
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
    firstName,
    database[username].id
  )

  database[username].session.challenge = challengeMakeCred.challenge

  res.json({
    status: "success",
    data: challengeMakeCred,
  })
}

module.exports = prepareRegistration
