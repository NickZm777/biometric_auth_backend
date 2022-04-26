const { v4: uuidv4 } = require("uuid");
const database = require("../store/bioUsersData.json");
const utils = require("../utils");

const bioRegister = (req, res) => {
  if (
    !req.body.data ||
    !req.body.data.userName ||
    !req.body.data.firstName ||
    !req.body.data.lastName
  ) {
    res.json({
      status: "error",
      message: "Request missing firstName, lastName or userName fields info!",
    });
    return;
  }
  const newId = uuidv4();
  const username = req.body.data.userName;
  const firstName = req.body.data.firstName;
  const lastName = req.body.data.lastName;

  //   const checkLogin = userData.find((user) => user.login === newLogin)

  if (database[username] && database[username].registered) {
    res.json({
      status: "error",
      message: `Пользователь "${username}" уже зарегистрирован`,
    });
    return;
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
  };

  let challengeMakeCred;

  if (firstName === 5) {
    challengeMakeCred = utils.generateServerMakeCredRequest5(
      username,
      firstName,
      database[username].id
    );
  }
  if (firstName === 2) {
    challengeMakeCred = utils.generateServerMakeCredRequest2(
      username,
      firstName,
      database[username].id
    );
  }
  if (firstName === 3) {
    challengeMakeCred = utils.generateServerMakeCredRequest3(
      username,
      firstName,
      database[username].id
    );
  }
  if (firstName === 4) {
    challengeMakeCred = utils.generateServerMakeCredRequest4(
      username,
      firstName,
      database[username].id
    );
  } else {
    challengeMakeCred = utils.generateServerMakeCredRequest(
      username,
      firstName,
      database[username].id
    );
  }

  // req.session.challenge = challengeMakeCred.challenge
  // req.session.username = username

  database[username].session.challenge = challengeMakeCred.challenge;

  res.json({
    status: "success",
    data: challengeMakeCred,
  });
};

module.exports = bioRegister;
