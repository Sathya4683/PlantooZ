import * as postService from "../services/postService.js";

//Using system user as temporary until auth is implemented
const getUserID = (req) => req.user?.id || 1;

const createPost = async (req,res) => {
    try{
        const post = await postService.createPost(
            getUserID(req),
            req.body
        );
        res.status(201).json({post});
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
};

const getPostsFeed = async (req,res) => {
    try{
        const { cursor, limit } = req.query;
        const posts = await postService.getPostsFeed(cursor,limit);
        res.json(posts);
    } catch (err){
        res.status(500).json({message: err.message});
    }
};

const likePost = async (req,res) => {
    try{
        await postService.likePost(getUserID(req), req.params.postId);
        res.status(200).json({ message: "Post liked"});
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
};

const unlikePost = async (req,res) =>{
    try{
        await postService.unlikePost(getUserID(req), req.params.postId);
        res.status(200).json({message: "Post unliked"});
    } catch( err){
        res.status(400).json({message: err.message});
    }
}

const addComment = async (req,res) => {
    try{
        const comment = await postService.addComment(
            getUserID(req),
            req.params.postId,
            req.body.comment_text
        );
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const getPostComments = async (req,res) => {
    try{
        const comments = await postService.getPostComments(
            req.params.postId,
            req.query.cursor,
            req.query.limit
        );
        res.json(comments);
    } catch(err){
        res.status(400).json({message: err.message});
    }
}

const deletePost = async (req,res) =>{
    try{
        await postService.deletePost(getUserID(req), req.params.postId);
        res.status(204).json({message: "Post deleted successfully!"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
}

export {createPost,getPostsFeed,likePost,unlikePost,addComment,getPostComments,deletePost};
