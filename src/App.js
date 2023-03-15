import './App.css';
import PageWrapper from "./components/PageWrapper/PageWrapper";
import MainPage from "./components/MainPage/MainPage"; // Add this line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './components/Weather/Weather';
import Car from './components/Car/Car';
import Plane from './components/Plane/Plane';
import Boat from './components/Boat/Boat';
import Menu from './components/MainPage/Menu/Menu';



function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/car" element={<Car />} />
        <Route path="/plane" element={<Plane />} />
        <Route path="/boat" element={<Boat />} />
      </Routes>
      <PageWrapper></PageWrapper>
    </div>
  );
}


export default App;
