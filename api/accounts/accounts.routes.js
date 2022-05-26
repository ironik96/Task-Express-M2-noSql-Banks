const express = require("express");
const router = express.Router();
const {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  getAccountByUsername,
  getVipAccounts,
} = require("./accounts.controllers");

router.get("/", accountsGet);
router.get("/:username", getAccountByUsername);
router.get("/vip/:amount", getVipAccounts);
router.post("/", accountCreate);

router.delete("/:accountId", accountDelete);

router.put("/:accountId", accountUpdate);

module.exports = router;
