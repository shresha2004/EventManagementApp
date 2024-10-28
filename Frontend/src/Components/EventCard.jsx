import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("userEmail") !== null; 

    const handleRegisterClick = (e) => {
        e.preventDefault(); 
        if (!isLoggedIn) {
            alert("Please log in to register for this event."); 
        } else {
            navigate(`/event/${event._id}`);
        }
    };

    return (
        <div className="card event-card rounded" style={{ width: '18rem', margin: '1rem' }}>
            <img src={event.image} className="card-img-top" alt={event.title} />
            <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">Date & Time: {event.date}</p>
                <p className="card-text">Location: {event.location}</p>
               
                <button className="btn btn-primary" onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    );
};

export default EventCard;
