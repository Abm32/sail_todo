import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="dueDate">Due Date</Label>
      <Input
        type="date"
        id="dueDate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
        min={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
}