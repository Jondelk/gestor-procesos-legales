const Task = require("../models/Task");

// Crear tarea
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "El título es obligatorio"
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id
    });

    res.status(201).json({
      message: "Tarea creada correctamente",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message
    });
  }
};

// Obtener todas las tareas del usuario autenticado
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Lista de tareas",
      total: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tareas",
      error: error.message
    });
  }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada"
      });
    }

    res.status(200).json({
      message: "Tarea encontrada",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la tarea",
      error: error.message
    });
  }
};

// Actualizar tarea
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    let task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada"
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Tarea actualizada correctamente",
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la tarea",
      error: error.message
    });
  }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada"
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Tarea eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la tarea",
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};