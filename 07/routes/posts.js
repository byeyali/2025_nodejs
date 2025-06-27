const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { uploadSingle, uploadMultiple } = require("../middlewares/upload");

router.post("/", uploadMultiple, postController.createPost);
router.get("/", postController.findAllPosts);
router.get("/:id", postController.findOnePost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.post("/:postId/comments", postController.addComments);
router.get("/:postId/comments", postController.findComments);
router.put("/:postId/comments/:id", postController.updateComments);
router.delete("/:postId/comments/:id", postController.deleteComments);

module.exports = router;
