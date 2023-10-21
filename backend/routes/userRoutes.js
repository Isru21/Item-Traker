const express = require ('express')
const router = express.Router()
const {registerUser,loginUser, getMe, getAll } = require ('../Controller/userController')
// loginUser,getUserInfo
const {protect} = require ('../MiddleWare/userAutentication')

router.post('/', registerUser)
router.get('/me',protect , getMe )
router.get('/all',protect, getAll)
router.post('/login',loginUser )

module.exports = router