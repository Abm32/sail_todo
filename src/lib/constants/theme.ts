export const COLORS = {
  primary: {
    main: '#1a237e',
    dark: '#0d47a1',
    light: '#534bae'
  },
  secondary: {
    main: '#d32f2f',
    dark: '#b71c1c',
    light: '#e57373'
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5'
  }
} as const;

export const PRIORITIES = {
  low: {
    label: 'Low Priority',
    color: 'bg-green-100 text-green-800'
  },
  medium: {
    label: 'Medium Priority',
    color: 'bg-yellow-100 text-yellow-800'
  },
  high: {
    label: 'High Priority',
    color: 'bg-red-100 text-red-800'
  }
} as const;