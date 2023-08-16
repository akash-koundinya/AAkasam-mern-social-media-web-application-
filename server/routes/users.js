import express from 'express'
import 
{
    getUser,
    getUserFriends,
    addRemoveFriend,} from "../controllers/users.js"
 
    import {verifyToken} from "../middleware/auth.js";
//Read routes
    const router=express.Router();

router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);// we can grabthis id and call our database with that particular id

//update 
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);// we can grabthis id and call our database with that particular id
export default router;
