const express = require('express');
const auth = require('../middleware/authorization');
const { createUser, login, verifyUser, updateUser, logout } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/register', createUser); // localhost:3000/api/v1/users/register
userRouter.post('/login', login); // localhost:3000/api/v1/users/login
userRouter.get('/verify-user', auth, verifyUser); // localhost:3000/api/v1/users/verify-user
userRouter.put('/update-user', auth, updateUser), // localhost:3000/api/v1/users/update-user
userRouter.post('/logout', logout); // localhost:3000/api/v1/users/logout

module.exports = userRouter;