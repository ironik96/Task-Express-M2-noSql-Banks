let accounts = require('../../accounts');
const Account = require('../../models/Account');

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(+accountId);
    if (foundAccount){
      await foundAccount.remove();
      res.status(204).end();
  } else {
    res.status(404).json({ message: "account not found" });
  }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(+accountId);
    if (foundAccount) {
      await foundAccount.findByIdAndUpdate(accountId, req.body, { new: true });
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find({}, '-createdAt -updatedAt');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAccountsByFund = async (req, res) => {
  const { fund } = req.params;
  const accounts = await Account.find()
    .where('funds')
    .gt(+fund);
  res.json(accounts);
};
