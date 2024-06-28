import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiPosts, Post} from '../../types';
import {Link} from 'react-router-dom';
import formatDate from '../../constants';
import {enqueueSnackbar} from 'notistack';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosApi.get<ApiPosts | null>('/posts.json');

      const postsResponse = response.data;
      if (postsResponse !== null) {
        const posts: Post[] = Object.keys(postsResponse).map((id: string) => ({
          ...postsResponse[id],
          id,
        }));
        setPosts(posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      enqueueSnackbar('failed fetch post', {variant: 'error'});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);


  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primaryr" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {posts.length === 0 && (
        <h2 className="text-center mt-5">Sorry, there are no posts available</h2>
      )}
      {posts.map(post => (
        <div className="card mb-3" key={post.id}>
          <div className="card-header">
            Created on: {formatDate(post.datetime)}
          </div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <Link to={`/posts/${post.id}`} className="btn btn-primary">Read more...</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;