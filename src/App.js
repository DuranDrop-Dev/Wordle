import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StateProvider } from './utils/StateContext';

import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StateProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Login' element={<Login />} />
            </Routes>
          </BrowserRouter>
        </StateProvider>
      </header>
    </div>
  );
}

export default App;
