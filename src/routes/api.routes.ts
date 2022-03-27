import express from "express"
const router = express.Router()

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

export default router