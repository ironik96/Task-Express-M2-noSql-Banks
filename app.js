let accounts = require("./accounts");
const express = require("express");
const connectDB = require("./database");
const accountsRoutes = require("./api/accounts/accounts.routes");

connectDB();
const app = express();

app.use(express.json());
app.use("/api/accounts", accountsRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
