import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiPosts, Post} from '../../types';
import {Link, useNavigate} from 'react-router-dom';

const Post = () => {
  const [post, setPost] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axiosApi.get<ApiPosts>('/posts.json');
      if (response.data) {
        const fetchedPosts: Post[] = Object.keys(response.data).map((id: string) => ({
          ...response.data[id],
          id,
        }));
        setPost(fetchedPosts);
      } else {
        setPost([]);
      }
    } catch (error) {
      console.error('failed fetch posts:', error);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const onDelete = async (id: string) => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
      const updatedPosts = post.filter(post => post.id !== id);
      setPost(updatedPosts);
      navigate('/');
    } catch (error) {
      console.error('failed delete post:', error);
    }
  };

  return (
    <>
      {post.map(post => (
        <div className="card mb-3" key={post.id}>
          <div className="card-header">Created on: {post.datetime}</div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <Link to={`/posts/${post.id}/edit`} className="btn btn-primary me-2">
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(post.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;