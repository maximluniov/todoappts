import React, { useRef, useEffect, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { TodoContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ModalContext } from '../contexts/modalProvider';
import { ModalContextType } from "../interfaces/types";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';

import { CiCircleInfo } from "react-icons/ci";

const AddModal = () => {



    const { addTodo } = useContext(TodoContext) as TodoContextType;
    const { addOpen, handleAddOpen } = useContext(ModalContext) as ModalContextType;
    const dialog = useRef<HTMLDialogElement | null>(null);
    useEffect(() => { addOpen ? dialog.current?.showModal() : dialog.current?.close(); }, [addOpen])
    const [error, setError] = useState(false);

    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ((e.currentTarget.elements[0] as HTMLInputElement).value === "") {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
        } else {

            if ((e.currentTarget.elements[2] as HTMLTextAreaElement).value === "") { (e.currentTarget.elements[2] as HTMLTextAreaElement).value = "No description" }

            const todo = {
                title: (e.currentTarget.elements[0] as HTMLInputElement).value,
                status: (e.currentTarget.elements[1] as HTMLSelectElement).value === "true" ? true : false,
                description: (e.currentTarget.elements[2] as HTMLTextAreaElement).value,
                id: uuidv4(4),
                date: new Date().toLocaleString()
            }
            addTodo(todo);
            handleAddOpen();

            setError(false);
        }
    }


    return createPortal(
        <dialog className='bg-inherit z-10' ref={dialog} >
            <ClickAwayListener onClickAway={() => handleAddOpen()}>

                <div className='shadow-xl appearance'>
                    <div className='flex justify-between px-2'>
                        <h1 className='text-2xl font-bold'>Add todo</h1>
                        <button onClick={() => handleAddOpen()} className=' scaled'><IoMdClose size={25} /></button>
                    </div>
                    {error && <div className='absolute w-full flex justify-center items-center'>
                        <p className='text-center appearance text-red-600 mt-1 w-3/4 flex items-center gap-y-2 justify-center'><CiCircleInfo />Title is empty!</p></div>}
                    <form className='w-[25rem] h-[22rem] bg-gray-300 rounded-xl p-4 flex flex-col items-center gap-y-4 py-10 max-[600px]:w-full' onSubmit={handleAddTodo} >

                        <input className='w-80 h-8 p-1 rounded' type="text" id='title' maxLength={50} placeholder='Title' />
                        <select className='w-80 h-8 rounded p-1' id="select">
                            <option value="false">Incomplete</option>
                            <option value="true">Complete</option>
                        </select>

                        <textarea className='w-80 h-32 pointer-events-auto  resize-none p-1' id="description" maxLength={180} placeholder='Description' ></textarea>
                        <button type='submit' className='w-20 h-8 bg-white scaled rounded '>Confirm</button>
                    </form>
                </div>
            </ClickAwayListener>
        </dialog>
        ,
        document.getElementById("modal") as HTMLElement
    )
}

export default AddModal