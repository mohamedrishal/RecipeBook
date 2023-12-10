import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"


// Register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

// login
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

// addPost
export const addPostAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/posts/add`,reqBody,reqHeader)
}

// getAllPosts
export const allPostsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/posts/all?search=${searchKey}`,"",reqHeader)
}

// getUserAllPosts
export const userAllPostsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-posts`,"",reqHeader)
}

// getWhoPosts
export const whoPostAPI = async (userid)=>{
    return await commonAPI("GET",`${BASE_URL}/user/${userid}`,"","")
}

// update posts
export const editPostAPI = async (postId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/posts/edit/${postId}`,reqBody,reqHeader)
}

// delete posts
export const deletePostAPI = async (postId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/posts/delete/${postId}`,{},reqHeader)
}




// edit user
export const editUserProfileAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}