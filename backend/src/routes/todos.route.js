const express = require("express");
const { Todos, payLoadValidation } = require("../model/todos");

const router = express.Router();
router
  .route("/todos")
  // Get all todos
  .get(async (req, res) => {
    const { page_number } = req.query;
    const todos_per_page = 20;
    const skip = Number(todos_per_page * page_number);

    const todos = await Todos.find({}).skip(skip).limit(todos_per_page).exec();
    res.status(200).json(todos);
  })

  // Create New Todos
  .post(async (req, res) => {
    const { text, due_date } = req.body;

    const { error } = payLoadValidation({ text, due_date, completed: false });
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const todo = new Todos({ text, due_date, completed: false });
    await todo.save();

    res.status(201).json({ message: "Todo created successfully!", todo });
  });

router
  .route("/todos/:id")
  // Update Todos by id
  .put(async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (!id) {
      res.status(400).json({ message: "Invalid Id" });
    }

    if (typeof completed !== "boolean") {
      res.status(400).json({ message: "invalid 'completed' expected boolean" });
      return;
    }

    const todo = await Todos.findByIdAndUpdate(
      id,
      { $set: { completed } },
      { new: true }
    );

    res.status(200).json(todo);
  })
  // Delete todo by id
  .delete(async (req, res) => {
    const { id } = req.params;

    await Todos.findByIdAndDelete(id);
    res.status(203).end();
  });

module.exports = router;
