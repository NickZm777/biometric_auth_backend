const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

// import { getAll } from "./helpers.js"
// const getAll = require("./helpers.js")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()

const authenticated = require("./authenticated.json")
const invalid_login = require("./invalid_login.json")
const invalid_password = require("./invalid_password.json")
const invalid_both_creds = require("./invalid_both_creds.json")
const login_exists = require("./login_exists.json")

const data = [
  {
    id: "1111sdfdsf",
    firstName: "Jason",
    lastName: "X",
    login: "qw",
    password: "123",
  },
]

const getAll = (req, res) => {
  console.log(data)
  res.json(data)
}

const create = (req, res) => {
  const newId = uuidv4()
  const newFirstName = req.body.data.firstName
  const newLastName = req.body.data.lastName
  const newLogin = req.body.data.login
  const newPassword = req.body.data.password

  const checkLogin = data.find((user) => user.login === newLogin)

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
    data.push(newCredentials)

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

  const checkUser = data.find((user) => user.login === reqLogin)

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

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  })
})

router.get("/test", (req, res) => {
  console.log(req)
  res.json({
    hello: "test!",
  })
})

router.get("/all", getAll)

router.post("/check", checkCreds)

// router.post("/all", (req, res) => {
//   console.log("login:", req.body.data.login)
//   console.log("password:", req.body.data.password)
//   getAll(req, res)
// })

router.post("/create", create)

app.use(`/.netlify/functions/api`, router)

module.exports = app
module.exports.handler = serverless(app)
