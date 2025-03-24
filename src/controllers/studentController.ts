// import asyncHandler from 'express-async-handler';
// import Student from '../models/studentModel';

// const addStudent = asyncHandler(async (req, res) => {
//   const { name, roll, birthday, address } = req.body;
//   if (!name || !roll || !birthday || !address) {
//     res.status(400);
//     throw new Error('Please enter all the feilds');
//   }
//   const rollExists = await Student.findOne({ roll });
//   if (rollExists) {
//     res.status(400);
//     throw new Error('Roll Number already exists');
//   }

//   const student = await Student.create({
//     name,
//     roll,
//     birthday,
//     address,
//   });
//   if (student) {
//     res.status(201).send({
//       _id: student._id,
//       name: student.name,
//       roll: student.roll,
//       birthday: student.birthday,
//       address: student.address,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Student not found');
//   }
// });

// const getStudents = asyncHandler(async (req, res) => {
//   const students = await Student.find();

//   res.send({
//     data: students,
//   });
// });

// const getStudent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id);
//   if (student) {
//     res.send({
//       data: student,
//     });
//   } else {
//     res.status(404);
//     throw new Error('Student not found');
//   }
// });

// const updateStudent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id);
//   if (student) {
//     student.name = req.body.name || student.name;
//     student.roll = req.body.roll || student.roll;
//     student.birthday = req.body.birthday || student.birthday;
//     student.address = req.body.address || student.address;

//     const updatedStudent = await student.save();
//     res.send({
//       _id: updatedStudent._id,
//       name: updatedStudent.name,
//       roll: updatedStudent.roll,
//       birthday: updatedStudent.birthday,
//       address: updatedStudent.address,
//     });
//   } else {
//     res.status(404);
//     throw new Error('Student not found');
//   }
// });

// const deleteStudent = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findById(id);
//     if (student) {
//       await Student.deleteOne({ _id: id });
//       res.send({ message: 'Student removed' });
//     } else {
//       res.status(404).json({ message: 'Student not found' });
    
//   } catch (error) {
//     res.status(404).json({ message: error });
//   }
// });

// export { addStudent, getStudents, getStudent, updateStudent, deleteStudent };
