import express from "express"
const app = express()
import router from "./routes/routes"
import apiRouter from "./routes/api.routes"

app.use("/", router)
app.use("/api", apiRouter)

const port = 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})