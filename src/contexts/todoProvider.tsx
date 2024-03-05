import React, { useState, useCallback, createContext, useEffect} from "react";
import { ITodos, TodoContextType } from "../interfaces/types";
import axios, { AxiosError } from 'axios'
export const TodoContext = createContext<TodoContextType | null>(null);

const url = "https://databasefortodoapp.onrender.com/todos?_sort=date"
const urlBase = "https://databasefortodoapp.onrender.com/todos"


const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  const [todos, setTodos] = useState<ITodos[]>([]);
  const [loading,setLoading] = useState(false);
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const res = await axios.get<ITodos[]>(url);
    setTodos(res.data);
    setLoading(false);
  }, []);


  const addTodo = async (todo: ITodos) => {
    setTodos(prev => [...prev, todo])
    await axios.post<ITodos[]>(urlBase, todo).catch((e: AxiosError) => {
    })
  }

  const updateTodo = async (todo: ITodos) => {
    todos.map((item) => {
      if (item.id === todo.id) {
        const updatedTodos = todos.filter((item) => !(item.id === todo.id))
        setTodos([...updatedTodos, todo]);
      } return true;
    })

    await axios.patch<ITodos[]>(`${urlBase}/${todo.id}`, todo).catch((e: AxiosError) => {
      console.log(e.message);

    })

  }

  const deleteTodo = async (todo: ITodos) => {
    setTodos(prev => prev.filter((item) => !(item.id === todo.id)))

    await axios.delete<ITodos[]>(`${urlBase}/${todo.id}`).catch((e: AxiosError) => {
      console.log(e.message);
    })
  }




  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo ,loading}}>

      {children}

    </TodoContext.Provider>
  );
};

export default TodoProvider;