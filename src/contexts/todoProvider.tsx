import React, { useState, useCallback, createContext, useEffect } from "react";
import { ITodos, TodoContextType } from "../interfaces/types";
import axios, { AxiosError } from 'axios'
// import { error } from "console";


export const TodoContext = createContext<TodoContextType | null>(null);




const TodoProvider:React.FC<{children: React.ReactNode }> = ({ children }) => {

  const [todos, setTodos] = useState<ITodos[]>([]);

  const fetchTodos = useCallback(async () => {
    const res = await axios.get<ITodos[]>("http://localhost:4000/todos");
    // console.log(res.data);
    setTodos(res.data);
  }, []);


  const addTodo = async (todo: ITodos) => {
      await axios.post<ITodos[]>("http://localhost:4000/todos", todo).catch((e: AxiosError) => { // really AxiosError?
      console.log(e.message);
  } )
  fetchTodos()
  }

  const updateTodo = async (todo: ITodos) =>{

      todo.status = !todo.status


    await axios.patch<ITodos[]>(`http://localhost:4000/todos/${todo.id}`, todo).catch((e: AxiosError) => { // really AxiosError?
    console.log(e.message);
    
  })
  fetchTodos()
}




  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodoContext.Provider value={{ todos ,addTodo ,updateTodo}}>
      {children}
      </TodoContext.Provider>
  );
  };

export default TodoProvider;