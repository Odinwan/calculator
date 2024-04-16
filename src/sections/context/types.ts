export type WindowType = 'calculator' | 'history';

export interface HistoryItem {
  index: number;
  common: string;
  result: string;
  formula: string;
}

export interface CalculatorInterface {
  current: string;
  history: HistoryItem[];
  windowType: WindowType;

  switchWindowType(): void;

  appendDigit(digit: string): void;

  appendOperation(operation: string): void;

  clear(): void;

  clearHistory(): void;

  deleteLastDigit(): void;

  calculate(): void;
}
