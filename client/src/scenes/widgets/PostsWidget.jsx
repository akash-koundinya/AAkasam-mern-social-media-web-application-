import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";// yet tobe created

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();// for using redux
  const posts = useSelector((state) => state.posts);//  storing list of posts   
  const token = useSelector((state) => state.token);//  ttogett token

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",// it will get all posts
      headers: { Authorization: `Bearer ${token}` }, // bearer is ifor authorization
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,  
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));// it will set the new state
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();// we have to see this use effect
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(  // mapping through posts array
        ({
          _id,  // destructuring these things from every posts
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}// passing as props
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;