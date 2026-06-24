const { Server } = require("socket.io");

const generateChatResponse = require(
    "../service/chat.service"
);

const chatModel = require(
    "../models/chat.model"
);

const historyService = require(
    "../service/history.service"
);

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        /*
        ==================================================
        SOCKET.IO EVENTS FOR POSTMAN TESTING
        ==================================================

        CLIENT / POSTMAN SENDS:
        chat-message

        SERVER SENDS RESPONSE:
        chat-response

        SEND THIS JSON WITH chat-message:
        {
            "userId": "YOUR_MONGODB_USER_ID",
            "message": "Explain RAG in simple words"
        }
        ==================================================
        */

        socket.on("chat-message", async (data) => {
            try {
                const { userId, message } = data || {};

                if (!userId) {
                    return socket.emit("chat-response", {
                        success: false,
                        message: "userId is required"
                    });
                }

                if (!message || !message.trim()) {
                    return socket.emit("chat-response", {
                        success: false,
                        message: "message is required"
                    });
                }

                const cleanMessage = message.trim();

                // Generate AI answer using your existing chat service
                const aiResponse = await generateChatResponse(
                    cleanMessage
                );

                // Save chat in Chat collection
                const chat = await chatModel.create({
                    user: userId,
                    message: cleanMessage,
                    response: aiResponse
                });

                // Save chat in History collection
                await historyService.saveHistory({
                    user: userId,
                    type: "chat",
                    data: {
                        prompt: cleanMessage,
                        response: aiResponse
                    }
                });

                // Send result only to the same connected user
                socket.emit("chat-response", {
                    success: true,
                    message: "Chat generated successfully",
                    chat
                });

            } catch (error) {
                console.log("SOCKET CHAT ERROR:", error.message);

                socket.emit("chat-response", {
                    success: false,
                    message: error.message || "Chat failed"
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = initializeSocket;