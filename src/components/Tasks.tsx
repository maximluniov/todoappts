import React, {useContext, useEffect, useState} from 'react'
import { TodoContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const Tasks = () => {

    const { todos ,updateTodo } = useContext(TodoContext) as TodoContextType;

    const [tasks,setTasks] = useState(todos)
    useEffect(()=>{
        setTasks(todos);
// console.log(todos)
    },[todos])


      


  return (
    <div className='flex flex-col w-2/5 p-8 gap-y-4 ' >
        {tasks.map((todo)=>(<div key={todo.id} className='flex w-full bg-zinc-200 h-16  items-center p-2 rounded-sm'>
              <div className='mr-4 cursor-pointer' onClick={()=> updateTodo(todo) }>{todo.status ? <ImCheckboxChecked   color='black' /> : <ImCheckboxUnchecked />}</div>
              <div>{todo.title}</div>

        </div> ))

        }

    </div>
  )
}

export default Tasks