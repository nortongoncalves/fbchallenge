import { createStyles } from './styles';

export type CircleProps = {
  top?: number;
  left?: number;
}

export function Circle({top = 0, left = 0}: CircleProps) {
  const styles = createStyles({top, left});

  return (
    <div className="circle" style={styles}></div>
  );
}
