import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditReservationForm = () => {
    const [reservation, setReservation] = useState({
        serviceType: '',
        reservationDate: ''
    });

    useEffect(() => {
        const reservationId = Number(localStorage.getItem('reservationId'));
        console.log("reservationId", reservationId)
        if (isNaN(reservationId)) {
            alert("Reservation ID is invalid");
            return;
        }

        const fetchReservationById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reservations/${reservationId}`);
                console.log ("response.data", response.data)
                setReservation(response.data[0]); // Asigna los datos de la reserva al estado
            } catch (error) {
                console.error('Error fetching reservation:', error);
            }
        };

        fetchReservationById(); // Llama a la función para obtener la reserva al montar el componente
    }, []);

    const handleChange = (e) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationId = Number(localStorage.getItem('reservationId'));

        if (isNaN(reservationId)) {
            alert("Reservation ID is invalid");
            return;
        }

        const reservationData = {
            serviceType: reservation.serviceType,
            reservationDate: reservation.reservationDate
        };

        try {
            await axios.put(`http://localhost:8080/reservations/${reservationId}`, reservationData);
            alert('Reservation edited successfully');
        } catch (error) {
            console.error('Error editing reservation:', error);
            alert('Failed to edit reservation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="serviceType"
                value={reservation.serviceType || ''}
                onChange={handleChange}
                placeholder="Service Type"
            />
            <input
                type="date"
                name="reservationDate"
                value={reservation.reservationDate || ''}
                onChange={handleChange}
                placeholder="Reservation Date"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditReservationForm;
