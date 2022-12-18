import { useCallback, useState } from "react";

export type undo<T> = (data: T[]) => T[];
export type redo<T> = (data: T[]) => T[];
export type clearStack = () => void;

export function useUndoRedo<TypeData>(): [undo<TypeData>, redo<TypeData>, clearStack] {
  const [stack, setStack] = useState<TypeData[]>([]);

  const undo = useCallback((data: TypeData[]): TypeData[] => {
    if (!data || data.length <= 0) return data;
    const lastData = data[data.length - 1];
    setStack(oldValues => [...oldValues, lastData]);
    return data.filter(value => value !== lastData);
  }, []);

  const redo = useCallback((data: TypeData[]): TypeData[] => {
    if (stack.length <= 0) return data;
    const lastUndoData = stack[stack.length - 1];
    setStack(oldValues => oldValues.filter(oldValue => oldValue !== lastUndoData));
    return [...data, lastUndoData];
  }, [stack]);

  const clearStack = useCallback(() => setStack([]), []);

  return [undo, redo, clearStack];
}
