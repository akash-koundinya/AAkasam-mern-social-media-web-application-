import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export   const register = async (req,res) =>{
   try{
        const
        {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }=req.body; //desturucturing this parameters from the body
        const salt = await bcrypt.genSalt(); //use salt to encrypt our password

        const passwordHash= await bcrypt.hash(password,salt);//encrypt the password and get a password hash
            const newUser=new User(
                {
                    firstName,
                    lastName,
                    email,
                    password:passwordHash,
                    picturePath,
                    friends,
                    location,
                    occupation,
                    viewedProfile:Math.floor(Math.random()*10000),
                    impressions:Math.floor(Math.random()*10000)
                }
            )
           const savedUser=  await newUser.save();  
        
           res.status(200).json(savedUser);// everything goes fine will send saved user to database 201 status means some thing is created


    } 
 
    
    
    catch (err)
    {console.log(err);
res.status(500).json({error:err.message});// any error ocurrs will send a status code of 500 and send the err sent by mongo db
    }


};
export const login=async(req,res)=>
{try{
    const {email,password}=req.body;//destructuring email and password from front end

const user=await User.findOne({email:email})// checkeing whether user exists in the databasea
if(!user){
    return res.status(400).json({msg:"user dose not exist "});// user does not found
}
const isMatch=await bcrypt.compare(password,user.password); // if found will check password is right or wrong  user.password is original,password is password given by the user

if(!isMatch)
{
    return res.status(400).json({msg:"invalid password"}); 


} 
const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
delete user.password;
res.status(200).json({token,user});

} catch (err) {
    console.log(err+"connected");
    res.status(500).json({error:err.message});

}

} 