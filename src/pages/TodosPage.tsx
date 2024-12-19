import { TodoHeader } from '@/components/todos/TodoHeader';
import { AddTodoForm } from '@/components/todos/AddTodoForm';
import { TodoList } from '@/components/todos/TodoList';
import { BackgroundDecorations } from '@/components/layout/BackgroundDecorations';

export function TodosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a237e] to-[#0d47a1] relative overflow-hidden">
      <BackgroundDecorations />
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <TodoHeader />
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  );
}