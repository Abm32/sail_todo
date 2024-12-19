import { ScrollArea } from '@/components/ui/scroll-area';
import { TodoItem } from '../TodoItem';
import { useTodoFilters } from '@/hooks/useTodoFilters';
import { Todo } from '@/store/todosSlice';

interface TodoListContentProps {
  todos: Todo[];
}

export function TodoListContent({ todos }: TodoListContentProps) {
  const { filteredTodos } = useTodoFilters(todos);

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={`todo-${todo.id}`} todo={todo} />
        ))}
      </div>
    </ScrollArea>
  );
}