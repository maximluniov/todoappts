import React, { useState, useCallback, createContext, useEffect } from "react";
import { ITodos, TodoContextType } from "../interfaces/types";
import axios, { AxiosError } from 'axios'


export const TodoContext = createContext<TodoContextType | null>(null);

const url = "https://databasefortodoapp.onrender.com/todos"


const TodoProvider:React.FC<{children: React.ReactNode }> = ({ children }) => {

  const [todos, setTodos] = useState<ITodos[]>([]);

  const fetchTodos = useCallback(async () => {
    const res = await axios.get<ITodos[]>(url);
    // console.log(res.data);
    setTodos(res.data);
  }, []);


  const addTodo = async (todo: ITodos) => {
      await axios.post<ITodos[]>(url, todo).catch((e: AxiosError) => { // really AxiosError?
      console.log(e.message);
  } )
  fetchTodos()
  }

  const updateTodo = async (todo: ITodos) =>{

      // todo.status = !todo.status


    await axios.patch<ITodos[]>(`${url}/${todo.id}`, todo).catch((e: AxiosError) => { // really AxiosError?
    console.log(e.message);
    
  })
  fetchTodos()
}

  const deleteTodo = async (todo: ITodos) =>{
    await axios.delete<ITodos[]>(`https://databasefortodoapp.onrender.com/todos/${todo.id}`).catch((e: AxiosError) => { // really AxiosError?
    console.log(e.message);
    function hideDiv(): void {
      const myDiv: HTMLElement | null = document.getElementById("myDiv");
    
      if (myDiv) {
        myDiv.classList.remove("disappear");
        myDiv.classList.add("disappear-animation", "my-animation");
      }
    }
    hideDiv();    
  })
  fetchTodos()
}




  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodoContext.Provider value={{ todos ,addTodo ,updateTodo,deleteTodo}}>
      {children}
      </TodoContext.Provider>
  );
  };

export default TodoProvider;