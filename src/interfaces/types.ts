export interface ITodos {
    id: number;
  title: string;
  description: string;
  status: boolean;
}

export type TodoContextType = {
    todos: ITodos[];
    updateTodo: (todo: ITodos) => void;
    addTodo: (todo: ITodos) => void;
    deleteTodo: (todo: ITodos) => void;
  };