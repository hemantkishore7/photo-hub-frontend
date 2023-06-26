import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import BaseUrl from "url/BaseUrl";
import PostWidget from "./PostWidget";


const PostsWidget = ({userId,isProfile=false}) =>{
   const dispatch = useDispatch();
   const posts = useSelector((state)=>state.posts);
   const token = useSelector((state)=>state.token);
 

   useEffect(()=>{
    if(isProfile){
        getUserPosts();
    }else{
        getPosts();
    }
   },[])

   const getPosts = async()=>{
    const response = await fetch(`${BaseUrl}/posts`,{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({posts:data}))
   }

   const getUserPosts = async() =>{
    const response = await fetch(`${BaseUrl}/posts/${userId}/posts`,{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({posts:data}))
   }

  

   return(
    <>
        {posts.map(
           ( {
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments
        })=>(
            <PostWidget
                key={_id}
                name={`${firstName} ${lastName}`}
                postId={_id}
                postUserId={userId}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
            />
        )
       ) }
    </>
   );
}

export default PostsWidget;