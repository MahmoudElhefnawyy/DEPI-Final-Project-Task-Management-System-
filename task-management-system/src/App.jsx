import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from "./Authentication/Authcontext";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgetPassword";
import WorkSpace from './pages/workSpace';
import Tasks from './components/tasks';
import Calender from './components/calender';
import Analytics from './components/analytics';
import Settings from './components/settings';
import { NotificationProvider } from '../src/context/notificationContext'; 
import { DropdownProvider } from '../src/context/dropdownContext'; 
import { DarkModeProvider } from './context/DarkModeContext';
import { ProfileProvider } from './context/profileContext';

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <DropdownProvider>
          <DarkModeProvider>
            <ProfileProvider>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Services' element={<Services />} />
                <Route path='/Features' element={<Features />} />
                <Route path='/About' element={<About />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='/workSpace' element={<WorkSpace />} />
                <Route path='/workSpace/tasks' element={<Tasks />} />
                <Route path='/workSpace/calender' element={<Calender />} />
                <Route path='/workSpace/analytics' element={<Analytics />} />
                <Route path='/workSpace/settings' element={<Settings />} />
              </Routes>
            </ProfileProvider>
          </DarkModeProvider>
        </DropdownProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;