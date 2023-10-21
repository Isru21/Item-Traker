const asyncHandler = require('express-async-handler')
const Items = require('../models/Itemsmodel')
const user = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const getitems = asyncHandler(async(req, res) => {
    
    const items = await Items.find()
    // {user: req.user.id}
    // console.log(items)
    res.status(200).json(items)
})
const postitems =asyncHandler(async (req, res) => {
    if(!req.body.itemName){
        res.status(400)
        throw new Error('please add a textfild')
        
    }
    const item = await Items.create({
        itemName: req.body.itemName,
        provider: req.body.provider,
        amount: req.body.amount,
        price: req.body.price,
        user:req.user.id
      })
    res.status(200).json(item)
})
//update
const putitems = asyncHandler(async(req, res) => {
    const findItem = await Items.findById(req.params.id)
   
    if(!findItem){
        res.status(400)
        throw new Error('invalid id')
    }
   

    const newItem = await Items.findByIdAndUpdate(req.params.id, req.body,{
        new: true
     })
  
      res.status(200).json(newItem)
    

   
})


const Search_item = asyncHandler(async(req, res) => {


    const findItem = await Items.find({ "itemName": { $regex: req.query.Searched_item, $options: "i" } });

    //console.log(findItem)

    res.status(200).json(findItem)
    

})




const deleteitems = asyncHandler(async(req, res) => {
    const findItem = await Items.findById(req.params.id)
    const token = req.headers.authorization.split(' ')[1]
    console.log('selam')
    //verifay token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded)
    if(!findItem){
        res.status(400)
        throw new Error('invalid item id')
    }
    if(!user){
        res.status(401)
        throw new Error ('no user detected')
     }
     //makes shure the logd user mach the song user

     if(decoded.user.role !== 'admin'){
        res.status(401)
        throw new Error ('user not autorized')
     }

    
    const deleteItem = await Items.findByIdAndDelete(req.params.id, null) 
    res.status(200).json({message: `item ${findItem.itemName} that was provided by ${findItem.provider} was deleted`})
  
})

module.exports = {
    getitems,
    postitems,
    putitems,
    deleteitems,
    Search_item 
}
