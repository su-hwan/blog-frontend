import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../modules/writeReducer';
import TagBox from '../../components/write/TagBox';
import { useCallback } from 'react';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(({ writeReducer }) => ({
    tags: writeReducer.tags,
  }));
  const onChangeTags = useCallback(
    (nextTags) => {
      dispatch(changeField({ key: 'tags', value: nextTags }));
    },
    [dispatch],
  );
  return <TagBox tags={tags} onChangeTags={onChangeTags} />;
};

export default TagBoxContainer;
