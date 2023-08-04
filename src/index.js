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

const root = ReactDOM.createRoot(document.getElementById('root'));
const sagaMiddleware = createSagaMiddleware();

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

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
