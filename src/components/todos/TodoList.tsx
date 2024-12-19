import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTodos } from '@/store/todosSlice';
import { TodoItem } from './TodoItem';
import { TodoListHeader } from './TodoListHeader';
import { TodoListEmpty } from './TodoListEmpty';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTodoFilters } from '@/hooks/useTodoFilters';
import { useTodos } from '@/hooks/useTodos';

export function TodoList() {
  const { todos, loading, error } = useTodos();
  const { filteredTodos } = useTodoFilters(todos);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6">
        <p className="text-red-500">Error loading todos</p>
      </div>
    );
  }

  if (!todos.length) {
    return <TodoListEmpty />;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <TodoListHeader />
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}