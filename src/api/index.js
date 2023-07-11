import axios from 'axios';

const url = 'http://localhost:5500/posts';

export const fetchPosts = () => axios.get(url);