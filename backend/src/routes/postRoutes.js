import express from "express";
import { createPost, getPostsFeed, likePost, unlikePost, addComment, getPostComments, deletePost} from "../controllers/postController.js";

import { createPostValidator, commentValidator} from "../validators/postValidator.js";

const router = express.Router();

/**
 * -------------------------
 * POSTS (Community Feed)
 * -------------------------
 */

/**
 * Create a new post
 * POST /posts
 */

router.post("/",createPostValidator,createPost);
/**
 * Get posts feed (paginated, newest first)
 * GET /posts?cursor=&limit=
 */

router.get("/",getPostsFeed);

/**
 * -------------------------
 * LIKES
 * -------------------------
 */

/**
 * Like a post
 * POST /posts/:postId/like
 */

router.post("/:postId/like",likePost);

/**
 * Unlike a post
 * DELETE /posts/:postId/like
 */

router.delete("/:postId/like",unlikePost);

/**
 * -------------------------
 * COMMENTS
 * -------------------------
 */

/**
 * Add a comment to a post
 * POST /posts/:postId/comments
 */

router.post("/:postId/comments", commentValidator, addComment);

/**
 * Get comments for a post (paginated)
 * GET /posts/:postId/comments?cursor=&limit=
 */

router.get("/:postId/comments",getPostComments);

/**
 * -------------------------
 * MODERATION / MANAGEMENT
 * -------------------------
 */

/**
 * Delete a post (owner or admin)
 * DELETE /posts/:postId
 */

router.delete("/:postId",deletePost);

export default router;