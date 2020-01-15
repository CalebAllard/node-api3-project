const dbPosts = require('../posts/postDb');
const dbUsers = require('../users/userDb');
function logger(req,res,next){
    const date = new Date();
    console.log(`${req.method} "${req.url}" @ ${date.getHours()}:${date.getMinutes()} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
    next();
}
function validateUserId(req,res,next){
    const id = req.params.id;
   
    dbUsers.getById(id)
    .then(resp => {
       
        if (resp.id == id){
            
            req.user = resp;
            next();
        }else{
            throw(err);
        }
    })
    .catch(err => {
        res.status(400).json({message: "invalid user id" });
    })
}
function validateUser(req,res,next){

}
function validatePost(req,res,next){

}

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
}







