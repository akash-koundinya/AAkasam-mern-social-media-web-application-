import User from "../models/User.js";

// Read  user and friends
export const getUser =async (req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);//status 200 if   something created;

    } catch(err){
        res.status(404).json({message:err.message});
    }
} 
export const getUserFriends= async (req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))  // uc an also pass global id 


        ) ;//promise all aswe r doing multiple api calls
    const formatedFriends=friends.map(
        ({_id,firstName,lastName,occupation,location,picturePath}) =>{
            return {_id,firstName,lastName,occupation,location,picturePath};
        }
    );
        res.status(200).json(formatedFriends);//status 200 if  code found;

    } catch(err){
        res.status(404).json({message:err.message});
    }
}
// update  to remove friend id
export const addRemoveFriend=async (req,res)=>
{
    try{
        const{id,friendId}=req.params;
        const user=await User.findById(id);
        const friend= await User.findById(friendId);
        if(user.friends.includes(friendId)) // if friends id is already the part of friends list we removeit from the users friend and also user doc in his friends doc
        {
            user.friends=user.friends.filter((id)=> id!==friendId);  // have to try// we r removing the friendid from  user
            friend.friends=friend.friends.filter((id)=> id!==id); // removing user id from his friend doc
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);


        }
        await user.save(); // when u destructedany doc from a model save it;
        await friend.save();
        // will format it again
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))  // ucan also pass global id 


        ) ;//promise all aswe r doing multiple api calls
    const formatedFriends=friends.map(
        ({_id,firstName,lastName,occupation,location,picturePath}) =>{
            return {_id,firstName,lastName,occupation,location,picturePath};
        }
    );
    res.status(200).json(formatedFriends);



    }catch(err){
        res.status(404).json({message:err.message});
    }
}

