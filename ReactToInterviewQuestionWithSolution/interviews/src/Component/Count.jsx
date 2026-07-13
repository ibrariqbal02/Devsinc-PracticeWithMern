import React, { useState } from 'react'

const Count = React.memo(({name}) => {

   console.log("Rerender")
    const [count , setCount] = useState(0)

    const increaseCount = ()=>{
        // setCount(count + 1)
        setCount((c)=>c+1)
        setCount((c)=>c+1)
    }
  return (
   <>
    <p>This is an Example of Virtual Dom</p>
  <ul>
    <li>it is not copy of Atctual Dom</li>
    <li>It is a Samplify version of Dom </li>
    <li>It's Allow Efficient Update of UI By Comparing the real Dom</li>    
    </ul> 

      <h3>Example </h3>
    <p>The value of Count is {count}{name}</p>   
    <button onClick={increaseCount}>Click me</button>
   </>
  )
})

export default Count