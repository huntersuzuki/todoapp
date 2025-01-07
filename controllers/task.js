import { Task } from "../models/task.js";
import ErrorHandler from "../middleware/error.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(200).json({
      success: true,
      message: "task added successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const task = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (e) {
    next(e);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler("Task not Found", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully !!",
    });
  } catch (e) {
    next(e);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler("Invalid Id", 404));
    }
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted successfully !!",
    });
  } catch (e) {
    next(e);
  }
};
