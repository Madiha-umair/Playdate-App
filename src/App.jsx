import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";


//import page content
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import AdminDashboard from "./routes/AdminDashboard";
import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCookies, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {authToken && <Route path="/dashboard" element={<Dashboard />} />}
          {authToken && <Route path="/profile" element={<Profile />} />}
          <Route path="/admindashboard" element={<AdminDashboard />} />

        </Routes>
        <Header />
      </BrowserRouter>
    </div>
  )
}

export default App
