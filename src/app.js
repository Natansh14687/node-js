const express = require("express");

const app = express();

// This route will dominate over all the http methods GET, POST, DELETE etc because is applicable for all methods and dominant so should be placed belo them or not placed if using HTTP methods
app.use("/user", (req, res) => {
  res.send("Hahahahahaha  !!!!");
});

// This will only handle GET calls to /user
app.get("/user", (req, res) => {
  res.send({ name: "Natansh", age: 22 });
});

app.post("/user", (req, res) => {
  res.send("User added successfully");
});

app.delete("/user", (req, res) => {
  res.send("User deleted !!");
});

// This will match all the HTTP method api calls to /test
app.use("/test", (req, res) => {
  res.send("This is test route");
});

app.listen(7777, () => {
  console.log("App is successfully listening at port 7777");
});
