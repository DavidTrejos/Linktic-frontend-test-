import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    const userId = Number(localStorage.getItem('userId'));
    const handleEdit  =  ( reservationId) => {
        console.log(`Edit reservation with ID: ${reservationId}`);
        localStorage.setItem("reservationId", reservationId);
        window.location.href = '/edit-reservation';
    };

    const handleDelete  = ( reservationId) => {
        try {
            console.log(`Delete reservation with ID: ${reservationId}`);
             axios.delete('http://localhost:8080/reservations/'+reservationId).then(response => {
                console.log(`Deleted post with ID ${reservationId}`);
                window.location.href = '/view-reservations';
            })
                .catch(error => {
                    console.error(error);
                });

        } catch (error) {
            console.error(error);
            alert('Delete failed');
        }
    };

    useEffect(() => {
        const fetchReservations = async () => {
            const response = await axios.get('http://localhost:8080/reservations/user/'+userId);
            setReservations(response.data);
        };
        fetchReservations();
    }, []);

    return (
        <div>
            <h2>Reservations</h2>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        {reservation.serviceType} - {reservation.reservationDate}
                        <button type="button" onClick={() => handleEdit(reservation.id)}>Edit</button>
                        <button type="button" onClick={() => handleDelete(reservation.id)}>Delte</button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default ReservationList;
