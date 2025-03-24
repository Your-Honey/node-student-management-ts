import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler';
import adminRouter from './routes/adminRouter';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
dotenv.config();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL || '')
  .then(() => {
    console.log('connected to MongoDb');
  })
  .catch((err) => {
    console.log("MongoDb connection error",err.message);
  });

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Typescript Node.js Server Setup Guide!!!' });
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API',
      version: '1.0.0',
      description: 'API documentation for authentication system',
    },
    servers: [{ url: process.env.PROD_API_URL }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'], // Path to API route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
