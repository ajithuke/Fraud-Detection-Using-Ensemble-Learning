import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Signup';
import MyNavbar from './components/MyNavbar';

function App() {
    return (
        <div>
            <MyNavbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<RegisterPage />} />
            </Routes>
        </div>
    );
}

export default App;
