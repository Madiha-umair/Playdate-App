import './App.css'

//import page content
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import ProfileData from "./routes/ProfileData";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Terms from './routes/Terms';

function App() {

  const [cookies, setCookies, removeCookie ] = useCookies (['user'])

  const authToken = cookies.AuthToken;

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profiledata/:userId" element={<ProfileData />} />
          {authToken && <Route path="/dashboard" element={<Dashboard />} />}
          {authToken &&<Route path="/profile" element={<Profile />} />}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
