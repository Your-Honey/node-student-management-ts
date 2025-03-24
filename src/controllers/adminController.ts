import asyncHandler from 'express-async-handler';
import Class from '../models/classModel';
import { IGetUserAuthInfoRequest } from '../types/request';
import User from '../models/userModel';

const createClass = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
  if (req.user && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
  const { name, section } = req.body;
  console.log(name, section);
  if (!name || !section) {
    res.status(400);
    throw new Error('Please enter all the feilds');
  }
  const classExists = await Class.findOne({ name: name, section: section });
  if (classExists) {
    res.status(400);
    throw new Error('Class already exists');
  }
  const newClass = await Class.create({
    name,
    section,
  });
  if (newClass) {
    res.status(201).send({
      _id: newClass._id,
      name: newClass.name,
      section: newClass.section,
    });
  } else {
    res.status(400);
    throw new Error('Class not found');
  }
});

const createUser = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
  if (req.user && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
  const { name, email, role, classId, assignedClass } = req.body;
  if (!name || !email || !role) {
    res.status(400);
    throw new Error('Please enter all the feilds');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (role === 'teacher' && !assignedClass) {
    res.status(400);
    throw new Error('Please enter assignedClass for teacher');
  }

  if (role === 'student' && !classId) {
    res.status(400);
    throw new Error('Please enter classId for student');
  }

  let rollNumber = null;

  if (role === "student") {
    // Find the highest roll number in the class and increment it
    const lastStudent = await User.findOne({ role: "student"})
      .sort({ rollNumber: -1 }) // Get the student with the highest roll number
      .select("rollNumber");

    rollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1; // Start from 1 if no students exist
  }

  const user = await User.create({
    name,
    email,
    role,
    classId: role === 'student' ? classId : null,
    assignedClass: role === 'teacher' ? assignedClass : null,
    rollNumber, // Only assigned if student
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      rollNumber: user.rollNumber || 'N/A', // Show roll number only for students
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

const getAllClasses = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
  if (req.user && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
  const classes = await Class.find({});
  if (classes) {
    res.status(200).send(classes);
  } else {
    res.status(400);
    throw new Error('Classes not found');
  }
});

export { createClass, createUser, getAllClasses };
