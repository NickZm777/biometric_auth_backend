const userData = require("../store/data.json")
const invalid_login = require("../auth/invalid_login.json")
const invalid_password = require("../auth/invalid_password.json")

const checkCreds = (req, res) => {
  const reqLogin = req.body.data.login
  const reqPassword = req.body.data.password

  const checkUser = userData.find((user) => user.login === reqLogin)

  console.log("login:", reqLogin)
  console.log("password:", reqPassword)
  console.log("checkUser:", checkUser)

  if (!checkUser) {
    res.json(invalid_login)
    return
  }
  if (checkUser.login === reqLogin && checkUser.password === reqPassword) {
    const response = {
      status: "success",
      data: {
        details: "authenticated",
        userInfo: {
          firstName: checkUser.firstName,
          lastName: checkUser.lastName,
        },
      },
    }
    res.json(response)
    return
  }
  if (checkUser.login === reqLogin && checkUser.password !== reqPassword) {
    res.json(invalid_password)
    return
  }
}

module.exports = checkCreds
