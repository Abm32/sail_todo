import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { PRIORITIES } from '@/lib/constants/theme';

interface PrioritySelectProps {
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
}

export function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(PRIORITIES).map(([key, { label, color }]) => (
          <SelectItem key={key} value={key} className={color}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}