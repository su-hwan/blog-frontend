import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import PostListPage from './pages/PostListPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      {/* <Route path="/@:username" element={<PostListPage />} /> 
        React Router 6.5 이상에서 @ 지원 제외
        username @ 사용하기 위해서는 params.username.split('@')[1]
      */}
      <Route path="/:username" element={<PostListPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/:username/:postId" element={<PostPage />} />
    </Routes>
  );
}

export default App;
