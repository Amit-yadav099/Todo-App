import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Filter, 
  Search, 
  Loader, 
  CheckCircle2, 
  Clock, 
  Calendar,
  TrendingUp,
  Edit3,
  Trash2,
  CheckSquare
} from 'lucide-react';
import { Todo } from '../types';
import { todosAPI } from '../lib/api';
// import { TodoCard } from '../components/TodoCard';
import { TodoForm } from '../components/TodoForm';
import { TodoFormData } from '../schemas';

type FilterType = 'all' | 'active' | 'completed';

export const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: todosData, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todosAPI.getTodos,
  });

  const createMutation = useMutation({
    mutationFn: todosAPI.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      todosAPI.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingTodo(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todosAPI.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: todosAPI.toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleCreateTodo = (data: TodoFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdateTodo = (data: TodoFormData) => {
    if (editingTodo) {
      updateMutation.mutate({ id: editingTodo._id, data });
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleTodo = (id: string) => {
    toggleMutation.mutate(id);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const filteredTodos = todosData?.data?.filter((todo: Todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  }) || [];

  const stats = {
    total: todosData?.data?.length || 0,
    completed: todosData?.data?.filter((todo: Todo) => todo.completed).length || 0,
    active: todosData?.data?.filter((todo: Todo) => !todo.completed).length || 0,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold  bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Stay organized and boost your productivity</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="group relative bg-linear-to-r from-blue-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-blue-550 hover:to-blue-550 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3 font-semibold shadow-md"
          >
            <div className="relative">
              <Plus className="h-5 w-5" />
              <Plus className="h-5 w-5 absolute top-0 left-0 animate-ping" />
            </div>
            <span>Add New Task</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>All your tasks</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Need your attention</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.completed}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Well done!</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{completionRate}%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-linear-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 border border-gray-300 rounded-xl p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  filter === 'all'
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>All</span>
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  filter === 'active'
                    ? 'bg-linear-to-r from-green-600 to-green-700 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Active</span>
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  filter === 'completed'
                    ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Completed</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <CheckSquare className="h-6 w-6 text-blue-600 mr-3" />
            Your Tasks
            <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
            </span>
          </h2>
        </div>

        <div className="p-6">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-linear-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                {searchTerm || filter !== 'all' ? (
                  <Search className="h-10 w-10 text-gray-400" />
                ) : (
                  <CheckSquare className="h-10 w-10 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {searchTerm || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || filter !== 'all'
                  ? 'Try adjusting your search terms or filter criteria'
                  : 'Get started by creating your first task and stay organized!'}
              </p>
              {!searchTerm && filter === 'all' && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-md"
                >
                  Create Your First Task
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTodos.map((todo: Todo) => (
                <div
                  key={todo._id}
                  className={`group relative bg-linear-to-r rounded-2xl p-1 transition-all duration-200 hover:shadow-lg ${
                    todo.completed
                      ? 'from-green-50 to-emerald-50 border border-green-200'
                      : 'from-white to-gray-50 border border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <button
                          onClick={() => handleToggleTodo(todo._id)}
                          className={`mt-1 flex-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            todo.completed
                              ? 'bg-shrink-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-sm'
                              : 'border-gray-300 hover:border-green-500 hover:shadow-md'
                          }`}
                        >
                          {todo.completed && <CheckCircle2 className="h-4 w-4" />}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-gray-900 wrap-break-words text-lg ${
                            todo.completed ? 'line-through text-gray-500' : ''
                          }`}>
                            {todo.title}
                          </h3>
                          
                          {todo.description && (
                            <p className="mt-2 text-gray-600 wrap-break-words leading-relaxed">
                              {todo.description}
                            </p>
                          )}
                          
                          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(todo.createdAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              todo.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {todo.completed ? 'Completed' : 'In Progress'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEditTodo(todo)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Edit task"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      {(showForm || editingTodo) && (
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          onCancel={() => {
            setShowForm(false);
            setEditingTodo(null);
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
};