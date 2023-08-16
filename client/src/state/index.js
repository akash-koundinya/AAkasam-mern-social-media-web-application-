import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
  };
  
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
      setFriends: (state, action) => {
        if (state.user) {
          state.user.friends = action.payload.friends;
        } else {
          console.error("user friends non-existent :(");
        }
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      },
    },
  });
  
  export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    authSlice.actions;
  export default authSlice.reducer;















// import { createSlice } from "@reduxjs/toolkit";
// const initialState={
//     mode:"light",     //  this is gonna set gloabally
//     user:"null",
//     token:"null",
//     posts:[],
     
      
// };  //this is the state that stored under global state this state is global which we grab it anywhere we want
// export const authSlice=createSlice({
//     name:"auth",
//     initialState,
//     reducers:{
//         setMode: (state)=>
//         {
//             state.mode=state.mode==="light"? "dark":"light" // its gonna set light and dark theme


//         },
//         setLogin:(state,action)=>
//         {
//             state.user=action.payload.user;
//             state.token=action.payload.token;
//         },
//         setLogout:(state)=>{ // setiing the user token to null when ever they hitlogout
//             state.user=null;
//             state.token=null;

//         },
//         setFriends: (state,action) =>{
//             if(state.user) // if the user logged in
//             {
//                 state.user.friends=action.payload.friends;
//             }
//             else{
//                 console.log("user friends non-existent")
//             }
//         },
//         setPosts: (state,action) =>
//         {state.posts=action.payload.posts;

//         },// setting all posts
//         setPost:(state,action)=>{ //  when user clicks the a separate post will check thatpost in our post array
//             const updatedPosts=state.posts.map((post)=>{
//                 if(post._id===action.payload.post_id)  return action.payload.post;// will return the relavant post
//                 return post; //other wise will return what we currently have // will update the updatedpost that coming fromthe backend
//             })
//             state.posts=updatedPosts;


//         }


//     }// this is our actions or this ar the functions that are modifying our global state
// })
// export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost}=authSlice.actions;
// export default authSlice.reducer;

// //this is the entire logic application for redux
// // after this we configure a few things we   are gonaa set the reducer inside our index js file