import React, { useState } from 'react';
import { useUndoRedo } from '../../hooks/useUndoRedo';
import { Circle } from '../Circle';
import './styles.css';

export type CircleData = {
  index: number;
  top: number;
  left: number;
}

export function DrawingBoard() {
  const [circleStack, setCircleStack] = useState<CircleData[]>([]);
  const [undo, redo, clearStack] = useUndoRedo<CircleData>();

  function createCircleStack(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    setCircleStack(circles => {
      let lastIndex = 0
      if (circleStack.length > 0) {
        lastIndex = circleStack[circleStack.length - 1].index;
      }
      return [...circles, {
        index: lastIndex + 1,
        left: event?.clientX - 10,
        top: event?.clientY - 10,
      }]
    });
  }

  function handleOnClickCapture(event?: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!event || String(event.target) === '[object HTMLButtonElement]') return;
    createCircleStack(event);
    clearStack();
  }

  function handleOnClickUndo() {
    const newStack = undo(circleStack);
    setCircleStack(newStack);
  }

  function handleOnClickRedo() {
    const newStack = redo(circleStack);
    setCircleStack(newStack);
  }

  return(
    <section
      id='drawing_board'
      className='drawing_board'
      onClick={handleOnClickCapture}
    >
      <aside>
        <button onClick={handleOnClickUndo}>Undo</button>
        <button onClick={handleOnClickRedo}>redo</button>
      </aside>
      {circleStack.map(circle => (
          <Circle
            key={circle.index}
            left={circle.left}
            top={circle.top}
          />
        )
      )}
    </section>
  );
}
