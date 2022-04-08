const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()

const authenticated = require("./auth/authenticated.json")
const invalid_login = require("./auth/invalid_login.json")
const invalid_password = require("./auth/invalid_password.json")
const login_exists = require("./auth/login_exists.json")
const userData = require("./store/data.json")
const userKeys = require("./store/keys.json")

const getAll = (req, res) => {
  console.log(userData)
  res.json(userData)
}

const getKeys = (req, res) => {
  console.log(userKeys)
  res.json(userKeys)
}

const create = (req, res) => {
  const newId = uuidv4()
  const newFirstName = req.body.data.firstName
  const newLastName = req.body.data.lastName
  const newLogin = req.body.data.login
  const newPassword = req.body.data.password

  const checkLogin = userData.find((user) => user.login === newLogin)

  console.log("login:", newLogin)
  console.log("password:", newPassword)
  console.log("checkLogin:", checkLogin)

  if (checkLogin) {
    res.json(login_exists)
    return
  } else {
    const newCredentials = {
      id: newId,
      firstName: newFirstName,
      lastName: newLastName,
      login: newLogin,
      password: newPassword,
    }
    userData.push(newCredentials)

    const response = {
      status: "success",
      data: {
        details: "registered",
        userInfo: {
          firstName: newFirstName,
          lastName: newLastName,
        },
      },
    }
    res.json(response)
  }
}

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

const createAuth = (req, res) => {
  const key = req.body
  userKeys.push(key)
  res.json(userKeys)
}

const initChallenge = (req, res) => {
  const newChallenge = "initialChallengeString"
  res.json(newChallenge)
}

router.get("/all", getAll)
router.get("/keys", getKeys)

router.post("/init", initChallenge)
router.post("/check", checkCreds)
router.post("/create", create)
router.post("/save", createAuth)

app.use(`/.netlify/functions/api`, router)
module.exports = app
module.exports.handler = serverless(app)
