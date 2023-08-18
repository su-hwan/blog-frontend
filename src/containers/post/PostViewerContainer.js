import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/postReducer';

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/writeReducer';

const PostViewerContainer = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { post, error, loading, user } = useSelector(
    ({ postReducer: post, loadingReducer: loading, userReducer: user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  const dispath = useDispatch();
  console.log('params.postId ====> ', postId);
  useEffect(() => {
    dispath(readPost(postId));
    return () => {
      dispath(unloadPost());
    };
  }, [dispath, postId]);

  const onEdit = () => {
    dispath(setOriginalPost(post));
    navigate('/write');
  };
  const onRemove = () => {};
  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={(user && user.id) === (post && post.id)}
    />
  );
};

export default PostViewerContainer;
