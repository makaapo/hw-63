import React, { useState } from 'react';
import { GameMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {enqueueSnackbar} from 'notistack';

const NewPost = () => {
  const [gameMutation, setGameMutation] = useState<GameMutation>({
    description: '',
    title: '',
    datetime: '',
  });

  const navigate = useNavigate();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameMutation(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGameMutation(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = {
      ...gameMutation,
        datetime: new Date().toISOString(),
    };

    try {
      await axiosApi.post('/posts.json', postData)
      navigate('/');
    } catch (e) {
      enqueueSnackbar('Something went wrong', {variant: 'error'});
    }
  };

  return (
    <form className="row flex-column align-items-center text-center g-3 needs-validation mt-5" onSubmit={handleSubmit}>
      <h4>Add new post</h4>
      <div className="col-md-4 position-relative">
        <label className="form-label">Title</label>
        <div className="input-group">
          <span className="input-group-text">Title</span>
          <input
            type="text"
            className="form-control"
            name="title"
            required
            value={gameMutation.title}
            onChange={onFieldChange}
          />
        </div>
      </div>
      <div className="col-md-6 position-relative">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          required
          value={gameMutation.description}
          onChange={onAreaChange}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-info text-white" type="submit">Save</button>
      </div>
    </form>
  );
};

export default NewPost;