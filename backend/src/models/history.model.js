const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    type:{
        type:String,
        enum:[
             "chat",
             "image-analysis",
             "poster",
             "voice"
            ],
        required:true
    },

    data:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "History",
    historySchema
);