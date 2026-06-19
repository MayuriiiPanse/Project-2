const axios = require("axios");
const fs = require("fs");
const path = require("path");

const generatePoster = async (userPrompt) => {

    // Generate enhanced prompt
    const aiResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "Convert user ideas into detailed professional poster generation prompts. Return only the prompt."
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const enhancedPrompt =
        aiResponse.data.choices[0].message.content;

    // Pollinations Image URL
    const pollinationUrl =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(
            enhancedPrompt
        )}`;

    // Create uploads/images folder if not exists
    const imageDir = path.join(
        __dirname,
        "../../uploads/images"
    );

    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, {
            recursive: true
        });
    }

    // Image file name
    const fileName = `poster-${Date.now()}.png`;

    const filePath = path.join(
        imageDir,
        fileName
    );

    // Download image
    const imageResponse = await axios({
        url: pollinationUrl,
        method: "GET",
        responseType: "stream"
    });

    const writer = fs.createWriteStream(
        filePath
    );

    imageResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {

        writer.on("finish", resolve);

        writer.on("error", reject);

    });

    return {
        enhancedPrompt,
        imageUrl: `/uploads/images/${fileName}`
    };

};

module.exports = {
    generatePoster
};