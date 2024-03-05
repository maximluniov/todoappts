import React, { useRef, useEffect, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { TodoContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ModalContext } from '../contexts/modalProvider';
import { ModalContextType } from "../interfaces/types";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { IoMdClose } from "react-icons/io";
import { ITodos } from '../interfaces/types';
import { CiCircleInfo } from "react-icons/ci";

const UpdateModal = () => {


    const { updateTodo } = useContext(TodoContext) as TodoContextType;
    const [error, setError] = useState(false);

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
        if ((e.currentTarget.elements[0] as HTMLInputElement).value === "") {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
        } else {

            if ((e.currentTarget.elements[2] as HTMLTextAreaElement).value === "") { (e.currentTarget.elements[2] as HTMLTextAreaElement).value = "No description" }
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
    }


    return createPortal(
        <dialog className="bg-inherit" ref={dialog} >
            <ClickAwayListener onClickAway={handleUpdateClose}>
                <div className='shadow-xl appearance'>
                    <div className='flex justify-between px-2'>
                        <h1 className='text-2xl font-bold'>Update todo</h1>
                        <button className='scaled' onClick={() => handleUpdateClose()}><IoMdClose size={25} /></button>
                    </div>
                    {error && <div className='absolute w-full flex justify-center items-center'>
                        <p className='text-center appearance text-red-600 mt-1 w-3/4 flex items-center gap-y-2 justify-center'><CiCircleInfo />Title is empty!</p></div>}

                    <form className='w-[25rem] h-[22rem] bg-gray-300 rounded-xl p-4 flex flex-col items-center gap-y-4 py-10 max-[600px]:w-full' onSubmit={(e) => handleUpdateTodo(e, todo)}  >

                        <input className='w-80 h-8 p-1 rounded outline-none' value={input} onChange={(e) => setInput(e.target.value)} type="text" id='title' maxLength={50} required />
                        <select className='w-80 h-8 rounded p-1 outline-none' value={status} onChange={e => setStatus(e.target.value)} id="select">
                            <option value="false">Incomplete</option>
                            <option value="true">Complete</option>
                        </select>

                        <textarea className='w-80 h-32 pointer-events-auto resize-none p-1' id="description"
                            value={description} onChange={e => setDescription(e.target.value)} maxLength={150}  ></textarea>
                        <button type='submit' className='w-20 h-8 bg-white scaled rounded'>Save</button>
                    </form>
                </div>
            </ClickAwayListener>
        </dialog>

        ,
        document.getElementById("secondmodal") as HTMLElement
    )
}

export default UpdateModal