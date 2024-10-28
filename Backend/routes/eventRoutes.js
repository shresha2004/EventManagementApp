const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { title, date, location, description, image } = req.body;

    const newEvent = new Event({
        title,
        date,
        location,
        description,
        image,
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, date, location, description, email } = req.body;

    const adminEmail = 'admin3434@gmail.com';

    try {
        const event = await Event.findById(id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        if (email !== adminEmail && event.creatorEmail !== email) {
            return res.status(403).json({ message: "Access denied" });
        }

        event.title = title || event.title;
        event.date = date || event.date;
        event.location = location || event.location;
        event.description = description || event.description;

        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const adminEmail = 'admin3434@gmail.com';

    try {
        const event = await Event.findById(id);
        

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (email !== adminEmail) {
           
            return res.status(403).json({ message: "Access denied" });
        }

        await Event.findByIdAndDelete(id);
        
        return res.json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error("Error deleting event:", err); 
        return res.status(500).json({ message: err.message });
    }
});



module.exports = router;
