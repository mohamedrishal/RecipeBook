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
export const allPostsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/posts/all`,"",reqHeader)
}

// getUserAllPosts
export const userAllPostsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-posts`,"",reqHeader)
}

// getUserAllPosts
export const whoPostAPI = async (userid)=>{
    return await commonAPI("GET",`${BASE_URL}/user/${userid}`,"","")
}