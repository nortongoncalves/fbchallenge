import { useCallback, useState } from "react";

export type Undo<T> = (data: T[]) => T[];
export type Redo<T> = (data: T[]) => T[];
export type ClearStack = () => void;
export type GetStack<T> = () => T[];
export type UseUndoRedoResponse<T> = {
  undo: Undo<T>;
  redo: Redo<T>;
  clearStack: ClearStack;
  getStack: GetStack<T>;
};
export function useUndoRedo<TypeData>(): UseUndoRedoResponse<TypeData> {
  const [stack, setStack] = useState<TypeData[]>([]);

  const undo: Undo<TypeData> = useCallback((data: TypeData[]): TypeData[] => {
    if (!data || data.length <= 0) return data;
    const lastData = data[data.length - 1];
    setStack(oldValues => [...oldValues, lastData]);
    return data.filter(value => value !== lastData);
  }, []);

  const redo: Redo<TypeData> = useCallback((data: TypeData[]): TypeData[] => {
    if (stack.length <= 0) return data;
    const lastUndoData = stack[stack.length - 1];
    setStack(oldValues => oldValues.filter(oldValue => oldValue !== lastUndoData));
    return [...data, lastUndoData];
  }, [stack]);

  const clearStack: ClearStack = useCallback(() => setStack([]), []);

  const getStack: GetStack<TypeData> = useCallback(() => stack, [stack]);

  return {undo, redo, clearStack, getStack};
}
