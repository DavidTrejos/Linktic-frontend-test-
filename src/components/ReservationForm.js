import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
    const [reservation, setReservation] = useState({
        serviceType: '',
        reservationDate: ''
    });

    const handleChange = (e) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = Number(localStorage.getItem('userId'));


        console.log("userId:", userId);

        if (isNaN(userId)) {
            alert("User ID is invalid");
            return;
        }

        const reservationData = {
            serviceType: reservation.serviceType,
            reservationDate: reservation.reservationDate,
            user: {
                id: userId
            }
        };

        try {
            const response = await axios.post('http://localhost:8080/reservations', reservationData);
            alert('Reservation created successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to create reservation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="serviceType"
                value={reservation.serviceType}
                onChange={handleChange}
                placeholder="Service Type"
            />
            <input
                type="date"
                name="reservationDate"
                value={reservation.reservationDate}
                onChange={handleChange}
                placeholder="Reservation Date"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReservationForm;
