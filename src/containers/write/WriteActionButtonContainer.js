import { useEffect } from 'react';
import WriteActionButton from '../../components/write/WriteActionButtons';
import { Navigate } from 'react-router-dom';
import { writePost } from '../../modules/writeReducer';
import { useDispatch, useSelector } from 'react-redux';

const WriteActionButtonContainer = () => {
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

  return <div></div>;
};

export default WriteActionButtonContainer;
