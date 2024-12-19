import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function TodoInput({ value, onChange, placeholder }: TodoInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Task Title</Label>
      <Input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
}