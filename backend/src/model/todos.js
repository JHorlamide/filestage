const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },

  due_date: {
    type: Date,
    require: true,
    default: Date.now
  },

  completed: {
    type: Boolean,
    require: true,
    default: false
  },
});

const Todos = mongoose.model("todos", todoSchema);

const payLoadValidation = (payload) => {
  const schema = Joi.object({
    text: Joi.string().min(3).max(255).required(),
    due_date: Joi.date().required(),
    completed: Joi.boolean().required()
  })

  return schema.validate(payload);
}

module.exports = { Todos, payLoadValidation };
