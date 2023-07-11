import React, { useState } from 'react'
import Post from './Post/Post';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from "../../store/Posts";

import styles from './styles'

const Posts = () => {
  const count = useSelector((state) => state.posts.count);
  const [incrementAmount, setIncrementAmount] = useState(0)
  const addValue = Number(incrementAmount)
  const dispatch = useDispatch();

  return (
    <>
	    <div>Posts</div>
	    <div>Counter: {count}</div>
      <input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(addValue))}>Enter</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <Post></Post>
    </>
  )
}

export default Posts