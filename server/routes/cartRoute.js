import express from 'express'
import { updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/authUser.js'

const cartRoute = express.Router()

cartRoute.post('/update',authUser, updateCart)


export default cartRoute