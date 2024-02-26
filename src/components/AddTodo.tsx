import React, { useState, useContext } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { TodoContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { v4 as uuidv4 } from 'uuid';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import { InputLabel, Select, MenuItem } from '@mui/material';


import Modal from "./Modal";

const AddTodo = ({onChange}: {onChange:(e:string)=>void}) => {

    const { addTodo } = useContext(TodoContext) as TodoContextType;

    const [open, setOpen] = useState(false);

    const [filtration,setFiltration]= useState("all");



    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = {
            title: (e.currentTarget.elements[0] as HTMLInputElement).value,
            status: (e.currentTarget.elements[1] as HTMLSelectElement).value === "true" ? true : false,
            description: (e.currentTarget.elements[2] as HTMLTextAreaElement).value,
            id: uuidv4(4)
        }
        // console.log(todo)
        addTodo(todo);
        setOpen(false);
    }


    return (
        <>
            <div className='flex w-2/5 px-10 py-10 justify-between items-center'>
                <div className='flex items-center cursor-pointer' onClick={() => setOpen(true)} >
                    <FaRegPlusSquare size={40} />
                    <h1>Add Task</h1>
                </div>
                <div >
                <select className='w-40  rounded p-2 outline-none border-2' value={filtration} onChange={e=>{setFiltration(e.target.value);onChange(e.target.value)  }}  id="select">
                        <option value="all">All</option>
                        <option value="false">Incomplete</option>
                        <option value="true">Complete</option>
                    </select>
                </div>
            </div>
            <Modal open={open}>
                <h1>Add todo</h1>
                <form className='w-[25rem] h-[22rem] bg-blue-200 rounded-xl p-4 flex flex-col items-center gap-y-4' onSubmit={handleAddTodo} >

                    <input className='w-80 h-8 p-1 rounded outline-none' type="text" id='title' maxLength={50} required />
                    <select className='w-80 h-8 rounded p-1 outline-none' id="select">
                        <option value="false">Incomplete</option>
                        <option value="true">Complete</option>
                    </select>

                    <textarea className='w-80 h-32 pointer-events-auto outline-none resize-none p-1' id="description" maxLength={180}  ></textarea>
                    <button type='submit' className='w-20 h-8 bg-blue-800'>Click</button>
                </form>
            </Modal>
        </>
    )
}

export default AddTodo




