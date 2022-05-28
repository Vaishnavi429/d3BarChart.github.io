import RegistrationPage from "./RegistrationPage/RegistrationPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayChart from "./DisplayChart/DisplayChart";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/displaychart" element={<DisplayChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
