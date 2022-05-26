const Account = require("../../models/Account");
let accounts = require("../../accounts");

// only 1 time to upload data
const uploadData = async () =>
  await accounts.forEach(async (account) => {
    const newAccount = new Account(account);
    await newAccount.save();
  });

exports.accountCreate = async (req, res) => {
  try {
    const response = await Account.create({ ...req.body, funds: 0 });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const accountToDelete = await Account.findById(accountId);
    if (accountToDelete) {
      await Account.deleteOne({ _id: accountId });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const accountToUpdate = await Account.findById(accountId);
    if (accountToUpdate) {
      await Account.findByIdAndUpdate(accountId, req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find();
    accounts.forEach((account) => {
      delete account.createdAt;
      delete account.updatedAt;
    });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};

exports.getVipAccounts = async (req, res) => {
  const { amount } = req.params;
  try {
    const vipAccounts = await Account.find({ funds: { $gt: amount } }).exec();
    res.json(vipAccounts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
