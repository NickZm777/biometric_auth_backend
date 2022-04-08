const userKeys = require("/store/keys.json")

const getKeys = (req, res) => {
  console.log(userKeys)
  res.json(userKeys)
}

export default getKeys
