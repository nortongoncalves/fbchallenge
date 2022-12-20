import { createStyles } from './styles';

export type CircleProps = {
  top?: number;
  left?: number;
}

export function Circle({top = 0, left = 0}: CircleProps) {
  const styles = createStyles({top, left});

  return (
    <div data-testid="circle" className="circle" style={styles}></div>
  );
}
