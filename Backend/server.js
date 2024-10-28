const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


app.set('view engine', 'ejs');
app.set('views', './views'); 


app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.render('index', { title: 'GDSC Event Handling Page' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
