import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";

//import page content
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Header />
      </BrowserRouter>
    </div>
  )
}

export default App
