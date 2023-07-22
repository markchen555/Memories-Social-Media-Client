import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { DotsHorizontalIcon, HeartFilledIcon, CrossCircledIcon } from '@radix-ui/react-icons'

import { deletePost, likePost } from "../../../store/Posts";

import './styles.css';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <div className='post__card'>
      	<img className='post__image' src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      	<div className='post__image-info'>
        	<p>{post.creator}</p>
        	<span>{moment(post.createdAt).fromNow()}</span>
      	</div>
      	<div className='post__image-more'>
        	<button style={{ color: 'white' }} onClick={() => setCurrentId(post._id)}>
          	<DotsHorizontalIcon className='post__dot-icon' />
        	</button>
      	</div>
      	<div className='post__tags'>
        	<span>{post.tags.map((tag) => `#${tag} `)}</span>
      	</div>
      	<p className='post__title'>{post.title}</p>
      	<div className='post__message'>
        	<p>{post.message}</p>
      	</div>
      	<div className='post__button-group'>
        	<button onClick={() => dispatch(likePost(post._id))}>
          	<HeartFilledIcon /> 
          	Like {post.likeCount} 
        	</button>
        	<button onClick={() => dispatch(deletePost(post._id))}>
          	<CrossCircledIcon /> 
          	Delete
        	</button>
      	</div>
    </div>
  )
}

export default Post