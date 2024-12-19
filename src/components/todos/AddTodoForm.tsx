import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { RootState } from '@/store/store';
import { addTodo } from '@/store/todosSlice';
import { Button } from '@/components/ui/button';
import { Map, CalendarDays, Flag } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    try {
      const newTodo = {
        title: title.trim(),
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
        userId: user.uid,
      };

      const docRef = await addDoc(collection(db, 'todos'), newTodo);
      dispatch(addTodo({ ...newTodo, id: docRef.id }));
      toast.success('New adventure added!');
      setTitle('');
      setPriority('medium');
      setDueDate('');
    } catch (error) {
      toast.error('Failed to add new task');
    }
  };

  return (
    <Card className="p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-6">
          <Map className="w-6 h-6 text-[#d32f2f] mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Plot New Course</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Task Title */}
          <div className="md:col-span-6">
            <Label htmlFor="title" className="text-sm font-medium mb-2 block">
              Adventure Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the next adventure?"
              className="w-full"
            />
          </div>

          {/* Priority Selection */}
          <div className="md:col-span-3">
            <Label htmlFor="priority" className="text-sm font-medium mb-2 block">
              Priority Level
            </Label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger className="w-full" id="priority">
                <Flag className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="md:col-span-3">
            <Label htmlFor="dueDate" className="text-sm font-medium mb-2 block">
              Due Date
            </Label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-[#1a237e] hover:bg-[#0d47a1] text-white font-bold"
        >
          Set Course!
        </Button>
      </form>
    </Card>
  );
}