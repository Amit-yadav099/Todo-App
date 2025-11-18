import React from 'react';
import { Todo } from '../types';
import { Check, Edit, Trash2, Clock } from 'lucide-react';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleDateString();

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 transition-all hover:shadow-md ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggle(todo._id)}
            className={`mt-1 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-gray-900 wrap-break-words ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className="mt-1 text-sm text-gray-600 wrap-break-words">
                {todo.description}
              </p>
            )}
            
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit todo"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onDelete(todo._id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};