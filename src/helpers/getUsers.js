const bioUsersData = require("../store/bioUsersData.json")

const getUsers = (req, res) => {
  console.log(bioUsersData)
  res.json(bioUsersData)
}

module.exports = getUsers
