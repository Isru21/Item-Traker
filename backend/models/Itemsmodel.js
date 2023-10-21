const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    provider:{
        type:String,
        required:(true,"please enter a provider")
    },

    itemName:{
        type:String,
        required:(true,"please enter an item name")
    },

    amount:{
        type:String,
        required:(true,"please enter an amount")
    },

    price:{
        type:String,
        required:(true,"please enter a price")
    },

    

},
{
   timestamps : true, 
})

module.exports = mongoose.model('Items', ItemSchema)