const userData = require("../store/data.json")

const getAll = (req, res) => {
  console.log(userData)
  res.json(userData)
}

module.exports = getAll
