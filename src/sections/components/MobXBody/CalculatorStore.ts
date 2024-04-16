import { makeAutoObservable } from 'mobx';
import {CalculatorInterface, HistoryItem, WindowType} from "@sections/types";


class CalculatorStore implements CalculatorInterface {
  current = '0';
  history: HistoryItem[] = [];
  windowType: WindowType = 'calculator';

  constructor() {
    makeAutoObservable(this);
  }

  switchWindowType() {
    if (this.history.length === 0) {
      return;
    }

    if (this && this.windowType === 'calculator') {
      this.windowType = 'history';
    } else {
      this.windowType = 'calculator';
    }
  }

  appendDigit(digit: string) {
    const lastNumber = this.current.split(/[\+\-\*\/]/).pop();

    if (digit === '.' && lastNumber !== undefined && /\.\d*$/.test(lastNumber)) {
      return;
    }

    if (this.current === '0' && digit !== '.') {
      this.current = digit;
    } else {
      this.current += digit;
    }
  }

  appendOperation(operation: string) {
    if (!isNaN(Number(this.current[this.current.length - 1]))) {
      this.current += operation;
    }
  }

  clear() {
    this.current = '0';
  }

  clearHistory() {
    this.history = [];
    this.windowType = 'calculator';
  }

  deleteLastDigit() {
    if (this.current === 'Error') {
      this.current = '0';
      return;
    }

    if (this.current.length > 1) {
      this.current = this.current.slice(0, -1);
    } else {
      this.current = '0';
    }
  }

  calculate() {
    try {
      const result = eval(this.current);

      if (typeof result === 'function') {
        return;
      }

      const lastHistory = this.history.reverse()[0];

      if (lastHistory) {
        if (lastHistory.result === result) {
          return;
        }
      }

      if (this.current === String(result)) {
        return;
      }

      const chars = Array.from(this.current);
      if (chars.reverse()[0] === '.') {
        return;
      }

      this.history.push({
        index: this.history.length + 1,
        common: `${this.current} = ${result}`,
        result: result,
        formula: this.current,
      });
      this.current = result.toString();
    } catch (e) {}
  }
}

const calculatorStore = new CalculatorStore();

export default calculatorStore;
