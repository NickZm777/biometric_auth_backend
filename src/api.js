const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()

const authenticated = require("./authenticated.json")
const invalid_login = require("./invalid_login.json")
const invalid_password = require("./invalid_password.json")
const invalid_both_creds = require("./invalid_both_creds.json")

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

router.post("/check", (req, res) => {
  //   console.log("login:", req.body.data.login)
  //   console.log("password:", req.body.data.password)
  if (req.body.data.login === "qw" && req.body.data.password === "123") {
    res.json(authenticated)
    return
  }
  if (req.body.data.login !== "qw" && req.body.data.password === "123") {
    res.json(invalid_login)
    return
  }
  if (req.body.data.login === "qw" && req.body.data.password !== "123") {
    res.json(invalid_password)
    return
  }
  if (req.body.data.login !== "qw" && req.body.data.password !== "123") {
    res.json(invalid_both_creds)
    return
  }
  if (req.body.data.login === "qw" && req.body.data.password === "123") {
    res.json({ details: "sdgfdsgsdrfhgdfsghdfgh!" })
    return
  }
})

app.use(`/.netlify/functions/api`, router)

module.exports = app
module.exports.handler = serverless(app)
