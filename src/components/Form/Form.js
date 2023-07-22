import React, {useState, useEffect} from 'react';
import * as Form from '@radix-ui/react-form';
import { useSelector, useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from "../../store/Posts";

import './styles.css';

const SubmitForm = ({ currentId, setCurrentId }) => {
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
    <div className='form__container'>
      <Form.Root className='form__root' onSubmit={handleSubmit}>
        <div className='form__title'>
          <span>{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</span>
        </div>
        <Form.Field className="form__field" name="creator">
          <Form.Label className="form__label">Creator</Form.Label>
          <Form.Control asChild>
            <input value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} className="form__input" type="text" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="form__field" name="title">
          <Form.Label className="form__label">Title</Form.Label>
          <Form.Control asChild>
            <input value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="form__input" type="text" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="form__field" name="message">
          <Form.Label className="form__label">Message</Form.Label>
          <Form.Control asChild>
            <textarea value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} className="form__textarea" required />
          </Form.Control>
        </Form.Field>

        <Form.Field  className="form__field" name="tags">
          <Form.Label  className="form__label">Tags</Form.Label>
          <Form.Control asChild>
            <input value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} className="form__input" type="text" />
          </Form.Control>
        </Form.Field>
        <div className='form__file-input'>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <Form.Submit className="form__button" type="submit">
          Submit
        </Form.Submit>
        <Form.Submit className="form__button" onClick={clear} type="button">
          Clear
        </Form.Submit>
      </Form.Root>
    </div>
  )
}

export default SubmitForm