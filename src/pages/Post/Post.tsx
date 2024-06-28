import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiPost, Post} from '../../types';
import {Link, useNavigate, useParams} from 'react-router-dom';
import formatDate from '../../constants';
import {enqueueSnackbar} from 'notistack';

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const {id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axiosApi.get<ApiPost>(`/posts/${id}.json`);
      if (response.data) {
        setPost({
          ...response.data,
          id,
        });
      } else {
        setPost(null);
      }
    } catch (error) {
      enqueueSnackbar('Failed fetch post', {variant: 'error'});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void fetchPost(id);
    }
  }, [id, fetchPost]);

  const onDelete = async () => {
    if (post && post.id) {
      try {
        setIsLoading(true);
        await axiosApi.delete(`/posts/${post.id}.json`);
        enqueueSnackbar('Post deleted', {variant: 'success'});
        navigate('/');
      } catch (error) {
        enqueueSnackbar('Failed delete post', {variant: 'error'});
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {post && (
        <div className="card mb-3">
          <div className="card-header">Created on: {formatDate(post.datetime)}</div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <Link to={`/posts/${post.id}/edit`} className="btn btn-primary me-2">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;