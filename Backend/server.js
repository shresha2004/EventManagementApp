const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://vercel.live"],
    frameSrc: ["'self'", "https://vercel.live"],
  },
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'GDSC Event Handling Page' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
