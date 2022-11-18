import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Index from './components/Index';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import GraphContainer from './components/GraphContainer';

import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from './components/AuthProvider'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <Index />
      },
      {
        path: "explorer",
        element: <GraphContainer />
      },
      {
        path: "canvases/:canvasId",
        element: <GraphContainer />
      }
    ]
  }
])

const googleOAuthClientId = "808500334020-hg05i7gll0es5o2v6ihl13hjo5hjjbbo.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleOAuthClientId}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

