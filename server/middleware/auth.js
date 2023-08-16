// for autthorization
// we have to add this when ever we have to ad d protection to any route


import jwt from "jsonwebtoken"
export const verifyToken =async(req,res,next) => //next parameter wont allow function to continue
{
    try{
        let token=req.header("Authorization");
        if(!token)
        {
            return res.status(403).send("acess denied")
        }

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
        }
        const verified=jwt.verify(token,process.env.JWT_SECRET);
      req.user=verified;
      next();
    }catch(err)
        {res.status(500) .json({error:err.message});
            
        }
}