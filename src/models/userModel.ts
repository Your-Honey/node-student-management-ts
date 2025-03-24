import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, default: "123" },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },

  // Student-Specific Fields (Only applicable if role === "student")
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null }, // Student belongs to a class
  rollNumber: { type: Number, default: null }, // Unique within a class
  // Teacher-Specific Fields (Only applicable if role === "teacher")
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null }, // Teacher assigned to a class
  isActive: { type: Boolean, default: true },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
},{
  timestamps: true,
});


const User = mongoose.model('User', userSchema);

export default User;
