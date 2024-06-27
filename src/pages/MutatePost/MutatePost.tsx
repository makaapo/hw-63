import React, { useCallback, useEffect, useState } from 'react';
import {ApiPost, PostMutation} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { enqueueSnackbar } from 'notistack';

const initialState = {
  description: '',
  title: '',
  datetime: '',
};

const MutatePost = () => {
  const [postMutation, setPostMutation] = useState<PostMutation>(initialState);
  const navigate = useNavigate();
  const {id } = useParams();

  const fetchOnePost = useCallback(async (id: string) => {
    try {
      const response = await axiosApi.get<ApiPost | null>(`posts/${id}.json`);
      if (response.data) {
        setPostMutation({...response.data});
      }
    } catch (error) {
      enqueueSnackbar('Error fetching post', {variant: 'error'});
    }
  }, []);

  useEffect(() => {
    if (id) {
      void fetchOnePost(id);
    } else {
      setPostMutation(initialState);
    }
  }, [id, fetchOnePost]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPostMutation(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setPostMutation(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const postData = {
        ...postMutation,
        datetime: new Date().toISOString(),
      };
      if (id) {
        await axiosApi.put(`/posts/${id}.json`, postData);
      } else {
        await axiosApi.post('/posts.json', postData);
      }
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <form className="row flex-column align-items-center text-center g-3 needs-validation mt-5" onSubmit={onFormSubmit}>
      <h4>{id ? 'Edit post' : 'Add new post'}</h4>
      <div className="col-md-4 position-relative">
        <label className="form-label">Title</label>
        <div className="input-group">
          <span className="input-group-text">Title</span>
          <input
            type="text"
            className="form-control"
            name="title"
            required
            value={postMutation.title}
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
          value={postMutation.description}
          onChange={onAreaChange}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-info text-white" type="submit">Save</button>
      </div>
    </form>
  );
};

export default MutatePost;