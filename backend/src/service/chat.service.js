const axios = require('axios');

async function generateChatResponse(message) {

    try {

        const response = await axios.post(

            'https://openrouter.ai/api/v1/chat/completions',

            {

                model: 'openai/gpt-4o-mini',

                messages: [

                    {

                        role: 'system',

                        content: `
You are an AI Creator Assistant.

Help users with:
- captions
- hashtags
- reel ideas
- YouTube titles
- viral hooks
- branding
- social media strategy
- thumbnail ideas
- content planning

Keep responses creative and useful.
`

                    },

                    {

                        role: 'user',

                        content: message

                    }

                ]

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    'Content-Type': 'application/json'

                }

            }

        );

        return response.data
            .choices[0]
            .message
            .content;

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        return "AI assistant is currently unavailable.";
    }

}

module.exports = generateChatResponse;