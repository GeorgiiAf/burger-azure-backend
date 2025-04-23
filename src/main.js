import 'dotenv/config';
import express, {json, urlencoded} from 'express';
import setupRoutes from './routes/index.js';

const app = express();

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`); // Debugging log
  next();
});

app.use(json());
app.use(urlencoded({extended: true}));

setupRoutes(app);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
