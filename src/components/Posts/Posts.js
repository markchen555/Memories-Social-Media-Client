import React from 'react'
import Post from './Post/Post';

import { useSelector } from 'react-redux';

import './styles.css';

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);

  return (
    !posts.length ? 'Loading...' : (
      <div className='posts__container'>
        {posts.map((post) => (
          <div className='post__container' key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
    )
  )
}

export default Posts