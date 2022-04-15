const express = require('express');
const router = express.Router();
const {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  getAccountsByFunds,
} = require('./accounts.controllers');

router.get('/', accountsGet);
router.get('/:fund', getAccountsByFunds);
router.post('/', accountCreate);

router.delete('/:accountId', accountDelete);

router.put('/:accountId', accountUpdate);

module.exports = router;
