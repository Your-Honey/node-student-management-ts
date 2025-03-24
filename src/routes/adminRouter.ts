import express from 'express';
import isAuth from '../middleware/authMiddleware';
import { createClass, createUser, getAllClasses } from '../controllers/adminController';

const adminRouter = express.Router();

/**
 * @swagger
 * /api/admin/createclass:
 *   post:
 *     summary: Create a new class
 *     description: Admin can create a new class with name and section.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "10th Grade"
 *               section:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Missing fields or class already exists
 *       401:
 *         description: Not authorized as admin
 */
adminRouter.post('/createclass', isAuth, createClass);

/**
 * @swagger
 * /api/admin/createUser:
 *   post:
 *     summary: Create a new user (Student or Teacher)
 *     description: Admin can create students and teachers. Students get a roll number automatically.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               role:
 *                 type: string
 *                 enum: ["student", "teacher"]
 *               classId:
 *                 type: string
 *                 example: "65f2e8cda9b1a90015d03a5f"
 *               assignedClass:
 *                 type: string
 *                 example: "65f2e8cda9b1a90015d03a5f"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or missing required fields
 *       401:
 *         description: Not authorized as admin
 */
adminRouter.post('/createUser', isAuth, createUser);

/**
 * @swagger
 * /api/admin/getAllClasses:
 *   get:
 *     summary: Get all classes
 *     description: Admin can fetch all created classes.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all classes
 *       400:
 *         description: No classes found
 *       401:
 *         description: Not authorized as admin
 */
adminRouter.get('/getAllClasses', isAuth, getAllClasses);

export default adminRouter;
