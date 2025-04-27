import {login,register,admin,currentUser} from '../controllers/userController.js'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/login',login);
userRouter.post('/register',register);
userRouter.post('/admin',admin)
userRouter.get('/currentUser',currentUser)

export default  userRouter