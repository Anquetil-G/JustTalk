const express = require("express");
const { getAccounts, setAccounts, deleteAccounts, editAccounts, getOneAccount, checkOneAccount } = require("../controllers/account.controller");
const router = express.Router();

router.get("/", getAccounts);
router.get("/getOneAccount/:id", getOneAccount);
router.get("/check/account", checkOneAccount);
router.post("/", setAccounts);
router.put("/:id", editAccounts);
router.delete("/:id", deleteAccounts);

module.exports = router;