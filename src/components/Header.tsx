import React, { useEffect ,useState} from 'react'

const Header = () => {
  
  const [time,setTime] = useState(new Date().toLocaleTimeString()); 

  useEffect(()=>{
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  },[]);
  
  
  
  return (
    <div className='flex w-full items-center bg-gray-200 px-8 py-5 justify-between shadow-md max-[600px]:py-2 max-[600px]:px-4'>
        <h1 className='text-3xl font-bold '>TODO APP</h1>
        <div>{time}</div>
    </div>
  )
}

export default Header