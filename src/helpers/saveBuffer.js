const userKeys = require("../store/keys.json")

const saveBuffer = (req, res) => {
  userKeys.push(req.body)
  res.json(userKeys)
}

module.exports = saveBuffer
