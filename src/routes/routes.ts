import express from "express"
const router = express.Router()

router.use("/", express.static("./public"))

export default router