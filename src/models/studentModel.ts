import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    roll: { type: Number, required: true },
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
