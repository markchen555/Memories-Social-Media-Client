import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPosts } from "../../store/Posts";

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import memories from '../../images/memories.png';

import "./styles.css";

const Main = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

	useEffect(() => {
    	dispatch(fetchPosts());
  	}, [currentId, dispatch]);
  
  return (
    <div>
    	<nav className='nav__container'>
      		<h2 className='nav__heading'>Memories</h2>
      		<img className="nav__image" src={memories} alt="icon" height="60" />
    	</nav>
		<section className='section__container'>
			<div className='main__container'>
				<div className='main__post-item'>
					<Posts setCurrentId={setCurrentId} />
				</div>
				<div className='main__form-item'>
					<Form currentId={currentId} setCurrentId={setCurrentId} />
				</div>
			</div>
		</section>
  </div>
  );
}

export default Main;