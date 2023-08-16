import Posts from "../models/Posts.js";
import User from "../models/User.js"; // to realte as some info is posts is user info
/*  CREATE */
export const createPost =async (req,res) => {
try{
    const {userId,description,picturePath}=req.body;
    const user=await User.findById(userId);
    const newPost=new Posts({
       
        userId,  // it means userid(posts schema):userid(users schema) or literally userId
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        picturePath,
        likes:{// initially empty map

            /* example map looks like this
            "userId":true */ //if not there 
        },
        comments:[]
        
         



    }

    
    )
    await newPost.save(); //we save the post
    const post=await Posts.find(); // will return all posts to the front end andformat  it
    res.status(201).json(post);//  

} catch(err)
{
    res.status(404).json({message:err.message});
}


}
// read
export const getFeedPosts=async(req,res)=>{
    try{
        const post=await Posts.find();
        res.status(200).json(post);// 200 means some thing is created
        
    }catch(err)
    {
        res.status(404).json({message:err.message});
    }
    

}
export const getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.params;
        const post=await Posts.find({userId}); //means ;userId:userId
        res.status(200).json(post);
    }catch(err)
    {
        res.status(404).json({message:err.message});
    }
    

};
/* update */
export const likePost= async (req,res) =>
{
    try{
        const {id}=req.params; // grabbing the post information
        const {userId} =req.body; // grabbing  the posts who liked it
        const post=await Posts.findById(id); // CHECKING WHICH POST THEY LIKED
        const isLiked=post.likes.get(userId); // after knowing what postt checking if user alredy liked the post in mapof likes if he is alrady there then he clicked to remove it so will remove that userid from likes map and vice versa
        if(isLiked)  // if the user id already sxits he wants to dislike it
        {
            post.likes.delete(userId);

        }
        else {
            post.likes.set(userId,true); 

        }// now we have to update this changed post of likes into Post collection
        const updatePost =await Posts.findByIdAndUpdate(
            id,
            {likes:post.likes },
            {new:true} // after changing the post.likes we agin have to updateit in Posts collextion

        )
        res.status(200).json(updatePost);

    }catch(err)
    {
        res.status(404).json({message:err.message});
    }
}