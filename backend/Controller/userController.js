const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

//@desc registers the user  
//@route POST/api/users
//@acess private
const registerUser = asyncHandler( async(req, res) => {
   const {name, phone, password, role} = req.body

   if(!name|| !phone|| !password) {
       res.status(400)
       throw new Error('please fill all the textfild')
   }
//check if our user exists
   const userExists = await User.findOne({phone})

   if(userExists){
       res.status(400)
       throw new Error('a user is already registerd with that phone number')
   }

//hash the password
   const salt = await bcrypt.genSalt(10)
   const hashedpass = await bcrypt.hash (password, salt)

//creat the user
   const user = await User.create({
       name,
       phone,
       password: hashedpass,
       role,

   })

   if(user){
       res.status(201).json({
           _id:user.id,
           name:user.name,
           phone:user.phone,
           token: generatetoken(user._id)
        
       })
     
   }else{
       res.status(400)
       throw new Error ('invalid user data')
   }

  
})


//@desc gets the usrs info
//@route GET/api/users/me
//@acess private
const getMe =  asyncHandler( async(req, res)=> {

   const {_id, name, phone,role} = await User.findById(req.user.id)

   res.status(200).json({
       id: _id,
       name,
       phone,
       role
       
   })

  
})

//@desc autenticates the user
//@route POST/api/users/login
//@acess private
const loginUser =  asyncHandler( async(req, res)=> {
   const {phone, password} = req.body

   const user = await User.findOne({phone})
    
   if(user && (await bcrypt.compare(password, user.password))) {
    
     res.status(200).json({
           
           _id:user.id,
           name:user.name,
           phone:user.phone,
           role:user.role,
           token: generatetoken(user)
     })
   }else{
       res.status(400)
       throw new Error ('invalid credinctials')
   }


})

const getAll = asyncHandler( async(req, res)=> {

    const {role} = await User.findById(req.user.id)

    if(role==='user'){
        throw new Error('only an admin can see this content')
    }
    
    const user = await User.find()

    res.status(200).json(user)
    

        

})

const deleteusers = asyncHandler(async(req, res) => {
    const findUser = await User.findById(req.params.id)
    const token = req.headers.authorization.split(' ')[1]
   // console.log('selam')
    //verifay token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded)
    if(!findUser){
        res.status(400)
        throw new Error('invalid user id')
    }

    //  if(decoded.user.role !== 'admin'){
    //     res.status(401)
    //     throw new Error ('user not autorized')
    //  }

    
    const deleteItem = await User.findByIdAndDelete(req.params.id, null) 
    res.status(200).json({message: `user ${findUser.name} is deleted`})
  
})



const generatetoken = (user) => {
   return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '10d'})
}
module.exports = {registerUser, getMe, loginUser, getAll, deleteusers}