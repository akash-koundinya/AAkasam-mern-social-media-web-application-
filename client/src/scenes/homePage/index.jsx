import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
















// import { Box, useMediaQuery } from "@mui/material";
// // now will place widgets in  home page
// import { useSelector } from "react-redux";
// import UserWidget from "scenes/widgets/UserWidget";
// import Navbar from "scenes/navbar";
// // import PostsWidget from "scenes/widgets/PostsWidget"; // for creating posts wiget styling
// // import AdvertWidget from "scenes/widgets/AdvertWidget"; // for creating advertising
// // import FriendListWidget from "scenes/widgets/FriendListWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";

// const HomePage=() =>
// { const isNonMobileScreens = useMediaQuery("(min-width:1000px)");// will get the use selector to ge thes state
// const { _id, picturePath } = useSelector((state) => state.user);// we are giving this user id from  uhereb as a prop to user widget
//     return (<Box> <Navbar />
//      <Box
//         width="100%"
//         padding="2rem 6%"
//         display={isNonMobileScreens ? "flex" : "block"}
//         gap="0.5rem"
//         justifyContent="space-between"
//       >
//         <Box flexBasis={isNonMobileScreens ? "20rem" : undefined} style={{position:StaticRange}}>
//           <UserWidget userId={_id} picturePath={picturePath} 
            
//           />
//         </Box>
//         <Box
//           flexBasis={isNonMobileScreens ? "42%" : undefined}
//           mt={isNonMobileScreens ? undefined : "2rem"}
//         >
//           <MyPostWidget picturePath={picturePath} />
//           <PostsWidget userId={_id} /> 
//           {/* this is for crating individual posts */}
//         </Box>


        
//         </Box>
    
    
    
    
    
    
    
//     </Box>) //setting up skeleton


// }
// export default HomePage;