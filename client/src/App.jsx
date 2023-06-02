import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";

//import page content
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
      <Header />
      </BrowserRouter>
    </div>
  )
}

export default App
