import axios from 'axios';

const top_URL = "http://20.244.56.144/test/users";
const Post_URL = "http://20.244.56.144/test/users/:userid/posts";
const Comment_URL = "http://20.244.56.144/test/posts/:postid/comments";

export const getUsers = () => axios.get(`${top_URL}/users`);
export const getPosts = () => axios.get(`${Post_URL}/posts`);
export const getComments = () => axios.get(`${Comment_URL}/comments`);
