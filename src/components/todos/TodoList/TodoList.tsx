import { TodoItem } from '../TodoItem';
import { TodoListHeader } from './TodoListHeader';
import { TodoListEmpty } from './TodoListEmpty';
import { TodoListSkeleton } from './TodoListSkeleton';
import { TodoListContent } from './TodoListContent';
import { useTodos } from '@/hooks/useTodos';

export function TodoList() {
  const { todos, loading, error } = useTodos();

  if (loading) {
    return <TodoListSkeleton />;
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
      <TodoListContent todos={todos} />
    </div>
  );
}