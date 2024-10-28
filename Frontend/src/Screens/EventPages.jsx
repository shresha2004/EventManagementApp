import React, { useState, useEffect } from 'react';
import EventCard from '../Components/EventCard';
import AddEventForm from '../Components/addEventForm';

const EventsPage = () => {
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const userEmail = localStorage.getItem("userEmail");
    const isAdmin = userEmail === 'admin3434@gmail.com';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://eventmanagementapp-duq1.onrender.com/api/events', { method: 'GET' });
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        setShowAddForm(false);
    };

    return (
        <div className="events-page">
            <h1>Mark Your Calendars: GDSC NMIT Events</h1>
            <input
                className='search-input'
                type="text"
                placeholder="Filter by event title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
           
            {isAdmin && (
                <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add Event</button>
            )}
            <div className="event-cards-container">
                {filteredEvents.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
            {showAddForm && (
                <AddEventForm onClose={() => setShowAddForm(false)} onAddEvent={handleAddEvent} />
            )}
        </div>
    );
};

export default EventsPage;
