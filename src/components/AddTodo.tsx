import React, { useState, useContext } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";


import { ModalContextType } from "../interfaces/types";
import { ModalContext } from '../contexts/modalProvider';


import AddModal from "./AddModal";

const AddTodo = ({ onChange }: { onChange: (e: string) => void }) => {
    

    const { addOpen,handleAddOpen } = useContext(ModalContext) as ModalContextType;

    const [filtration, setFiltration] = useState("all");



    


    return (
        <>
            <div className='flex w-2/4 px-10 py-10 justify-between items-center max-[1024px]:w-full max-[600px]:px-2'>
                <div className='flex items-center cursor-pointer' onClick={()=>handleAddOpen()} >
                    <FaRegPlusSquare size={40} />
                    <h1>Add Task</h1>
                </div>
                <div >
                    <select className='w-40  rounded p-2 outline-none border-2' value={filtration} onChange={e => { setFiltration(e.target.value); onChange(e.target.value) }} id="select">
                        <option value="all">All</option>
                        <option value="false">Incomplete</option>
                        <option value="true">Complete</option>
                    </select>
                </div>
            </div>

            {addOpen&&
            <AddModal />}

        </>
    )
}

export default AddTodo




