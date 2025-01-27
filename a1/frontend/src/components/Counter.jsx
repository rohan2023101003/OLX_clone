import React from 'react'
import { useState } from 'react'
const Counter = () => {
    const[count, setCount] = useState(0)
  return (
    <div className='counter-container'>
      <button id='btn' onClick={()=> {setCount(count+1)}}>{count}</button>
    </div>
  )
}

export default Counter
