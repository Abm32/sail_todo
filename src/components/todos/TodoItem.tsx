import { useDispatch } from 'react-redux';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Todo, updateTodo, deleteTodo } from '@/store/todosSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

export function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  const handleToggle = async () => {
    try {
      const todoRef = doc(db, 'todos', todo.id);
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateDoc(todoRef, updatedTodo);
      dispatch(updateTodo(updatedTodo));
      toast.success(todo.completed ? 'Task reopened!' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'todos', todo.id));
      dispatch(deleteTodo(todo.id));
      toast.success('Task removed from the log!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className={cn(
      'flex items-center justify-between p-4 rounded-lg border-2 transition-all',
      todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-[#1a237e]'
    )}>
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="border-2 border-[#d32f2f]"
        />
        <div>
          <h3 className={cn(
            'text-lg font-medium',
            todo.completed && 'line-through text-gray-500'
          )}>
            {todo.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium border',
              priorityColors[todo.priority]
            )}>
              {todo.priority.toUpperCase()}
            </span>
            {todo.dueDate && (
              <span className="text-sm text-gray-500">
                Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <Swords className="h-5 w-5 text-[#1a237e]" />
      </div>
    </div>
  );
}