import React, { useState } from 'react';
import { Circle } from '../Circle';
import './styles.css';

export type CircleData = {
  index: number;
  top: number;
  left: number;
}

export function DrawingBoard() {
  const [circleStack, setCircleStack] = useState<CircleData[]>([]);
  const [, setUndoCircleStack] = useState<CircleData[]>([]);

  function handleOnClickCapture(event?: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!event || String(event.target) === '[object HTMLButtonElement]') return;
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
    setUndoCircleStack([]);
  }

  function isDifLastCircle(circle: CircleData, lastCircle: CircleData) {
    return circle.index !== lastCircle.index;
  }

  function handleOnClickUndo() {
    setCircleStack(circle => {
      if (circle.length <= 0) return [];
      const lastCircle = circle[circle.length - 1];
      setUndoCircleStack(undoCircle => [...undoCircle, lastCircle]);
      return [...circle.filter(
        value => isDifLastCircle(value, lastCircle)
      )];
    });
  }

  function handleOnClickRedo() {
    setUndoCircleStack(undoCircle => {
      if (undoCircle.length <= 0) return [];
      const lastUndoCircle = undoCircle[undoCircle.length - 1];
      setCircleStack(circle => [...circle, lastUndoCircle]);
      return undoCircle.filter(
        value => isDifLastCircle(value, lastUndoCircle)
      );
    });
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
