import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) => {
  return client.post('/api/posts', { title, body, tags });
};

export const updatePost = ({ id, title, body, tags }) => {
  return client.patch(`/api/posts/${id}`, { title, body, tags });
};

export const readPost = (id) => {
  return client.get(`/api/posts/${id}`);
};

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

export const removePost = (id) => {
  return client.delete(`/api/posts/${id}`);
};
