import { useMemo } from 'react';
import { Todo } from '@/store/todosSlice';

export function useTodoFilters(todos: Todo[]) {
  const filteredTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      // Sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // Finally by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [todos]);

  return { filteredTodos };
}