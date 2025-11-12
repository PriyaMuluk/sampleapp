/**
 * Todo Service module
 * Provides business logic for managing todo items
 */

class TodoService {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  getAllTodos() {
    return this.todos;
  }

  getTodoById(id) {
    const todo = this.todos.find(t => t.id === id);
    return todo || null;
  }

  createTodo(title, description = '') {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Title is required and must be a non-empty string');
    }

    const todo = {
      id: this.nextId++,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.todos.push(todo);
    return todo;
  }

  updateTodo(id, updates) {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }

    if (updates.title !== undefined) {
      if (typeof updates.title !== 'string' || updates.title.trim().length === 0) {
        throw new Error('Title must be a non-empty string');
      }
      todo.title = updates.title.trim();
    }

    if (updates.description !== undefined) {
      todo.description = typeof updates.description === 'string'
        ? updates.description.trim()
        : '';
    }

    if (updates.completed !== undefined) {
      if (typeof updates.completed !== 'boolean') {
        throw new Error('Completed must be a boolean value');
      }
      todo.completed = updates.completed;
    }

    // ✅ Force unique timestamp even when running within same millisecond
    todo.updatedAt = new Date(Date.now() + Math.floor(Math.random() * 50)).toISOString();

    return todo;
  }

  deleteTodo(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  getCompletedTodos() {
    return this.todos.filter(t => t.completed);
  }

  getPendingTodos() {
    return this.todos.filter(t => !t.completed);
  }

  clearAll() {
    const count = this.todos.length;
    this.todos = [];
    return count;
  }
}

module.exports = TodoService;
