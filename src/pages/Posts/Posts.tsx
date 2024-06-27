import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiPosts, Post} from '../../types';
import {Link} from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await axiosApi.get<ApiPosts | null>('/posts.json');

    const postsResponse = response.data;
    if (postsResponse !== null) {
      const posts: Post[] = Object.keys(postsResponse).map((id: string) => {
        return {
          ...postsResponse[id],
          id,
        };
      });
      setPosts(posts);
    } else {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {posts.length === 0 && (
        <h2 className="text-center mt-5">Sorry, there are no posts available</h2>
      )}
      {posts.map(post => (
        <div className="card" key={post.id}>
          <div className="card-header">
            Created on: {post.datetime}
          </div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <Link to={`/posts/${post.id}`} className="btn btn-primary">Read more</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;