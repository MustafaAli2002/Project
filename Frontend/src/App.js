import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './componet/Home/Home';
import AuthorDashboard from './componet/Author/AuthorDashboard'; 
import SignUp from './componet/SignUp/SignUp';
import Premier from './Pages/Premier'; 
import Spanish from './Pages/Spanish League';
import Itay from './Pages/Italian League';
import Bundesliga from './Pages/Bundesliga'; 
import EmailVerification from './componet/emailverifcation/emailverifcation';
import Ligue1 from './Pages/Ligue1'; 
import Challenges from './componet/Challenges/Challenges';
import DailyChallenges from './componet/DailyChallenges/DailyChallenges';
import EasyChallenge from './componet/Challenges/easychallenge';
import MediumChallenge from './componet/Challenges/MediumChallenge'; 
import HardChallenge from './componet/Challenges/HardChallenge';
import ForgetPassword from './componet/ForgetPassword/ForgetPassword';
import Login from './componet/login/Login';
import JournalistSignup from './componet/Journalist/JournalistSignup';
import Error from './componet/Error/Error';
import AdminDashboard from './componet/admin/AdminDashboard'; 
import Superadmin from './componet/admin/superadmin'; 
import Createjo from './componet/admin/createjo'; 
import NewsDetail from './componet/NewsDetail/NewsDetail'; 
import Profile from './componet/Profile/Profile';
import ProfileEdit from './componet/Profile/ProfileEdit';
import { AuthProvider } from './componet/AuthContext/AuthContext';

function App() {
    return (
        <AuthProvider> 
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/football" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit-profile" element={<ProfileEdit />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/verify-email" element={<EmailVerification />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/journalist-signup" element={<JournalistSignup />} />
                    <Route path="/author-dashboard" element={<AuthorDashboard />} />
                    <Route path="/admindashboard" element={<AdminDashboard />} />
                    <Route path="/superadmin" element={<Superadmin />} />
                    <Route path="/createjo" element={<Createjo />} />
                    <Route path="/english-premier-league" element={<Premier />} />
                    <Route path="/la-liga" element={<Spanish />} />
                    <Route path="/serie-a" element={<Itay />} />
                    <Route path="/bundesliga" element={<Bundesliga />} />
                    <Route path="/ligue-1" element={<Ligue1 />} />
                    <Route path="/challenges" element={<Challenges />} /> 
                    <Route path="/challenges/easy" element={<EasyChallenge />} />
                    <Route path="/challenges/medium" element={<MediumChallenge />} />
                    <Route path="/challenges/hard" element={<HardChallenge />} /> 
                    <Route path="/daily-challenges" element={<DailyChallenges />} />
                    <Route path="*" element={<Error />} />
                
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
