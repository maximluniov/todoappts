import React, { useState,  createContext} from "react";
import { ModalContextType } from "../interfaces/types";
import { ITodos } from "../interfaces/types";

export const ModalContext = createContext<ModalContextType|null>(null);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [addOpen,setAddOpen] = useState(false)
    const [updateOpen,setUpdateOpen] = useState(false)
    const [todo,setTodo] = useState<ITodos>({title:"",date:"",description:"",status:false,id:-1});
    
    const handleAddOpen = () =>{
      setAddOpen(prev => !prev)
    }

    const handleUpdateModal = (todo:ITodos) =>{
      setTodo(todo);
      setUpdateOpen(true);
    }

    const handleUpdateClose = () =>{
      setUpdateOpen(false);
    }

  return (
    <ModalContext.Provider value={{addOpen,updateOpen,handleAddOpen,handleUpdateClose,todo,handleUpdateModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;