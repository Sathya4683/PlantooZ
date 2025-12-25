import { body } from "express-validator";
import { validationResult } from "express-validator";

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const createPostValidator = [
    body("context_text")
        .isString()
        .isLength({min: 1,max: 500}),
    body("image_url").optional().isURL(),
    validate
];

const commentValidator = [
    body("comment_text")
        .isString()
        .isLength({min: 1, max: 300}),
    validate
];

export {createPostValidator,commentValidator};