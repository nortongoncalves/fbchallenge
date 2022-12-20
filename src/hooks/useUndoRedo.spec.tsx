import { fireEvent, render, screen } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useUndoRedo } from "./useUndoRedo";

type DataType = {
  value: string,
};

describe('useUndoRedo', () => {
  it('should return the informed array without the last element when executing the undo method', () => {
    const datas: DataType[] = [
      {
        value: 'one',
      },
      {
        value: 'two'
      }
    ];

    const MockApp: React.FC<{datas: DataType[]}> = ({ datas }) => {
      const [mockData, setMockData] = useState<DataType[]>(datas);
      const { undo } = useUndoRedo<DataType>();

      useEffect(() => {
        setMockData(undo(mockData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (<main>{mockData.map(data => data.value).toString()}</main>);
    };
    render(<MockApp datas={datas}/>);
    const element = screen.getByText('one');
    expect(element).toBeTruthy();
  });

  it('should execute the getStack method and return the stack with length 0', () => {
    const datas: DataType[] = [
      {
        value: 'one',
      },
      {
        value: 'two'
      }
    ];

    const MockApp: React.FC<{datas: DataType[]}> = ({ datas }) => {
      const { getStack } = useUndoRedo<DataType>();
      return (<main>{getStack().length}</main>);
    };

    render(<MockApp datas={datas}/>);
    const element = screen.getByText('0');
    expect(element).toBeTruthy();
  });

  it('should execute the undo method and return the last informed data in stack', () => {
    const datas: DataType[] = [
      {
        value: 'one',
      },
      {
        value: 'two'
      }
    ];

    const MockApp: React.FC<{datas: DataType[]}> = ({ datas }) => {
      const { undo, getStack } = useUndoRedo<DataType>();

      useEffect(() => {
        undo(datas);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (<main>{getStack().map(data => data.value).toString()}</main>);
    };

    render(<MockApp datas={datas}/>);
    const element = screen.getByText('two');
    expect(element).toBeTruthy();
  });

  it('should execute the undo method more redo and return the initial datas', () => {
    const datas: DataType[] = [
      {
        value: 'one',
      },
      {
        value: 'two'
      }
    ];

    const MockApp: React.FC<{datas: DataType[]}> = ({ datas }) => {
      const [mockData, setMockData] = useState<DataType[]>(datas);
      const { undo, redo } = useUndoRedo<DataType>();

      useEffect(() => {
        setMockData(undo(mockData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      function handleOnClick() {
        setMockData(redo(mockData));
      }

      return (<main data-testid="main_test_id" onClick={handleOnClick}>{mockData.map(data => data.value).toString()}</main>);
    };

    render(<MockApp datas={datas}/>);
    const element = screen.getByTestId('main_test_id');
    fireEvent.click(element);

    expect(screen.getByText('one,two')).toBeTruthy();
  });

  it('should execute the redo method with empty stack and not throw error the app', () => {
    const datas: DataType[] = [
      {
        value: 'one',
      },
      {
        value: 'two'
      }
    ];

    const MockApp: React.FC<{datas: DataType[]}> = ({ datas }) => {
      const [mockData, setMockData] = useState<DataType[]>(datas);
      const { redo } = useUndoRedo<DataType>();

      useEffect(() => {
        setMockData(redo(mockData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (<main>{mockData.map(data => data.value).toString()}</main>);
    };

    render(<MockApp datas={datas}/>);
    const element = screen.getByText('one,two');
    expect(element).toBeTruthy();
  });

  it('should execute the undo method with empty mockData and not throw error the app and return a array.length equal 0', () => {
    const MockApp = () => {
      const [mockData, setMockData] = useState<DataType[]>([]);
      const { undo } = useUndoRedo<DataType>();

      useEffect(() => {
        setMockData(undo(mockData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (<main>{mockData.length}</main>);
    };

    render(<MockApp />);
    const element = screen.getByText('0');
    expect(element).toBeTruthy();
  });

  it('should execute the undo method with clearStack and must return the stack.length equal 0', () => {
    const datas: DataType[] = [
      {
        value: 'one',
      },
      {
        value: 'two'
      }
    ];

    const MockApp: React.FC<{datas: DataType[]}> = ({ datas }) => {
      const { undo, getStack, clearStack } = useUndoRedo<DataType>();

      useEffect(() => {
        undo(datas);
        clearStack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (<main>{getStack().length}</main>);
    };

    render(<MockApp datas={datas}/>);
    const element = screen.getByText('0');
    expect(element).toBeTruthy();
  });
});
