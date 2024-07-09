const express = require("express");
const { getMessages, setMessages, editMessages, deleteMessages, getMessagesFromAuthor } = require("../controllers/message.controller");
const router = express.Router();

router.get("/", getMessages);
router.get("/fromAuthor/:id", getMessagesFromAuthor);
router.post("/", setMessages);
router.put("/:id", editMessages);
router.delete("/:id", deleteMessages);

module.exports = router;