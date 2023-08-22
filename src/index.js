import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
// import {
//   compose,
//   legacy_createStore as createStore,
//   applyMiddleware,
// } from 'redux';
import rootReducer, { rootSaga } from './modules';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { check, tempSetUser } from './modules/userReducer';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
const sagaMiddleware = createSagaMiddleware();

function loadUser() {
  try {
    //로그인 유저 존재여부 확인
    const user = localStorage.getItem('user');
    if (!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

// const enhancer =
//   process.env.NODE_ENV === 'production'
//     ? compose(applyMiddleware(sagaMiddleware))
//     : composeWithDevTools(applyMiddleware(sagaMiddleware));
// const store = createStore(rootReducer, enhancer);

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);
loadUser();

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
