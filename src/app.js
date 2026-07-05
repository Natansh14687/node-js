const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("../middlewares/auth");

app.get("/user/getData", (req, res, next) => {
  try {
    throw new Error("vvghvgv")
    res.send("Helloooo");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next)=>{
  res.status(500).send("some error occured");
})

app.listen(7777, () => {
  console.log("App is successfully listening at port 7777");
});
