import { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost } from '../../modules/writeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(
    ({ writeReducer: write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
    }),
  );

  //포스트 등록
  const onPublish = () => {
    dispatch(writePost({ title, body, tags }));
  };

  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (post) {
      const { user, _id } = post;
      navigate(`/${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;
