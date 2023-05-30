var jwt  = require('jsonwebtoken')

//Secret key of jwt

const JWT_SECRET = "IamCoding";

const fetchUser =(req,res,next)=>{
    // Get the user from jwt token  and id to req object

    const token  = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "Please Authenticate user using valid token . " })
    }

    try {
        const data  = jwt.verify(token ,JWT_SECRET );
    req.user = data.user;

    } catch (error) {
        res.status(401).send({error : "Please Authenticate user using valid token . " })
    }
  next();
}

module.exports = fetchUser;