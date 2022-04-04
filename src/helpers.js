const data = [
  {
    name: "MySQL",
    type: "RDBMS",
  },
  {
    name: "MongoDB",
    type: "NoSQL",
  },
  {
    name: "Neo4j",
    type: "Graph DB",
  },
]

export const getAll = (req, res) => {
  console.log(data)
  res.json(data)
}

// export const getAll = (req, res) => {
//   console.log(data)
//   res.json({ name: "MySQL", type: "RDBMS" })
// }

export const create = (req, res) => {
  const newCredentials = {
    name: "new",
    type: "Credentials",
  }
  data.push(newCredentials)
  res.json(newCredentials)
}
