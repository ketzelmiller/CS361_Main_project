import mongoose from "mongoose";
import "dotenv/config";

let connection;

export async function connect() {
  await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
  connection = mongoose.connection;
  console.log("Connected to MongoDB");
}

const habitSchema = mongoose.Schema({
  name: { type: String, required: true },
  frequency: { type: String, required: true },   // "Daily", "Weekly", etc.
  notes: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const Habit = mongoose.model("Habit", habitSchema);

// --- CREATE ---
export async function createHabit(data) {
  return Habit.create(data);
}

// --- READ ---
export async function getAllHabits() {
  return Habit.find({}).sort({ createdAt: -1 });
}

export async function getHabitById(id) {
  return Habit.findById(id);
}

// --- UPDATE ---
export async function updateHabitById(id, data) {
  return Habit.findByIdAndUpdate(id, data, { new: true });
}

// --- DELETE ---
export async function deleteHabitById(id) {
  const result = await Habit.deleteOne({ _id: id });
  return result.deletedCount;
}