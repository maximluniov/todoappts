import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'





const Modal = ({open,children}:{open:boolean, children: React.ReactNode}) => {

    const dialog = useRef<HTMLDialogElement | null>(null);
    useEffect(() => { open ? dialog.current?.showModal() : dialog.current?.close(); }, [open])

    

    return createPortal(
        <dialog className='bg-inherit outline-none shadow-xl' ref={dialog} >{children}</dialog>,
        document.getElementById("modal") as HTMLElement
    )
}

export default Modal