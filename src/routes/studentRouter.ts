import express from 'express';
import { addStudent, getStudents, getStudent, deleteStudent, updateStudent } from '../controllers/studentController';
import isAuth from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', isAuth, addStudent);
router.get('/', isAuth, getStudents);
router.get('/:id', isAuth, getStudent);
router.put('/:id', isAuth, updateStudent);
router.delete('/:id', isAuth, deleteStudent);

export default router;
