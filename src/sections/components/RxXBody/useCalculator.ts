import { createState } from '@core/RXContextCore/useContextSubscriber';
import { HistoryItem, WindowType } from '@sections/types';

interface Actions {
  switchWindowType(): void;

  appendDigit(digit: string): void;

  appendOperation(operation: string): void;

  deleteLastDigit(): void;

  calculate(): void;
}

const [useCurrentValue, $current] = createState<string>('0');
const [useHistoryItems, $history] = createState<HistoryItem[]>([]);
const [useWindowType, $windowType] = createState<WindowType>('calculator');

const actions: Actions = {
  switchWindowType() {
    const history = $history.getValue();
    const windowType = $windowType.getValue();
    if (history.length === 0) {
      return;
    }

    if (windowType === 'calculator') {
      $windowType.next('history');
    } else {
      $windowType.next('calculator');
    }
  },

  appendDigit(digit: string) {
    const current = $current.getValue();
    const lastNumber = current.split(/[\+\-\*\/]/).pop();

    if (digit === '.' && lastNumber !== undefined && /\.\d*$/.test(lastNumber)) {
      return;
    }

    if (current === '0' && digit !== '.') {
      $current.next(digit);
    } else {
      $current.next(current + digit);
    }
  },

  appendOperation(operation: string) {
    const current = $current.getValue();
    if (!isNaN(Number(current[current.length - 1]))) {
      $current.next(current + operation);
    }
  },

  deleteLastDigit() {
    const current = $current.getValue();

    if (current.length > 1) {
      $current.next(current.slice(0, -1));
    } else {
      $current.next('0');
    }
  },

  calculate() {
    const current = $current.getValue();
    const history = $history.getValue();

    try {
      const result = eval(current);

      if (typeof result === 'function') {
        return;
      }

      const lastHistory = history.reverse()[0];

      if (lastHistory) {
        if (lastHistory.result === result) {
          return;
        }
      }

      if (current === String(result)) {
        return;
      }

      const chars = Array.from(current);
      if (chars.reverse()[0] === '.') {
        return;
      }

      $history.next([
        ...history,
        {
          index: history.length + 1,
          common: `${current} = ${result}`,
          result: result,
          formula: current,
        },
      ]);
      $current.next(result.toString());
    } catch (e) {}
  },
};

const useCalculator = () => {
  return {
    useCurrentValue,
    useHistoryItems,
    useWindowType,
    actions,
  };
};

export default useCalculator;
