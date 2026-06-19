const generateChatResponse = require(
    '../service/chat.service'
);

const chatModel = require(
    '../models/chat.model'
);

const historyService = require(
    '../service/history.service'
);

async function chatController(req, res) {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({

                message: 'Message is required'

            });

        }

        const aiResponse =
            await generateChatResponse(message);

        const chat = await chatModel.create({

            user: req.user._id,

            message,

            response: aiResponse

        });

        await historyService.saveHistory({

            user: req.user._id,

            type: "chat",

            data: {

                prompt: message,

                response: aiResponse

            }

        });

        res.status(201).json({

            message: 'Chat generated successfully',

            chat

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: 'Chat failed'

        });

    }

}

module.exports = {

    chatController

};