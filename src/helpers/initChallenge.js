const { v4: uuidv4 } = require("uuid")
const userKeys = require("../store/keys.json")

const randomChallengeStr = "ServerStringerdecoded"

const strID = uuidv4()
console.log(strID)

const initChallenge = (req, res) => {
  // const randomChallengeStr = uuidv4()
  const randomChallengeStr = "RandomString"
  // const id = uuidv4()
  const newItem = {
    challenge: randomChallengeStr,
  }
  userKeys.push(newItem)
  res.json(randomChallengeStr)
}

module.exports = initChallenge
