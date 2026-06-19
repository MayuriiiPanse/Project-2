const uploadFile = require("../service/storage.service.js");

const generateAIContent = require("../service/ai.service.js");

const postModel = require("../models/post.model.js");

const historyService = require(
    "../service/history.service"
);

const fs = require("fs");

// async function createPostController(req, res) {

//     try {

//         const file = req.file;

//         if (!file) {

//             return res.status(400).json({
//                 message: "Image is required",
//             });

//         }

//         console.log("File received:", file);

//         // Upload image to Cloudinary
//         const result = await uploadFile(file.path);

//         // Generate ALL AI content
//         const aiData = await generateAIContent(
//             result.secure_url
//         );

//         // Save to MongoDB
//         const post = await postModel.create({

//             image: result.secure_url,

//             caption: aiData.caption,

//             hashtags: aiData.hashtags,

//             mood: aiData.mood,

//             story: aiData.story,

//             reelScript: aiData.reelScript,

//             viralHook: aiData.viralHook,

//             aiPrompt: aiData.aiPrompt,

//             user: req.user._id

//         });

//         // Delete local upload
//         fs.unlinkSync(file.path);

//         // res.status(201).json({

//         //     message: "Post created successfully",

//         //     post

//         // });

//         res.status(201).json({
//    message: "Post created successfully",
//    postId: post._id,
//    caption: post.caption
// });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({

//             message: "Upload failed"

//         });

//     }

// }

async function createPostController(req, res) {

    try {

        const file = req.file;

        if (!file) {

            return res.status(400).json({
                message: "Image is required",
            });

        }

        console.log("File received:", file);

        // Upload image to Cloudinary
        const result = await uploadFile(file.path);

        // Generate AI content
        const aiData = await generateAIContent(
            result.secure_url
        );

        // Save Post
        const post = await postModel.create({

            image: result.secure_url,

            caption: aiData.caption,

            hashtags: aiData.hashtags,

            mood: aiData.mood,

            story: aiData.story,

            reelScript: aiData.reelScript,

            viralHook: aiData.viralHook,

            aiPrompt: aiData.aiPrompt,

            user: req.user._id

        });

        // Save History
        await historyService.saveHistory({

            user: req.user._id,

            type: "image-analysis",

            data: {

                image: result.secure_url,

                caption: aiData.caption,

                hashtags: aiData.hashtags,

                mood: aiData.mood,

                story: aiData.story,

                reelScript: aiData.reelScript,

                viralHook: aiData.viralHook,

                aiPrompt: aiData.aiPrompt

            }

        });

        // Delete local uploaded file
        fs.unlinkSync(file.path);

        res.status(201).json({

            message: "Post created successfully",

            postId: post._id,

            caption: post.caption

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Upload failed"

        });

    }

}

async function getPostByIdController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.status(200).json(post);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch post"
        });

    }

}

async function getCaptionController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            caption: post.caption
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch caption"
        });

    }

}

async function getHashtagsController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            hashtags: post.hashtags
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch hashtags"
        });

    }

}

async function getStoryController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            story: post.story
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch story"
        });

    }

}

async function getMoodController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            mood: post.mood
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch mood"
        });

    }

}

async function getReelScriptController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            reelScript: post.reelScript
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch reel script"
        });

    }

}

async function getViralHookController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            viralHook: post.viralHook
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch viral hook"
        });

    }

}

async function getPromptController(req, res) {

    try {

        const post = await postModel.findById(
            req.params.id
        );

        res.status(200).json({
            aiPrompt: post.aiPrompt
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch prompt"
        });

    }

}


module.exports = {

    createPostController,

    getPostByIdController,

    getCaptionController,

    getHashtagsController,

    getStoryController,

    getMoodController,

    getReelScriptController,

    getViralHookController,

    getPromptController

};