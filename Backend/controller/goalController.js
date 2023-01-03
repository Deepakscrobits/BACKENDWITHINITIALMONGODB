const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");

//@route  GET/api/golas
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({ goals });
});

//@route  POST/api/golas
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text feild ");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json({ goal });
});

//@route  PUT/api/golas/:id
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoals);
});




//@route  DELETE/api/golas/:id
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  await goal.remove()
  res.status(200).json({ id:req.params.id  });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
