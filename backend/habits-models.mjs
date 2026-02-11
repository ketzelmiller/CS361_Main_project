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
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completionLog: { type:[Date], default: []},

  //Recover
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
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
  const result = await Habit.findByIdAndUpdate( id, { isDeleted:true, deletedAt: new Date() }, { new: true } );
  return result;
}

// --- RETRIEVE DELETED (PAST 30 DAYS) ---
export async function getDeletedHabits(){
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() -30)
  return Habit.find(
    { isDeleted: true, deletedAt: { $gte: cutoff }}
  ).sort({ deletedAt: -1 });
}

// Restore the deleted habit and return it's deletion attributes to defualt
export async function restoreHabitById(id){
  return Habit.findByIdAndUpdate(id, { idDeleted: false, deletedAt: null }, { new: true });
}