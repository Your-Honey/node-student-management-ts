import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import studentRouter from './routes/studentRouter';

const app: Application = express();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect('mongodb+srv://garvitsharma:jbDJhNltnqwvuxvi@cluster0.loevf.mongodb.net/Student-Management')
  .then(() => {
    console.log('connected to MongoDb');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Typescript Node.js Server Setup Guide!!!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
