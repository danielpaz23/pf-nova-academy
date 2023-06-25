const {Router} = require('express');
const {createUser, getUsers, getUserById, updateUserById, deleteUserById,getLoginUser} = require ("../controllers/user.controller.js");
const validateUser = require('../validators/user.js');
const VerifyAuthorization = require('../middleware/auth.js');

const userRoutes = Router();


userRoutes.get("/login",getLoginUser)
userRoutes.post("/singup",validateUser,createUser)
userRoutes.get("/", VerifyAuthorization, getUsers)
userRoutes.get("/:userId", VerifyAuthorization,getUserById)
userRoutes.put("/:userId", VerifyAuthorization,updateUserById)
userRoutes.delete("/:userId", VerifyAuthorization,deleteUserById)

module.exports = userRoutes;