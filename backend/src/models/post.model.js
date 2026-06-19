const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    image: {
        type: String
    },

    caption: {
        type: String
    },

    hashtags: {
        type: [String],
        default: []
    },

    mood: {
        type: String,
        default: ""
    },

    story: {
        type: String,
        default: ""
    },

    reelScript: {
        type: String,
        default: ""
    },

    viralHook: {
        type: String,
        default: ""
    },

    aiPrompt: {
        type: String,
        default: ""
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
