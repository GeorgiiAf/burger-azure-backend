import express from 'express';
import cors from 'cors';
import api from './api/index.js';
import uploadRoutes from './api/routes/upload.js';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://blue-river-07843aa03.6.azurestaticapps.net'
    ],
    credentials: true
  }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.url = req.url.toLowerCase();
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST API');
});


app.use('/public', express.static('public'));


app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1', api);


export default app;
