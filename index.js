const express = require("express");
const app = express();
const router = require("./src/routes/routes");
const port = 5000;

app.use(express.urlencoded());
app.use(express.json());
app.use("/", router);

app.listen(port, (req, res) => {
  console.log("http://localhost:" + port);
});
