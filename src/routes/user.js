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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const userConnections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    if(!userConnections.length){
        throw new Error("No Connections !!");
    }

    const data = userConnections.map((field) => {
        if(field.fromUserId._id.toString() === loggedInUser._id.toString()){
            return field.toUserId;
        }
        return field.fromUserId;
    })

    res.send(data);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
