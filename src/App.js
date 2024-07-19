import './App.css'; // Import your CSS file
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './Employee'; 
import Candidate from './Candidate';
import Home from './home';
import Details from './Details';
import Profile from './Profile';
import AddJob from './addjob';
import SeeJob from './seejob';
import Applications from './applications';
import { AuthProvider } from './AuthContext';
// Assuming Employee component is imported

 
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login/employee" element={<Employee />} />
        <Route path="/login/candidate" element={<Candidate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/details" element={<Details />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/seejob" element={<SeeJob />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/applications" element={<Applications />} />
        {/* Add more routes as needed */}
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
