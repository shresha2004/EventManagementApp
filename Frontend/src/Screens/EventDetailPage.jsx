import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';

const EventDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: ''
    });
    const userEmail = localStorage.getItem("userEmail");
    const isAdmin = userEmail === 'admin3434@gmail.com';

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`);
                const data = await response.json();
                setEvent(data);
                setFormData({
                    title: data.title,
                    date: data.date,
                    location: data.location,
                    description: data.description
                });
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, email: userEmail })
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                setEvent(updatedEvent);
                setEditMode(false);
                alert("Event updated successfully.");
            } else {
                alert("Failed to update event.");
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: userEmail })
                });

                if (response.ok) {
                    alert("Event deleted successfully.");
                    navigate('/');  
                } else {
                    alert("Failed to delete event.");
                }
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    const handleRegister = () => {
        alert("Registered successfully for the event.");
    };

    if (!event) return <p>Event not found</p>;

    return (
        <> <div className='app-container'>
            <Navbar />
            <div className="container mt-5 mb-3">
                <div className="row">
                    
                    <div className="col-md-6 d-flex flex-column align-items-start">
                        {event.image && (
                            <img
                                src={event.image}
                                alt={event.title}
                                className="img-fluid rounded mb-3" 
                                style={{ maxWidth: '300px' }} 
                            />
                        )}
                        <p className="mt-2"><strong>Description:</strong> {event.description}</p>
                    </div>

                    
                    <div className="col-md-6">
                        <h1 className="mt-3">{event.title}</h1>
                        <p><strong>Date & Time:</strong> {new Date(event.date).toLocaleString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>

                        <button className="btn btn-primary me-2" onClick={handleRegister}>Register</button>

                        {(isAdmin || event.creatorEmail === userEmail) && (
                            <div className="mt-3">
                                <button className="btn btn-warning me-2" onClick={() => setEditMode(!editMode)}>
                                    {editMode ? "Cancel" : "Edit Event"}
                                </button>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete Event</button>
                            </div>
                        )}

                        {editMode && (isAdmin || event.creatorEmail === userEmail) && (
                            <form onSubmit={handleEdit} className="mt-4">
                                <div className="mb-3">
                                    <label className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date & Time:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Location:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">Save Changes</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        </>
    );
};

export default EventDetailPage;
