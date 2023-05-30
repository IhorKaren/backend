const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || config.get("serverPort");

app.use(express.json());
app.use(cors());

const burgersRouter = require("./routes/burgers");
const shopsRouter = require("./routes/shops");
const ordersRouter = require("./routes/orders");

app.use("/burgers", burgersRouter);
app.use("/shops", shopsRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
