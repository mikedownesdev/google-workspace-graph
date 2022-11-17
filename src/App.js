import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { UserContext } from './contexts/UserContext';

export default function App() {

  const [ user, setUser] = useState({})

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    setUser(jwtDecode(response.credential));
  }

  useEffect(() => {
    // This global google apparently tells the linter I know that YOU don't
    // know that google exists, but we know its being loaded in from the script
    // tag I added in my public/index.html file

    /* global google */
    google.accounts.id.initialize({
      client_id: "808500334020-hg05i7gll0es5o2v6ihl13hjo5hjjbbo.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }
    )
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <div className='header-grid' style={{backgroundColor: "red"}}>
          <Header />
        </div>
        <div className='sidebar-grid' style={{backgroundColor: "blue"}}>
          <Sidebar />
          <div id="sign-in-div"></div>
        </div>
        <div className='graph-grid' style={{backgroundColor: "green"}}>
          <Outlet />
        </div>
      </UserContext.Provider>
    </div>
  );
}