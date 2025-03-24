import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    section: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  });
  
  const Class = mongoose.model("Class", classSchema);
  export default Class ;