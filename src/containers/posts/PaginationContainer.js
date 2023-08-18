import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {
  const { search } = useLocation();
  const { lastPage, posts, loading } = useSelector(
    ({ postsReducer: posts, loadingReducer: loading }) => {
      return {
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS'],
      };
    },
  );

  if (!posts || loading) return null;

  const {
    tag,
    username,
    page = 1,
  } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;
