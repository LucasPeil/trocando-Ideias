const express = require("express");
const router = express.Router();

const {register,getLoggedUser,login,updateUser,getUserById} = require("../controllers/UserController");

const {createUserValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidation")
const handleValidation = require("../middlewares/validationHandler")
const authPermission = require("../middlewares/authPermission");
const {imageUpload} = require("../middlewares/imageUpload")

router.route("/register").post( createUserValidation(), handleValidation, register);
router.route("/login").post(loginValidation(), handleValidation, login);
router.route("/profile").get(authPermission, getLoggedUser);
router.route("/user/:id").put(authPermission,userUpdateValidation(), handleValidation, imageUpload.single("profileImage"), updateUser)
router.route("/:id").get(getUserById)

module.exports = router;
