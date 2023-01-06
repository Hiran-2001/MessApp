const express = require("express")
const { register, login, allUsers } = require("../controller/userController")
const { protect } = require("../middleware/authMiddleware")
const { auth } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/alluser", auth, allUsers)

module.exports = router

