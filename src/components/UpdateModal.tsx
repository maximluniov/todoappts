import React, { useRef, useEffect, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { TodoContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ModalContext } from '../contexts/modalProvider';
import { ModalContextType } from "../interfaces/types";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { IoMdClose } from "react-icons/io";
import { ITodos } from '../interfaces/types';

const UpdateModal = () => {


    const { updateTodo } = useContext(TodoContext) as TodoContextType;

    const { updateOpen, handleUpdateClose, todo } = useContext(ModalContext) as ModalContextType;
    const dialog = useRef<HTMLDialogElement | null>(null);

    useEffect(() => { updateOpen ? dialog.current?.showModal() : dialog.current?.close(); }, [updateOpen])

    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("false");

    useEffect(() => {
        setInput(todo.title);
        setDescription(todo.description);
        setStatus(todo.status ? "true" : "false")
    }, [todo])

    const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>, todo: ITodos) => {
        e.preventDefault();
        const updatedTodo = {
            title: (e.currentTarget.elements[0] as HTMLInputElement).value,
            status: (e.currentTarget.elements[1] as HTMLSelectElement).value === "true" ? true : false,
            description: (e.currentTarget.elements[2] as HTMLTextAreaElement).value,
            id: todo.id,
            date: todo.date
        }
        updateTodo(updatedTodo);
        handleUpdateClose();
    }


    return createPortal(
        <dialog className='bg-inherit outline-none  ' ref={dialog} >
            <ClickAwayListener onClickAway={handleUpdateClose}>
                <div className='shadow-xl'>
                    <div className='flex justify-between px-2'>
                        <h1 className='text-2xl font-bold'>Update todo</h1>
                        <button className='outline-none' onClick={() => handleUpdateClose()}><IoMdClose size={25} /></button>
                    </div>

                    <form className='w-[25rem] h-[22rem] bg-blue-200 rounded-xl p-4 flex flex-col items-center gap-y-4' onSubmit={(e) => handleUpdateTodo(e, todo)}  >

                        <input className='w-80 h-8 p-1 rounded outline-none' value={input} onChange={(e) => setInput(e.target.value)} type="text" id='title' maxLength={50} required />
                        <select className='w-80 h-8 rounded p-1 outline-none' value={status} onChange={e => setStatus(e.target.value)} id="select">
                            <option value="false">Incomplete</option>
                            <option value="true">Complete</option>
                        </select>

                        <textarea className='w-80 h-32 pointer-events-auto outline-none resize-none p-1' id="description"
                            value={description} onChange={e => setDescription(e.target.value)} maxLength={180}  ></textarea>
                        <button type='submit' className='w-20 h-8 bg-blue-800'>Click</button>
                    </form>
                </div>
            </ClickAwayListener>
        </dialog>

        ,
        document.getElementById("secondmodal") as HTMLElement
    )
}

export default UpdateModal