const asyncHandler = require('express-async-handler')
const Items = require('../models/Itemsmodel')
const user = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const upload = require('../MiddleWare/uploadImage')
const fs = require('fs');

const getitems = asyncHandler(async(req, res) => {
    
    const items = await Items.find()
    // {user: req.user.id}
    // console.log(items)
    res.status(200).json(items)
})
const postitems =asyncHandler(async (req, res) => {
    // Use multer middleware to handle file upload
  upload.single('image')(req, res, async (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      // Check if req.file is present, meaning a file was uploaded
      if (req.file) {
        // If a file was uploaded, you can access the file details like req.file.filename

      

        const item = await Items.create({
          itemName: req.body.itemName,
          provider: req.body.provider,
          amount: req.body.amount,
          price: req.body.price,
          user: req.user.name,
          imageUrl:req.file.path, // Save the filename in the database
        });

        res.status(200).json(item);
        console.log(item)
      } else {
        // If no file was uploaded, handle the logic without the file
        if (!req.body.itemName) {
          res.status(400).json({ error: 'Please add a text field' });
        }

        const item = await Items.create({
          itemName: req.body.itemName,
          provider: req.body.provider,
          amount: req.body.amount,
          price: req.body.price,
          user: req.user.name,
        });

        res.status(200).json(item);
      }
    }
  });
    // if(!req.body.itemName){
    //     res.status(400)
    //     throw new Error('please add a textfild')
        
    // }
    // const item = await Items.create({
    //     itemName: req.body.itemName,
    //     provider: req.body.provider,
    //     amount: req.body.amount,
    //     price: req.body.price,
    //     user:req.user.id
    //   })
    // res.status(200).json(item)
})
//update
const putitems = asyncHandler(async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
     
  try {
    
   
    const findItem = await Items.findById(req.params.id);
    console.log('findItem:', findItem);

    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path;
    }
    console.log('imageUrl:', imageUrl);


    const updatedItem = await Items.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imageUrl },
      { new: true }
    );
    console.log('updatedItem:', updatedItem);

    // Log old image path
    // const oldImageUrl = updatedItem.imageUrl;
    // console.log('oldImageUrl:', oldImageUrl);

    // Delete old image if conditions are met
    // if (oldImageUrl && (removePic === true || imageUrl) && fs.existsSync(oldImageUrl)) {
    //   fs.unlink(oldImageUrl, (err) => {
    //     if (err) {
    //       console.error('Error deleting old image:', err);
    //     } else {
    //       console.log('Old image deleted successfully');
    //     }
    //   });
    // } else {
    //   console.log('No image deleted');
    // }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }}

});
    
});



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
     //makes shure the logd user mach the item user

     if(decoded.user.role !== 'admin'){
        res.status(401)
        throw new Error ('user not autorized')
     }

    
    const deleteItem = await Items.findByIdAndDelete(req.params.id, null) 
    res.status(200).json({message: `item ${findItem.itemName} that was provided by ${findItem.provider} was deleted`})
  
})

const imageDeleteError = err => {
    err ? console.log(`Error deleting Image: ${err}`) : console.log('Image deleted successfully');
}

module.exports = {
    getitems,
    postitems,
    putitems,
    deleteitems,
    Search_item 
}
