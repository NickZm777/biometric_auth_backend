const express = require("express")
const cors = require("cors")

const app = express()
const PORT = "5000"

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => {
  console.log(
    `Example backend app for partnercard is listening at http://localhost:${PORT}`
  )
})

const authenticated = require("./authenticated.json")
const invalid_login = require("./invalid_login.json")
const invalid_password = require("./invalid_password.json")
const invalid_both_creds = require("./invalid_both_creds.json")

app.post("/check", (req, res) => {
  console.log(req.body.data.login)
  console.log(req.body.data.password)
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
})

// app.post("/ch", (req, res) => {
//   res.json(authenticated)
// })
