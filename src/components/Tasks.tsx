import React, { useContext, useEffect, useState } from 'react'
import { TodoContextType, ModalContextType } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { CgSmileSad } from "react-icons/cg";
import { ModalContext } from '../contexts/modalProvider';
import UpdateModal from './UpdateModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Filtr {
  filtration: "all" | true | false
}

const Tasks = ({ filtration }: Filtr) => {

  const { todos, updateTodo, deleteTodo, loading } = useContext(TodoContext) as TodoContextType;
  const { updateOpen, handleUpdateModal } = useContext(ModalContext) as ModalContextType;

  const [tasks, setTasks] = useState(todos)
  useEffect(() => {
    setTasks(todos);
  }, [todos])

  const removeClassById = (id: string) => {
    const el = document.getElementById(id);
    if (el && window.screen.width>=1024) {
      if (el.classList.contains('hidden')) {
        el.classList.remove('animating-box-hide')
        el.classList.remove('hidden');
        el.classList.add('animating-box-show');
        el.classList.add('flex');

      }
      else {
        el.classList.remove('animating-box-show')
        el.classList.add('animating-box-hide')
        setTimeout(() => {
          el.classList.remove('flex');
          el.classList.add('hidden');
        }, 1000)
      }
    }
    else if(el){
      if (el.classList.contains('hidden')) {
        el.classList.remove('animating-box-hide')
        el.classList.remove('hidden');
        el.classList.add('animating-box-show');
        el.classList.add('flex');

      }
      else {
        el.classList.remove('animating-box-show')
        el.classList.add('animating-box-hide')
          el.classList.remove('flex');
          el.classList.add('hidden'); 
      }
    }
    }
  

  const style = {
    textDecorationLine: "line-through"
  }

  useEffect(() => {

  }, [])

  return (

    <div className='flex flex-col w-full items-center p-8 gap-y-4 max-[600px]:px-2' >
      {loading && <div className='flex items-center'>Loading<AiOutlineLoading3Quarters className='animate-spin' /> </div>}
      {!loading && (tasks.filter((todo) => { if (filtration === "all") { return true } else { return filtration === todo.status } }).length > 0 ?



        tasks.sort((a, b) => {
          return a.date.localeCompare(b.date);
        }).filter((todo) => { if (filtration === "all") { return true } else { return filtration === todo.status } }).map((todo, index) => (
          <div style={todo.status ? style : { textDecoration: "none" }} className='flex flex-col w-2/4 move-up animating-box-show max-[1024px]:w-full' key={todo.id}>
            <div className='flex  bg-zinc-200 h-16  items-center py-2 rounded-sm justify-between px-4 z-10 shadow-md '   >
              <div className='flex items-center'>
                <div className='mr-4 cursor-pointer' onClick={() => { todo.status = !todo.status; updateTodo(todo) }}>{todo.status ?
                  <ImCheckboxChecked size={20} color='black' /> :
                  <ImCheckboxUnchecked size={20} />}</div>
                <div >{todo.title}</div>
              </div>

              <button onClick={() => removeClassById(`${index}`)} className='flex w-full h-full '>

              </button>

              <div className='flex gap-x-4 items-center' >
                <div className='cursor-pointer' onClick={() => handleUpdateModal(todo)}><MdEdit size={20} /></div>
                <div className='cursor-pointer' onClick={() => deleteTodo(todo)}><FaTrash size={18} /></div>
              </div>
            </div>
            <div onClick={() => removeClassById(`${index}`)} id={`${index}`}
              className='hidden min-h-20 bg-zinc-300 rounded-b-lg cursor-pointer  items-center py-2 rounded-sm justify-between px-4 max-[600px]:flex-col ' >
              <div className='break-words w-4/5 max-[600px]:w-full'>
                {todo.description}
              </div>
              <div className='break-normal w-1/5 text-end max-[600px]:w-full'>
                {todo.date}
              </div>
            </div>

          </div>


        )) : <div className='flex w-2/4 bg-zinc-200 h-16  items-center py-2 rounded-sm justify-center px-4'>No todos yet <CgSmileSad size={25} /> </div>)
      }
      {updateOpen &&
        <UpdateModal />}
    </div>


  )
}

export default Tasks