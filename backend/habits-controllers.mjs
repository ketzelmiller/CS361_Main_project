import "dotenv/config";
import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import * as habits from "./habits-models.mjs";
import { body, validationResult } from "express-validator"

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await habits.connect();
  console.log(`Server listening on port ${PORT}`);
});

// ----- EXPRESS VALIDATORS -----
const frequencies = ["Hourly", "Daily", "Weekly", "Biweekly", "Monthly", "Custom"];

export const habitValidators = [body("name").trim().notEmpty().withMessage("Habit cannot be empty."),
  body("frequency").notEmpty().withMessage("Frequency cannot be empty.").isIn(frequencies),
  body("notes").optional({checkFalsy: true}).trim()
]

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}


// POST
app.post("/habits", habitValidators, validate, asyncHandler(async (req, res) => {
  const { name, frequency, notes } = req.body;
  if (!name || !frequency) return res.status(400).json({ error: "name and frequency required" });

  const newHabit = await habits.createHabit({ name, frequency, notes });
  res.status(201).json(newHabit);
}));

// GET all
app.get("/habits", asyncHandler(async (req, res) => {
  const data = await habits.getAllHabits();
  res.status(200).json(data);
}));

// GET one
app.get("/habits/:id", habitValidators, validate, asyncHandler(async (req, res) => {
  const habit = await habits.getHabitById(req.params.id);
  if (!habit) return res.status(404).json({ error: "Not found" });
  res.status(200).json(habit);
}));

// GET deleted habit (last 30 days)
app.get("/habits/deleted", asyncHandler(async(req, res) => {
  const deletedHabits = await habits.getDeletedHabits()
  res.status(200).json(deletedHabits)
}))

// PUT
app.put("/habits/:id", asyncHandler(async (req, res) => {
  const updated = await habits.updateHabitById(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.status(200).json(updated);
}));

// PATCH
app.patch("/habits/:id/restore", asyncHandler(async(req,res) => {
  const restored = await habits.restoreHabitById(req.params.id)
  if (!restored) return res.status(404).json({ error: "Not found" });
  res.status(200).json(restored);
}))

// DELETE
app.delete("/habits/:id", asyncHandler(async (req, res) => {
  const deleted = await habits.deleteHabitById(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}));

