import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEventForm = ({ onClose, onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({}); 

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'af2kchrh');

        const response = await fetch(`https://api.cloudinary.com/v1_1/dtyu88isr/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.secure_url;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Title is required.";
        if (!date) newErrors.date = "Date is required.";
        if (!location) newErrors.location = "Location is required.";
        if (!description) newErrors.description = "Description is required.";
        if (!image) newErrors.image = "Image is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const imageUrl = await handleImageUpload(image);

        const newEvent = {
            title,
            date,
            location,
            description,
            image: imageUrl,
        };

        try {
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
            });

            const data = await response.json();
            onAddEvent(data);
            onClose();
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            isInvalid={!!errors.title} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date & Time</Form.Label>
                        <Form.Control 
                            type="datetime-local" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            isInvalid={!!errors.date} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            isInvalid={!!errors.location} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            isInvalid={!!errors.description} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type="file" 
                            onChange={(e) => setImage(e.target.files[0])} 
                            isInvalid={!!errors.image} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-2'>Add Event</Button>
                    <Button variant="secondary" className='ms-2 mt-2' onClick={onClose}>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEventForm;
