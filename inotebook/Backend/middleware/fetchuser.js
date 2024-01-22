const jwt = require('jsonwebtoken');


const fetchuser=(req,res,next)=>{
    //get the user from jwt toker and add id req obj
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send("error")
    }

    try {
        const data= jwt.verify(token,'shhhhh') //to check wether this token present or not

    req.user=data.user
    next();
        
    } catch (error) {
        res.status(401).send("error");
    }
    
}
module.exports=fetchuser;