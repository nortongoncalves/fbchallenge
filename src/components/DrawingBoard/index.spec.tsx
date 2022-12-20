import { fireEvent, render, screen } from "@testing-library/react";
import { DrawingBoard } from ".";

describe('DrawingBoard', () => {
  it('should create a circle when clicked in component', () => {
    render(<DrawingBoard />);
    const element = screen.getByTestId('drawing_board_test_id');
    fireEvent.click(element);
    expect(screen.getByTestId('circle_test_id')).toBeTruthy();
  });

  it('should create a circle when clicked on the component and sum the last added circle index with the recent one', () => {
    render(<DrawingBoard />);
    const element = screen.getByTestId('drawing_board_test_id');
    fireEvent.click(element);
    fireEvent.click(element);
    expect(screen.queryAllByTestId('circle_test_id').length).toBe(2);
  });

  it('should remove a circle when clicked in Undo button', () => {
    render(<DrawingBoard />);
    const element = screen.getByTestId('drawing_board_test_id');
    fireEvent.click(element);
    const undoButton = screen.getByTestId('undo_button_test_id');
    fireEvent.click(undoButton);
    expect(screen.queryAllByTestId('circle_test_id').length).toBe(0);
  });

  it('should redo a circle when clicked in Redo button', () => {
    render(<DrawingBoard />);
    const element = screen.getByTestId('drawing_board_test_id');
    fireEvent.click(element);
    const undoButton = screen.getByTestId('undo_button_test_id');
    fireEvent.click(undoButton);
    const redoButton = screen.getByTestId('redo_button_test_id');
    fireEvent.click(redoButton);
    expect(screen.queryAllByTestId('circle_test_id').length).toBe(1);
  });
})
