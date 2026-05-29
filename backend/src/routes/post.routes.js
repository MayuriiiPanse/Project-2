const express = require('express');
const postModel = require('../models/post.model.js');
const multer = require('multer');
const { createPostController,

    getPostByIdController,

    getCaptionController,

    getHashtagsController,

    getStoryController,

    getMoodController,

    getReelScriptController,

    getViralHookController,

    getPromptController} = require('../controller/postController.js');

const authMiddleware = require('../middlewares/auth.middleware.js');

const prouter = express.Router();
//const upload = multer({storage: multer.memoryStorage()})
//const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

// prouter.post('/', authMiddleware, upload.single('image'),createPostController);


// module.exports = prouter;

// CREATE POST
prouter.post(

    '/create',

    authMiddleware,

    upload.single('image'),

    createPostController

);


// GET FULL POST
prouter.get(

    '/:id',

    authMiddleware,

    getPostByIdController

);


// GET CAPTION
prouter.get(

    '/:id/caption',

    authMiddleware,

    getCaptionController

);


// GET HASHTAGS
prouter.get(

    '/:id/hashtags',

    authMiddleware,

    getHashtagsController

);


// GET STORY
prouter.get(

    '/:id/story',

    authMiddleware,

    getStoryController

);


// GET MOOD
prouter.get(

    '/:id/mood',

    authMiddleware,

    getMoodController

);


// GET REEL SCRIPT
prouter.get(

    '/:id/reel-script',

    authMiddleware,

    getReelScriptController

);


// GET VIRAL HOOK
prouter.get(

    '/:id/viral-hook',

    authMiddleware,

    getViralHookController

);


// GET AI PROMPT
prouter.get(

    '/:id/prompt',

    authMiddleware,

    getPromptController

);


module.exports = prouter;

