### Create your Model

1. In your models folder, create a file called `Account.js`, make sure it starts with a capital letter.
2. In this file we will start with importing `model` and `Schema` from mongoose.

```js
const { model, Schema } = require('mongoose');
```

3. Check your fields in your dummy database, and create your fields in the init method to mirror your dummy database's fields. Don't forget to give every field a type.

```javascript
const AccountSchema = new Schema({
  username: String,
  funds: Number,
});
```

4. Don't forget to export your model.

```js
module.exports = model('Account', AccountSchema);
```

### Accounts List

1. Make your `Account` List route `asynchronous` and add a `try-catch` block.

```js
exports.accountsGet = async (req, res) => {
  try {
    res.json(accounts);
  } catch (e) {}
};
```

2. Call the mongoose method `.find()` and save the returned value in a variable called `accounts`.

```js
exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find();
    console.log('accounts', accounts);
  } catch (error) {}
};
```

3. Customize the attributes so that `createdAt` and `updatedAt` are excluded.

```js
const accounts = await Account.find({}, '-createdAt -updatedAt');
```

4. Pass `accounts` as a `JSON` response.

```js
exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find({}, '-createdAt -updatedAt');
    res.json(accounts);
  } catch (error) {}
};
```

5. In `catch`, set the response status code to `500` and return the error message as a `JSON` response.

```js
exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find({}, '-createdAt -updatedAt');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

6. Test your route in `Postman`.

### Account Create

1. Make your `Account` Create route function `asynchronous` and add a `try-catch block`.

```js
exports.accountCreate = async (req, res) => {
  try {
    const id = accounts[accounts.length - 1].id + 1;
    const newAccount = { ...req.body, funds: 0, id };
    accounts.push(newAccount);
    res.status(201).json(newAccount);
  } catch (error) {}
};
```

2. Pass the request's body to the mongoose method `.create()` . Keep in mind that this method is asynchronous. Hint hint: `await`.

```js
exports.accountCreate = async (req, res) => {
  try {
    await Account.create(req.body);
  } catch (error) {}
};
```

3. Save the returned value from `.create()` in a variable called `newAccount`.

```js
exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
  } catch (error) {}
};
```

4. Pass `newAccount` as a `JSON` response. Don't forget to set the status code to `201`.

```js
exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {}
};
```

5. In `catch`, set the response status code to `500` and return the error message as a `JSON` response.

```js
exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

6. To test your new method, create a new account in `Postman`. Then check if it was added in your `tablePlus` page.

### Update Account

1. Make your `Account` Update route function `asynchronous` and add a `try-catch block`.

```js
exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = accounts.find((account) => account.id === +accountId);
    if (foundAccount) {
      foundAccount.funds = req.body.funds;
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (e) {}
};
```

2. Pass the `accountId` from your route parameter to `.findById()` method and save it in a variable called `foundAccount`.

```js
exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = Account.findById(+accountId);
  } catch (e) {}
};
```

3. If `foundAccount` exists, call the `.findByIdAndUpdate()` method on `foundAccount` and pass it the body of the request.

```js
try {
  const foundAccount = await Account.findById(+accountId);
  if (foundAccount) {
  await foundAccount.findByIdAndUpdate(accountId, req.body, { new: true });
  }
}
```

4. Don't forget to set the status code to `204` and end the response.

```js
try {
  const foundAccount = await Account.findById(+accountId);
  if (foundAccount) {
  await foundAccount.findByIdAndUpdate(accountId, req.body, { new: true });
  res.status(204).end();
  }
}
```

5. If it doesn't exist set the response status code to `404` and return an error message stating that this account doesn't exist as a `JSON` response.

```js
try {
  const foundAccount = await Account.findById(+accountId);
  if (foundAccount) {
    await foundAccount.findByIdAndUpdate(accountId, req.body, { new: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
}
```

6. In the `catch` block, set the response status code to `500` and return the error message as a `JSON` response.

```js
catch (error) {
    res.status(500).json({ message: error.message });
  }
```

### Account Delete

1. Make your `Account` Delete route function `asynchronous` and add a `try-catch` block.

```js
exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
  } catch (error) {}
};
```

2. Pass the `accountId` from your route parameter to `.findById()` method and save it in a variable called `foundAccount`.

```js
try {
  const foundAccount = await Account.findById(+accountId);
}
```

3. If `foundAccount` exists, call the `.remove()` method on `foundAccount`.

```js
try {
  const foundAccount = await Account.findById(+accountId);
  if (foundAccount){
      await foundAccount.remove();
  }
}
```

4. Don't forget to set the status code to `204` and end the response.

```js
try {
  const foundAccount = await Account.findById(+accountId);
  if (foundAccount){
    await foundAccount.remove();
    res.status(204).end();
  }
}
```

5. If it doesn't exist set the response status code to `404` and return an error message stating that this account doesn't exist as a `JSON` response.

```js
try {
  const foundAccount = await Account.findById(+accountId);
  if (foundAccount) {
    await foundAccount.remove();
    res.status(204).end();
  } else {
    res.status(404).json({ message: "account not found" });
  }
}
```

6. In the `catch` block, set the response status code to `500` and return the error message as a `JSON` response.

```js
catch (error) {
    res.status(500).json({ message: error.message });
  }
```

7. Test your route in Postman.
8. Send a request to an account that doesn't exist to make sure the error is handled correctly.

### 🍋 Model Validation

1. The `username` should be `required` and can't be `null`.

- In your `models/Account.js`:

```js
  username: {
    type: String,
    required: true
  },
```

Give `funds` a default value of `0`.

```js
  funds: {
    type: Number,
    default: 0
  },
```

### 🌶 Vip Accounts

Create a route that accepts an integer as a query and responds with the accounts that has more balance than this amount.

1. In your `accounts.routes.js`, replace your `getAccountByUsername` route to:

```js
router.get('/:fund', getAccountsByFunds);
```

2. In your `accounts.routes.js`, create a function called `getAccountsByFunds`:

```js
exports.getAccountsByFund = (req, res) => {
  const { fund } = req.params;
};
```

4. Use `.where` method with `$gt` which stands for `greater than` and pass the `fund` to it:

```js
exports.getAccountsByFund = async (req, res) => {
  const { fund } = req.params;
  const accounts = await Account.find()
    .where('funds')
    .gt(+fund);
  res.json(accounts);
};
```
