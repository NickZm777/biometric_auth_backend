const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const helpers = require("./helpers")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()

// get
router.get("/all", helpers.getAll)
router.get("/keys", helpers.getKeys)
router.get("/users", helpers.getUsers)
router.get("/vo", helpers.getVerificationObjects)

// post
router.post("/init", helpers.initChallenge)
router.post("/check", helpers.checkCreds)
router.post("/create", helpers.create)
router.post("/save", helpers.createAuth)
router.post("/savebuffer", helpers.saveBuffer)

// biometric post
router.post("/registration_options", helpers.prepareRegistration)
router.post("/register", helpers.registerKey)
router.post("/try", helpers.tryConverter)
router.post("/verification_options", helpers.prepareVerification)
router.post("/verify", helpers.verifyKey)

//-----
app.use(`/.netlify/functions/api`, router)
module.exports = app
module.exports.handler = serverless(app)
