import getConnection from "../database"
import express from "express"
import e from "express"

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
  try {
    const connection = await getConnection()
    const [rows,  fields] = await connection.execute('SELECT * FROM `pessoa`')
    res.json({rows})
  } catch(e) {
    res.statusCode = 500
    res.json({ error: true, e})
  }
})

router.get("/pessoa/:id", async (req, res) => {
  try {
    const connection = await getConnection()
    const [rows,  fields] = await connection.execute('SELECT * FROM `pessoa` WHERE id = ?', 
    [req.params.id])
    res.json({rows})
  } catch (e) {
    res.statusCode = 500
    res.json({error: true, e})
  }
})

router.post("/pessoa", async (req, res) => {
  try {
    const connection = await getConnection()
    const [rows,  fields] = await connection.execute('INSERT INTO pessoa(nome, sobrenome, `data-nasc`) VALUES(?, ?, ?)',[
      req.body.nome,
      req.body.sobrenome,
      req.body['data-nasc']
    ])
    res.json({rows, fields})
  } catch(e) { 
    res.statusCode = 500
    res.json({error:  true, e})
  }
})

router.put("/pessoa/:id", async (req, res) => {
  try { 
    const connection = await getConnection()
    const [rows, fields] = await connection.execute('UPDATE pessoa SET nome =? , sobrenome=?, `data-nasc`=? WHERE id=?',[
      req.body.nome,
      req.body.sobrenome,
      req.body['data-nasc'],
      req.params.id
    ])
    res.json({rows, fields})
  } catch(e) {
    res.statusCode = 500
    res.json({ error: true, e})
  }
})

router.delete("/pessoa/:id", async (req, res) => {
  try {
    const connection = await getConnection()
    const [rows,  fields] = await connection.execute('DELETE FROM pessoa WHERE id =?', [req.params.id])
    res.json({rows, fields})
  } catch(e) { 
    res.statusCode = 500 
    res.json({ error: true, e })
  } 
})

router.get("/posts", async (req, res) => {
  try {
    const connection = await getConnection()
    const [rows,  fields] = await connection.execute('SELECT * FROM `posts`')
    res.json({rows})
  } catch(e) {
    res.statusCode = 500
    res.json({ error: true, e})
  }
})

router.get("/posts/:id", async (req, res) => {
  try { 
    const connection = await getConnection()
    const [rows,  fields] = await connection.execute('SELECT * FROM `posts` WHERE id = ?', 
    [req.params.id])
    res.json({rows})
  } catch(e) {
    res.statusCode = 500 
    res.json({ error:  true, e})
  }
}) 

router.post("/posts", async (req, res) => {
  try {
    const connection =  await getConnection()
    const [rows, fields] = await connection.execute('INSERT INTO posts(titulo, texto, `id-pessoa`) VALUES(?, ?, ?)', [
      req.body.titulo,
      req.body.texto,
      req.body['id-pessoa']
    ])

    res.json({rows, fields})
 
  } catch(err) {
    console.error(err);
    res.statusCode= 500
    res.json({ error: true, err})
  }
})

router.put("/posts/:id", async (req, res) => {
  try {
    const connection = await getConnection()
    const [rows, fields] = await connection.execute('UPDATE posts SET titulo=? , texto=?, `id-pessoa`=? WHERE id=?',[
      req.body.titulo,
      req.body.texto,
      req.body['id-pessoa'],
      req.params.id
    ])
    res.json({rows, fields})
  } catch (e) {
    res.statusCode = 500
    res.json({error: true, e})
  }
})

router.delete("/posts/:id", async (req, res) => {
  try {
    const connection = await getConnection()
    const [rows, fields] = await connection.execute('DELETE FROM posts WHERE id=?', [req.params.id])
    res.json({rows, fields})
  } catch (e) { 
    res.statusCode = 500
    res.json({error: true, e})
  }
})

export default router