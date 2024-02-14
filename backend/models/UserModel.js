const mongoose = require('mongoose')

const userschema = mongoose.Schema({

    name:{
        type: String,
        required: [true, 'please add a name']
    },
    phone:{
        type: String,
        required: [true, 'please add a phone'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'please add a password']
    },
    role:{
        type: String,
        default: "user"
    },
  


},

)

module.exports = mongoose.model('user', userschema )