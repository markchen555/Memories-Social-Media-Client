import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from "../../store/Posts";

import styles from './styles'

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector(({posts}) => currentId ? posts.posts.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost({currentId, postData}));
      clear();
    }
  };

  return (
    <Paper sx={styles.paper}>
    <form autoComplete="off" noValidate className={`${styles.root} ${styles.form}`} onSubmit={handleSubmit}>
      {/* <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography> */}
      <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
      <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
      <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
      <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
      <div className={styles.fileInput}>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
      </div>
      <Button sx={styles.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    </form>
  </Paper>
  )
}

export default Form