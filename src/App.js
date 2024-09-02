import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import EditReservationForm from "./components/EditReservationForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/make-reservation" element={<ReservationForm />} />
                <Route path="/view-reservations" element={<ReservationList />} />
                <Route path="/edit-reservation" element={<EditReservationForm />} />
            </Routes>
        </Router>
    );
}

export default App;
