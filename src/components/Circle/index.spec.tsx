import { render, screen } from "@testing-library/react";
import { Circle } from './index';

describe('Circle', () => {
  it('should render the component', () => {
    const { container } = render(<Circle />);
    expect(container).toBeTruthy();
  });

  it('should be possible to change the component top position in props', () => {
    const top = 40;
    render(<Circle key={1} top={top}/>);
    const element = screen.getByTestId('circle_test_id');
    expect(element.style.top).toEqual(`${top}px`);
  });

  it('should be possible to change the component left position in props', () => {
    const left = 140;
    render(<Circle key={1} left={left}/>);
    const element = screen.getByTestId('circle_test_id');
    expect(element.style.left).toEqual(`${left}px`);
  })
});
