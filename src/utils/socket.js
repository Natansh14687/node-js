const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/Chat");

const getSecureRoom = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Handling events

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = getSecureRoom(userId, targetUserId);

      console.log(`${firstName} joined chat : ${room}`);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const room = getSecureRoom(userId, targetUserId);
          socket.join(room);
          console.log(`${firstName} sent : ${text}`);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(room).emit("messageReceived", { firstName, text });
        } catch (err) {}
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
