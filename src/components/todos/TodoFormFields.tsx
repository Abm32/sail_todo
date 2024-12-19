import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { PRIORITIES } from '@/lib/constants/theme';

interface TodoFormFieldsProps {
  title: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  onTitleChange: (value: string) => void;
  onPriorityChange: (value: 'low' | 'medium' | 'high') => void;
  onDueDateChange: (value: string) => void;
}

export function TodoFormFields({
  title,
  priority,
  dueDate,
  onTitleChange,
  onPriorityChange,
  onDueDateChange
}: TodoFormFieldsProps) {
  return (
    <div className="flex space-x-4">
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="What's the next adventure?"
        className="flex-1 border-2 border-gray-300 focus:border-[#1a237e]"
      />
      <Select
        value={priority}
        onValueChange={onPriorityChange}
      >
        {Object.entries(PRIORITIES).map(([key, { label }]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </Select>
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => onDueDateChange(e.target.value)}
        className="border-2 border-gray-300 focus:border-[#1a237e]"
      />
    </div>
  );
}