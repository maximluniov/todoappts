import React, { useContext, useEffect, useState } from 'react'
import { TodoContextType, ITodos } from '../interfaces/types';
import { TodoContext } from '../contexts/todoProvider';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { CgSmileSad } from "react-icons/cg";
import Modal from './Modal';


// type Filtr = "all"| true | false ;

interface Filtr{
  filtration:"all"| true | false
}


const Tasks = ({filtration}:Filtr) => {


  const { todos, updateTodo, deleteTodo } = useContext(TodoContext) as TodoContextType;




  // const [params,setParams]=useState("all");

  // useEffect(()=>{
  //   console.log(filtration)
  // },[filtration]);

  const [tasks, setTasks] = useState(todos)
  useEffect(() => {
    setTasks(todos);
    // console.log(todos)
  }, [todos])

  const [open, setOpen] = useState(false)

  const [input,setInput]=useState("");
  const [select,setSelect]=useState("");
  const [description,setDescription]=useState("");

  const handleModal = (todo:ITodos) =>{
    setInput(todo.title);
    setSelect(todo.status? "true" : "false" );
    setDescription(todo.description);
    setOpen(true);
  }

  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>,todo:ITodos) => {
    e.preventDefault();
        const updatedTodo = {
            title: (e.currentTarget.elements[0] as HTMLInputElement).value,
            status: (e.currentTarget.elements[1] as HTMLSelectElement).value ==="true" ? true : false ,
            description: (e.currentTarget.elements[2] as HTMLTextAreaElement).value,
            id:todo.id
        }
        console.log(updatedTodo);
        updateTodo(updatedTodo);
        setOpen(false);
  }


  return (
    <>
      <div className='flex flex-col w-2/5 p-8 gap-y-4 ' >
        {    tasks.filter((todo)=>{ if(filtration==="all"){return true}else{return filtration === todo.status} }).length>0 ?
        
        
        
        tasks.filter((todo)=>{ if(filtration==="all"){return true}else{return filtration === todo.status} }).map((todo) => (<div key={todo.id}>

          <div  className='flex w-full bg-zinc-200 h-16  items-center py-2 rounded-sm justify-between px-4 ' >
            <div className='flex items-center'>
              <div className='mr-4 cursor-pointer' onClick={() => { todo.status = !todo.status; updateTodo(todo) }}>{todo.status ? 
              <ImCheckboxChecked size={20} color='black' /> : 
              <ImCheckboxUnchecked size={20} />}</div>
              <div>{todo.title}</div>
            </div>
            <div className='flex gap-x-4 items-center'>
              <div className='cursor-pointer' onClick={() => handleModal(todo)}><MdEdit size={20} /></div>
              <div className='cursor-pointer' onClick={() => deleteTodo(todo)}><FaTrash  size={18}/></div>
            </div>

          </div>
          <Modal  open={open}>
            <h1>Update todo</h1>
            <form className='w-[25rem] h-[22rem] bg-blue-200 rounded-xl p-4 flex flex-col items-center gap-y-4' onSubmit={(e)=>handleUpdateTodo(e,todo)} >

              <input className='w-80 h-8 p-1 rounded outline-none' value={input} onChange={(e)=>setInput(e.target.value)} type="text" id='title' maxLength={50} required />
              <select className='w-80 h-8 rounded p-1 outline-none' value={select} onChange={(e)=>setSelect(e.target.value)} id="select">
                <option value="false">Incomplete</option>
                <option value="true">Complete</option>
              </select>

              <textarea value={description} className='w-80 h-32 pointer-events-auto outline-none resize-none p-1' id="description" onChange={(e)=>setDescription(e.target.value)} maxLength={(40 * 4) + 20}  ></textarea>
              <button type='submit' className='w-20 h-8 bg-blue-800'>Click</button>
            </form>
          </Modal>
        </div>)):<div className='flex w-full bg-zinc-200 h-16  items-center py-2 rounded-sm justify-center px-4'>No todos yet <CgSmileSad size={25} /> </div>
        }

      </div>

    </>
  )
}

export default Tasks