import { Response, NextFunction } from 'express';
import Todo from '../models/Todo';
import { AuthRequest } from '../middleware/auth';

export const getTodos = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find({ user: req.user?._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user?._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description,
      user: req.user?._id
    });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user?._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user?._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTodoComplete = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user?._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: !todo.completed },
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};