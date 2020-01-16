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
    const name = req.body.name;
    console.log(req.body);
    if(Object.entries(req.body).length === 0){
        res.status(400).json({message: "missing user data"})
        
    }else if(!name || typeof name !== 'string'){
        res.status(400).json({message: "missing required name field"});
        
    }else{
        next();
    }
}
function validatePost(req,res,next){
    const text = req.body.text;
    console.log(req.body);
    if(Object.entries(req.body).length === 0){
        res.status(400).json({message: "missing post data"})
        
    }else if(!text || typeof text !== 'string' || !req.body.id){
        res.status(400).json({message: "missing required text field or user_id"});
        
    }else{
        next();
    }
}

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
}







