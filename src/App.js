import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useAuth } from './hooks/useAuth'
import { useGoogleLogin } from '@react-oauth/google';

export default function App() {

  const { token, onLoginSuccess, onLoginFailure } = useAuth()

  const login = useGoogleLogin({
    // Despite the documentation, could I change this to auth-code for a refresh token?
    flow: "implicit", 
    scope: "https://www.googleapis.com/auth/drive",
    onSuccess: onLoginSuccess,
    onError: onLoginFailure,
  });

  return (
      <div className="App">
        <div className='header-grid' style={{backgroundColor: "red"}}>
          <Header />
        </div>
        <div className='sidebar-grid' style={{backgroundColor: "blue"}}>
          <Sidebar />
          { !token && (
              <button onClick={() => login()}>
                Sign in with Google 🚀{' '}
              </button>
            )
          }
        </div>
        <div className='graph-grid' style={{backgroundColor: "green"}}>
          <Outlet />
        </div>
      </div>
  );
}