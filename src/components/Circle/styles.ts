export type CreateStylesProps = {
  top: number;
  left: number;
}

export function createStyles({left, top}: CreateStylesProps): React.CSSProperties {
  return {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    display: 'block',
    position: 'absolute',
    top,
    left,
  };
}
