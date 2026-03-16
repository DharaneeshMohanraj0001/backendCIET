const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  questionId:{
    type:String,   // question IDs are strings like "apt-054", not numbers
    required:true
  },

  skill:{
    type:String,
    required:true
  },

  isCorrect:{
    type:Boolean,
    required:true
  }

},{
  timestamps:true   // automatically creates createdAt & updatedAt
});

module.exports = mongoose.model("Attempt",attemptSchema);