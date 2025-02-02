const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const baseUrl = '/v1';

app.use(`${baseUrl}/auth`, authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is Running' });
});

app.get(baseUrl, (req, res) => {
  res.json({ message: 'V1 API' });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to the database');
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((error) => {
  console.log('Error:', error);
});