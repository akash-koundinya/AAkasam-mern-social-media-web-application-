import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Posts from "./models/Posts.js";
import {users,posts} from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // PostS.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
























// //importing all modules

// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors  from  "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet, { crossOriginResourcePolicy } from "helmet";
// import morgan from "morgan";
// import path from "path";
// import {fileURLToPath} from "url";
// import {register} from "./controllers/auth.js"

// import authRoutes from "./routes/auth.js";// we write all auth routes in this file
//  import userRoutes from "./routes/users.js"; // user route call backs
//  import postRoutes from  "./routes/posts.js"
//  import {verifyToken} from "./middleware/auth.js";
//  import {createPost} from  "./controllers/posts.js"
//  import {users,posts} from "./data/index.js"; // testing with some initial data
// //configurations
// import User from "./models/User.js";
// import Posts from "./models/Posts.js";
// const __filename =fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);
// dotenv.config();
// const app =express();
// app.use(express.json);
// app.use(helmet,crossOriginResourcePolicy({policy:"cross-origin"}));
// app.use(bodyParser.json({limit:"30mb",extended:true}));
// app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
// app.use(cors());

// app.use("/assets",express.static(path.join(__dirname,'public/assets')));


// // File storage all files are submitted here
// const storage=multer.diskStorage({destination:function(req,file,cb){
//     cb(null,"pulic/assets");
// },
// filename:function (req,file,cb){
//     cb(null,file.originalname);
// }});
// const upload =multer({storage});

// // routes with files 
// app.post("/auth/register",upload.single("picture"),register)
// app.post("/posts",verifyToken,upload.single("picture"),createPost) // upload will catch the picture we uploaded and get it to our crated file public/assects
// app.use("/posts",postRoutes)  // when we upload tthe post we needto upload thefile so we will give a post request //getuserposts,getposts,getlikes
// // all auth routes
// app.use("/auth",authRoutes)
// // users routes
// app.use("/users",userRoutes)
// //  fb posts routes


// //MONGOOSE SETUP
// // "mongodb+srv://aakasam:AAka$am@1234567890@cluster0.whrtam4.mongodb.net/?retryWrites=true&w=majority/maindb",{useNewUrlParser : true,useUnifiedTopology : true});
// const PORT=process.env.PORT || 6001;

// mongoose.connect(process.env.MONGO_URL,
// {
//   useNewUrlParser:true,
//   useUnifiedTopology:true

// }).then(()=>{
//   console.log(PORT);
//   app.listen(PORT,()=>console.log(`server port:${PORT}`))//fetching initial data into posts and usersb collection
//   // User.insertMany(users);// pushing usersdata into user
//   //  Posts.insertMany(posts);



// }).catch((error)=>
// {
// if(error)
// {console.log(error);
//   console.log("not connected")
// }
// else{
//   console.log("connected to database");
// }
// }


// )

