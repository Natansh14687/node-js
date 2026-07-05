const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("../middlewares/auth");

// => middleware for authenticating admin route
app.use("/admin", adminAuth);

app.get("/user/login", (req, res, next) => {
  console.log("Inside /user/login");
  res.send("Response from /user/login route!!");
});

app.get("/user/getData", userAuth, (req, res, next) => {
  console.log("This is the response from /user/getData route");
  res.send("Response from /user/getData route !!");
});

app.get("/admin/getData", (req, res, next) => {
  res.send("Getting the data from admin !");
});

app.delete("/admin/deleteData", (req, res, next) => {
  res.send("Deleting the data from the admin !");
});

app.listen(7777, () => {
  console.log("App is successfully listening at port 7777");
});
