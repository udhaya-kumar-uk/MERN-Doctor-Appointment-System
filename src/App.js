import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinners';
import ProductRoute from './components/ProductRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import User from './pages/admin/User';
import Doctor from './pages/admin/Doctor';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appoointment from './pages/Appoointment';
import DoctorAppointment from './pages/doctor/DoctorAppointment';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading ? (<Spinner />)
        : (<Routes>

          <Route path='/notification' element={<ProductRoute><NotificationPage /> </ProductRoute>} />
          <Route path='/apply/doctor' element={<ProductRoute><ApplyDoctor /> </ProductRoute>} />
          <Route path='/admin/users' element={<ProductRoute><User /> </ProductRoute>} />
          <Route path='/admin/doctors' element={<ProductRoute><Doctor /> </ProductRoute>} />
          <Route path='/doctor/profile/:id' element={<ProductRoute><Profile /> </ProductRoute>} />
          <Route path='/doctor/book-appointment/:doctorId' element={<ProductRoute><BookingPage /> </ProductRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>} />
          <Route path='/appointments' element={<ProductRoute> <Appoointment /> </ProductRoute>} />
          <Route path='/doctor-appointments' element={<ProductRoute> <DoctorAppointment /> </ProductRoute>} />
          <Route path='/' element={<ProductRoute><HomePage /> </ProductRoute>} />

        </Routes>)
      }

    </BrowserRouter>
  );
}

export default App;
