import prisma from "../../prisma/prismaClient.js";

const createPost = async (userId,data) => {
    return prisma.posts.create({
        data: {
            content: data.content,
            userId,
        },
    });
};

const getPostsFeed = async (cursor, limit = 10) => {
    return prisma.posts.findMany({
        take: Number(limit),
        skip: cursor ? 1 : 0,
        cursor: cursor ? {id: Number(cursor)} : undefined,
        orderBy: {createdAt: "desc"},
        include: {
            user: { select : {name: true}},
            _count: {
                select: {likes: true, comments: true},
            },
        },
    });
};

const likePost = async (userId,postId) => {
    return prisma.postLikes.create({
        data: {
            userId,
            postId: Number(postId),
        },
    });
}

const unlikePost = async (userId,postId) => {
    return prisma.postLikes.deleteMany({
        where: {
            userId,
            postId: Number(postId),
        },
    });
};

const addComment = async (userId, postId, text) => {
    return prisma.comments.create({
        data: {
            text,
            userId,
            postId:Number(postId),
        },
    });
};

const getPostComments = async (postId, cursor, limit=10) =>{
    return prisma.comments.findMany({
        where: { 
            postId: Number(postId),
            take: Number(limit),
            skip: cursor ? 1:0,
            cursor: cursor ? {id: Number(cursor)}: undefined,
            orderBy: {createdAt: "desc"},
            include: {
                user: {select: {name: true}}
            },
        },
    });
};

const deletePost = async (userId,postId) =>{
    return prisma.posts.deleteMany({
        where:{
            id: Number(postId),
            userId,
        },
    });
};

export {createPost,getPostsFeed,likePost,unlikePost,addComment,getPostComments,deletePost}; 