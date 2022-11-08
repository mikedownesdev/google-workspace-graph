import './App.css';
import GraphContainer from './components/GraphContainer.js'
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <GraphContainer />
    </div>
  );
}