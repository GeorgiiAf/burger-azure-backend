import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.url = req.url.toLowerCase();
  next();
});

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API');
});

app.use('/api/v1', api);

export default app;
