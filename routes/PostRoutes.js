const express = require("express");
const router = express.Router();
const {insertPost,deletePost,getAllPosts,getUserPosts,getPostsById,updatePost,likePost,commentPost,searchPosts} = require("../controllers/PostController")

const {postInsertValdiation, postUpdateValidation, commentValidation} = require("../middlewares/postValidation")
const authPermission = require("../middlewares/authPermission");
const handleValidation = require("../middlewares/validationHandler")
const {imageUpload} = require("../middlewares/imageUpload")

router.route("/").get(getAllPosts)
.post(authPermission, imageUpload.single("image"), postInsertValdiation(), handleValidation, insertPost);

router.route("/:id")
.get(getPostsById)
.put( authPermission, imageUpload.single("name"), postUpdateValidation(), handleValidation, updatePost)
.delete(authPermission, deletePost)
router.route("/likes/:id").put(authPermission, likePost);
router.route("/comments/:id").put(authPermission, commentValidation(), handleValidation, commentPost)
router.route("/search").get(searchPosts)
router.route("/user/:id").get(getUserPosts);
module.exports = router;