import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandlerr } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); // Middleware to parse cookies


app.use('/api/users', userRoutes);

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

const __dirname = path.resolve(); //set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  // an route that is not an api will be redirected to the frontend index.html
  app.get('*start', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandlerr);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});