const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const supportRouter = require("./routers/supportRouter");
const storageRouter = require("./routers/storageRouter");
const webhook = require("./routers/webhook")
app.use("/supportteamtest", supportRouter);
app.use("/storage", storageRouter);
app.use("/webhook", webhook);
app.get("/",(req, res, next)=>res.redirect("/supportteamtest"))
app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Not found!" });
  });
  module.exports = app;