import React, { useRef, useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'
import { TodoContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ModalContext } from '../contexts/modalProvider';
import { ModalContextType } from "../interfaces/types";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';

const AddModal = () => {



    const { addTodo } = useContext(TodoContext) as TodoContextType;
    const { addOpen, handleAddOpen } = useContext(ModalContext) as ModalContextType;
    const dialog = useRef<HTMLDialogElement | null>(null);
    useEffect(() => { addOpen ? dialog.current?.showModal() : dialog.current?.close(); }, [addOpen])

    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = {
            title: (e.currentTarget.elements[0] as HTMLInputElement).value,
            status: (e.currentTarget.elements[1] as HTMLSelectElement).value === "true" ? true : false,
            description: (e.currentTarget.elements[2] as HTMLTextAreaElement).value,
            id: uuidv4(4),
            date: new Date().toLocaleString()
        }
        addTodo(todo);
        handleAddOpen();
    }


    return createPortal(
        <dialog className='bg-inherit outline-none  ' ref={dialog} >
            <ClickAwayListener onClickAway={() => handleAddOpen()}>
                <div className='shadow-xl'>
                    <div className='flex justify-between px-2'>
                        <h1 className='text-2xl font-bold'>Add todo</h1>
                        <button onClick={() => handleAddOpen()} className='outline-none'><IoMdClose size={25} /></button>
                    </div>

                    <form className='w-[25rem] h-[22rem] bg-blue-200 rounded-xl p-4 flex flex-col items-center gap-y-4 ' onSubmit={handleAddTodo} >

                        <input className='w-80 h-8 p-1 rounded outline-none' type="text" id='title' maxLength={50} required />
                        <select className='w-80 h-8 rounded p-1 outline-none' id="select">
                            <option value="false">Incomplete</option>
                            <option value="true">Complete</option>
                        </select>

                        <textarea className='w-80 h-32 pointer-events-auto outline-none resize-none p-1' id="description" maxLength={180}  ></textarea>
                        <button type='submit' className='w-20 h-8 bg-blue-800'>Click</button>
                    </form>
                </div>
            </ClickAwayListener>
        </dialog>
        ,
        document.getElementById("modal") as HTMLElement
    )
}

export default AddModal