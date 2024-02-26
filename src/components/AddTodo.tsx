import React, { useState,useContext } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { TodoContextType  } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { v4 as uuidv4 } from 'uuid';

import Modal from "./Modal";

const AddTodo = () => {

    const { addTodo } = useContext(TodoContext) as TodoContextType;

    const [open, setOpen] = useState(false);

    


   const handleAddTodo = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const todo = {
            title: (e.currentTarget.elements[0] as HTMLInputElement).value,
            status: (e.currentTarget.elements[1] as HTMLSelectElement).value ==="true" ? true : false ,
            description: (e.currentTarget.elements[2] as HTMLTextAreaElement).value,
            id:uuidv4(4)
        }
        console.log(todo)
        addTodo(todo)

    }


    return (
        <>
            <div className='flex w-full px-40 py-10'>
                <div className='flex items-center cursor-pointer' onClick={()=>setOpen(true)} >
                    <FaRegPlusSquare size={40} />
                    <h1>Add Task</h1>
                </div>
            </div>
            <Modal open={open}>
            <h1>Add todo</h1>
                <form className='w-[25rem] h-[22rem] bg-blue-200 rounded-xl p-4 flex flex-col items-center gap-y-4' onSubmit={ handleAddTodo} >
                    
                    <input  className='w-80 h-8 p-1 rounded outline-none' type="text" id='title' maxLength={50} required/>
                    <select className='w-80 h-8 rounded p-1 outline-none'   id="select">
                        <option value="false">Incomplete</option>
                        <option value="true">Complete</option>
                    </select>

                    <textarea className='w-80 h-32 pointer-events-auto outline-none resize-none p-1' id="description" maxLength={(40*4)+20}  ></textarea>
                    <button type='submit' className='w-20 h-8 bg-blue-800'>Click</button>
                </form>
            </Modal>
        </>
    )
}

export default AddTodo


// onClick={() => addTodo({
//     id: 3,
//     title: 'post 3',
//     description: 'this is a description',
//     status: false,
// })} 