const database = require("../store/bioUsersData.json");
const utils = require("../utils");

const bioPrepareVerification = (req, res) => {
  if (!req.body || !req.body.userName) {
    res.json({
      status: "failed",
      message: "Request missing username field!",
    });
    return;
  }
  //   const newId = uuidv4()
  let username = req.body.userName;
  //   let name = req.body.data.name

  //   const checkLogin = userData.find((user) => user.login === newLogin)

  if (!database[username]) {
    res.json({
      status: "error",
      message: `Пользователь "${username}" не зарегистрирован`,
    });
    return;
  }

  const publicKeyDevise = database[username].device.publicKey;

  let verificationCreds;

  if (database[username].lastName === 2) {
    verificationCreds = utils.generateVerificationCreds2(publicKeyDevise);
  }
  if (database[username].lastName === 3) {
    verificationCreds = utils.generateVerificationCreds3(publicKeyDevise);
  }
  if (database[username].lastName === 4) {
    verificationCreds = utils.generateVerificationCreds4(publicKeyDevise);
  }
  if (database[username].lastName === 5) {
    verificationCreds = utils.generateVerificationCreds5(publicKeyDevise);
  } else {
    verificationCreds = utils.generateVerificationCreds(publicKeyDevise);
  }

  // req.session.challenge = challengeMakeCred.challenge
  // req.session.username = username

  database[username].session.challenge = verificationCreds.challenge;

  res.json({
    status: "success",
    data: verificationCreds,
  });
};

module.exports = bioPrepareVerification;
