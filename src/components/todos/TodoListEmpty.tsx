import { Compass } from 'lucide-react';

export function TodoListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-xl p-6">
      <Compass className="w-16 h-16 mb-4 text-gray-400" />
      <p className="text-lg text-gray-500">No adventures logged yet!</p>
      <p className="text-sm text-gray-400 mt-2">Add your first task to begin the journey</p>
    </div>
  );
}