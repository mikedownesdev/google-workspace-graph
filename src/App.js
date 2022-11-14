import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="App">
      <div className='header-grid' style={{backgroundColor: "red"}}>
        <Header />
      </div>
      <div className='sidebar-grid' style={{backgroundColor: "blue"}}>
        <Sidebar />
      </div>
      <div className='graph-grid' style={{backgroundColor: "green"}}>
        <Outlet />
      </div>
    </div>
  );
}