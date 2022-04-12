const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")
const base64 = require("base-64")
const base64url = require("base64url")
const cbor = require("cbor")
// const detectCharacterEncoding = require("detect-character-encoding")

function parseAttestationObject(attestationObject) {
  const buffer = base64url.toBuffer(attestationObject)
  return cbor.decodeAllSync(buffer)[0]
}

const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer)
}

const encode = (string) => {
  return new TextEncoder().encode(string)
}
const randomChallengeStr = "ServerStringerdecoded"

const strID = uuidv4()
console.log(strID)

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
  // const checkUser = userData.find((user) => user.login === reqLogin)
  const result = {
    id: "randomChallengeStr",
    challenge: "",
    counter: 0,
    publicKey: "",
    attestationObject: "",
    clientDataJSON: "",
    userAgent: "",
    user: "",
  }
  const object = req.body
  // // object.rawIdconverted = decode(object.rawId, "utf-8")
  result.userAgent = req.headers["user-agent"]
  result.publicKey = object.id
  result.clientDataJSON = JSON.parse(
    base64.decode(object.response.clientDataJSON)
  )
  result.challenge = base64.decode(result.clientDataJSON.challenge)
  result.isEqual = result.challenge === result.id ? true : false

  // const parsedAttestObj = parseAttestationObject(
  //   object.response.attestationObject
  // )
  // object.response.parsedAttObject = parsedAttestObj
  result.attestationObject = parseAttestationObject(
    object.response.attestationObject
  )
  // object.response.clientDataJSON = JSON.parse(
  //   base64.decode(object.response.clientDataJSON)
  // )
  // object.response.clientDataJSON.challengeer = base64.decode(
  //   object.response.clientDataJSON.challenge
  // )
  // object.response.isEqual =
  //   object.response.clientDataJSON.challengeer === randomChallengeStr
  //     ? true
  //     : false

  // object.response.attest = parseAttestationObject(
  //   object.response.attestationObject
  // )

  userKeys.push(result)

  res.json(userKeys)
}

const saveBuffer = (req, res) => {
  userKeys.push(req.body)
  res.json(userKeys)
}

const initChallenge = (req, res) => {
  // const randomChallengeStr = uuidv4()
  // const randomChallengeStr = "ServerStringer";
  const id = uuidv4()
  const newItem = {
    searchId: id,
    challenge: randomChallengeStr,
  }
  userKeys.push(newItem)
  res.json(randomChallengeStr)
}

router.get("/all", getAll)
router.get("/keys", getKeys)

router.post("/init", initChallenge)
router.post("/check", checkCreds)
router.post("/create", create)
router.post("/save", createAuth)
router.post("/savebuffer", saveBuffer)

app.use(`/.netlify/functions/api`, router)
module.exports = app
module.exports.handler = serverless(app)
