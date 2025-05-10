const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/studentData.json");

const loadStudents = () => JSON.parse(fs.readFileSync(filePath));
const saveStudents = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Create a new student
router.post("/", (req, res) => {
  const students = loadStudents();
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    marks: req.body.marks || [],
  };
  students.push(newStudent);
  saveStudents(students);
  res.status(201).json(newStudent);
});

// Get all students
router.get("/", (req, res) => {
  const students = loadStudents();
  res.json(students);
});

// Get student by ID with marks
router.get("/:id", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// Update student info
router.put("/:id", (req, res) => {
  const students = loadStudents();
  const index = students.findIndex((s) => s.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Student not found" });

  students[index] = { ...students[index], ...req.body };
  saveStudents(students);
  res.json({ message: "Student updated" });
});

// Delete student
router.delete("/:id", (req, res) => {
  const students = loadStudents();
  const index = students.findIndex((s) => s.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Student not found" });

  students.splice(index, 1);
  saveStudents(students);
  res.json({ message: "Student deleted" });
});

module.exports = router;
