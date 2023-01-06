const express = require("express")
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controller/chatController")
const { auth } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/",auth,accessChat)
router.get("/",auth,fetchChat)
router.post("/group",auth,createGroupChat)
router.put("/rename",auth,renameGroup)
router.put("/groupadd",auth,addToGroup)
router.put("/groupremove",auth,removeFromGroup)


module.exports = router