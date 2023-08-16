import mongoose from "mongoose" 
const postSchema = mongoose.Schema(
    {
        userId:
        {
            type:String,
            required:true
        },

        firstName:
        {
            type:String,
            required:true
        },
        lastName:
        {
            type:String,
            required:true
        },location:String,
        description:String,
        picturePath:String,
        userPicturePath:String,
        likes:{
            type:Map, // to search user id of liked person
              of:Boolean,
                  // key :userid value:boolean 
        },
        comments:{
            type:Array,
            default:[]

        }

    }, {timestamps:true}) ;
    const Posts=mongoose.model("Post",postSchema);
    export default Posts ;
