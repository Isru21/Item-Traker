const asyncHandler = require('express-async-handler')
const express = require ('express')
const router = express.Router()
const {protect} = require ('../MiddleWare/userAutentication')
const {getitems,putitems,postitems,deleteitems,Search_item} = require ('../Controller/Itemcontroller')


router.route('/').get(protect,getitems).post(protect,postitems)
router.route('/search').get(protect,Search_item)
router.route('/:id').put(protect,putitems).delete(protect,deleteitems)

module.exports =router