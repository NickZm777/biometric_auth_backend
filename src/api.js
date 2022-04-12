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

// const strParse =
//   '�cfmtdnonegattStmt�hauthDataX�5��;p-\u0016�%\u000c�7`��)�cg�P$%R��\u0007 ��Z6E\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0014�Vm7�\\\u0017�����%��O*s~�\u0001\u0002\u0003& \u0001!X f�nA�nA�\u0001��٫��w�\u0018d\u0001������5)\\��g"X ���2�\u0013b-��Hcc(�\u000c�#�]�<�F��)\u001d�CO'
// const tst =
//   "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YVjszHUM-fXe8fPTc7IQdAU8xhonRmZeDznRqJqecdVRcUNFYfOzo63OAAI1vMYKZIsLJfHwVQMAaAGnedEs8u2RW_H-8HXzJhTtnVHUAfErTK2AW4Saa0wiSClXWyIjLPXQAEyjr1KaCn5soeutmbDtSeT0FLIvcijbpg0fmQ-MHrw2GZ8Ka8rRn-a5-sncsUELQWD0sEvLttxXVQcQah2vpQECAyYgASFYIMG7Y3fOeGecLpfn7XF_sV4OTc41tsbEPSECGfCiK480IlggH9-qVehm6Gj25SyZau17mB5c0YoTWBZ8ngdEka4EqOY"

// const ddd =
//   "CSLvv71jZm10ZG5vbmVnYXR0U3RtdO+/vWhhdXRoRGF0YVjvv70177+977+9O3AtXHUwMDE277+9JVx1MDAwY++/vTdg77+977+9Ke+/vWNn77+9UCQlUu+/ve+/vVx1MDAwNyDvv73vv71aNkVcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMDBcdTAwMTTvv71WbTfvv71cXFx1MDAxN++/ve+/ve+/ve+/ve+/vSXvv73vv71PKnN+77+9XHUwMDAxXHUwMDAyXHUwMDAzJiBcdTAwMDEhWCBm77+9bkHvv71uQe+/vVx1MDAwMe+/ve+/vdmr77+977+9d++/vVx1MDAxOGRcdTAwMDHvv73vv73vv73vv73vv73vv701KVxc77+977+9Z1wiWCDvv73vv73vv70y77+9XHUwMDEzYi3vv73vv71IY2Mo77+9XHUwMDBj77+9I++/vV3vv70877+9Ru+/ve+/vSlcdTAwMWTvv71DTyI="

// console.log(ArrayBuffer.isView(ddd))

// const parseAttestation = parseAttestationObject(tst)

// console.log(parseAttestation)

// const fileBuffer =
//   '�cfmtdnonegattStmt�hauthDataX�5��;p-\u0016�%\u000c�7`��)�cg�P$%R��\u0007 ��Z6E\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0014�\u0005���V�\u0017�\\y���8����3�\u0001\u0002\u0003& \u0001!X %� \u001a\u0014�X\u0003t8K�\\\u000f���u�mT��\u001dD�Vn~Đ\u000f"X Փ�\u0008\u001d\u007fU�� AB\u0014+g�qQ�\u0014*\u000f�Ť�Z\u0004@��'
// const charsetMatch = detectCharacterEncoding(fileBuffer)

// console.log(charsetMatch)

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
  const object = req.body
  object.rawIdconverted = decode(object.rawId, "utf-8")

  object.response.clientDataJSON = JSON.parse(
    base64.decode(object.response.clientDataJSON)
  )
  object.response.clientDataJSON.challengeer = base64.decode(
    object.response.clientDataJSON.challenge
  )
  object.response.isEqual =
    object.response.clientDataJSON.challengeer === randomChallengeStr
      ? true
      : false

  // const parsedAttestObj = parseAttestationObject(
  //   object.response.attestationObject
  // )
  // object.response.parsedAttObject = parsedAttestObj
  object.response.attest = parseAttestationObject(
    object.response.attestationObject
  )

  userKeys.push(object)

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
