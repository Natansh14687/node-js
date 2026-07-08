const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");
    if (!receivedRequests.length) {
      throw new Error("No requests for now !");
    }

    res.json({ message: `requests retrived successfully`, receivedRequests });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;
