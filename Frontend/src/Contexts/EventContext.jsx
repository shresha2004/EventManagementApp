
import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events] = useState([
        {
            id: 1,
            image: 'https://via.placeholder.com/150',
            title: 'Tech Talk by GDSC',
            date: '2024-11-01, 10:00 AM',
            location: 'NMIT, Bangalore',
            description: 'A talk on the latest technologies.',
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/150',
            title: 'Hackathon 2024',
            date: '2024-11-05, 09:00 AM',
            location: 'NMIT, Bangalore',
            description: 'An event to showcase your coding skills.',
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/150',
            title: 'AI Workshop',
            date: '2024-11-10, 11:00 AM',
            location: 'NMIT, Bangalore',
            description: 'Workshop on AI and machine learning.',
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/150',
            title: 'Cybersecurity Seminar',
            date: '2024-11-15, 01:00 PM',
            location: 'NMIT, Bangalore',
            description: 'Learn about cybersecurity.',
        },
        {
            id: 5,
            image: 'https://via.placeholder.com/150',
            title: 'Data Science Conference',
            date: '2024-11-20, 02:00 PM',
            location: 'NMIT, Bangalore',
            description: 'Explore the field of data science.',
        },
        {
            id: 6,
            image: 'https://via.placeholder.com/150',
            title: 'Blockchain Meetup',
            date: '2024-11-25, 03:00 PM',
            location: 'NMIT, Bangalore',
            description: 'Discussion on blockchain technology.',
        },
    ]);

    return (
        <EventContext.Provider value={events}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => useContext(EventContext);
