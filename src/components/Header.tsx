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
    <div className='flex w-full bg-gray-200 p-8 justify-between'>
        <h1 className='text-3xl font-bold '>TODO APP</h1>
        <div>{time}</div>
    </div>
  )
}

export default Header