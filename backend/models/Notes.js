const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true,
        
    },
   tag:{
        type : String,
       
    },
    date:{
        type :Date,
        default : Date.now
    }
  });

  const notes = mongoose.model('notes', notesSchema);

  module.exports = notes ;