import getConnection from "../database"
import express from "express"

const router = express.Router()
router.use(express.json())

router.get("/", (req, res) => res.send("Hello"))

router.get("/login/:login/:password", (req, res) => {
  
  const params = req.params as { login: string, password: string}
  
  if (params['login'] == "gabriel" && params['password'] == "123123"){  
    res.json({error: false})
    return
  }
  
  res.statusCode = 403
  res.json({error: true})
})

router.get("/pessoa", async (req, res) => {
  const connection = await getConnection()
  const [rows,  fields] = await connection.execute('SELECT * FROM `pessoa`')
  res.json({rows})
})

router.get("/pessoa/:id", async (req, res) => {
  const connection = await getConnection()
  const [rows,  fields] = await connection.execute('SELECT * FROM `pessoa` WHERE id = ?', 
  [req.params.id])
  res.json({rows})
})

router.post("/pessoa", async (req, res) => {
  const connection = await getConnection()
  const [rows,  fields] = await connection.execute('INSERT INTO pessoa(nome, sobrenome, `data-nasc`) VALUES(?, ?, ?)',[
    req.body.nome,
    req.body.sobrenome,
    req.body['data-nasc']
  ])
  res.json({rows, fields})
})

router.put("/pessoa", (req, res) => {
  res.send("Eu sou um put")
})

router.delete("/pessoa", (req, res) => {
  res.send("Eu sou um delte")
})

export default router