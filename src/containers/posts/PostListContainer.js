import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../modules/postsReducer';
import PostList from '../../components/posts/PostList';

const PostListContainer = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ postsReducer, loadingReducer: loading, userReducer: user }) => {
      return {
        posts: postsReducer.posts,
        error: postsReducer.error,
        loading: loading['posts/LIST_POSTS'],
        user: user,
      };
    },
  );

  useEffect(() => {
    const { page, username, tag } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ page, username, tag }));
  }, [dispatch, search]);

  return (
    <PostList
      posts={posts}
      error={error}
      loading={loading}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
