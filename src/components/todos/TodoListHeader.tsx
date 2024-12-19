import { Anchor } from 'lucide-react';

export function TodoListHeader() {
  return (
    <div className="flex items-center mb-6">
      <Anchor className="w-6 h-6 text-[#d32f2f] mr-2" />
      <h2 className="text-2xl font-bold text-gray-900">Adventure Log</h2>
    </div>
  );
}