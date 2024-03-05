export interface ITodos {
    id: number;
  title: string;
  description: string;
  status: boolean;
  date: string;
}

export type TodoContextType = {
    todos: ITodos[];
    updateTodo: (todo: ITodos) => void;
    addTodo: (todo: ITodos) => void;
    deleteTodo: (todo: ITodos) => void;
    loading:boolean;
  };
  
export type ModalContextType = {
  updateOpen:boolean,
  addOpen:boolean,
    handleAddOpen:()=>void;
    handleUpdateClose:()=>void;
    todo:ITodos;
    handleUpdateModal:(todo:ITodos)=>void;
  };


