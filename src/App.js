import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import { UserContext } from './contexts/UserContext';
import { AuthContext } from './contexts/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

export default function App() {

  const [ user, setUser] = useState({})
  const [ authState, setAuthState ] = useState({})

  const handleLoginSuccess = (tokenResponse) => {
    console.log(tokenResponse)
    setAuthState(tokenResponse)
  }

  const handleLoginFailure = (errorResponse) => console.log(errorResponse);

  const login = useGoogleLogin({
    // Despite the documentation, could I change this to auth-code for a refresh token?
    flow: "implicit", 
    scope: "https://www.googleapis.com/auth/drive",
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailure
  });

  return (
      <div className="App">
        <AuthContext.Provider value={authState}>
          <div className='header-grid' style={{backgroundColor: "red"}}>
            <Header />
          </div>
          <div className='sidebar-grid' style={{backgroundColor: "blue"}}>
            <Sidebar />
            { !authState.token && (
                <button onClick={() => login()}>
                  Sign in with Google 🚀{' '}
                </button>
              )
            }
          </div>
          <div className='graph-grid' style={{backgroundColor: "green"}}>
            <Outlet />
          </div>
        </AuthContext.Provider>
      </div>
    
  );
}