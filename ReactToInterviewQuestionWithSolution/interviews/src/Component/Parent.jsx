import React, { useState } from 'react'

const Parent = () => {
   const [counter, setCounter] = useState(0);


  return (
    <div>
      <Child1 counter={counter} />
      <Child2 setCounter={setCounter} />
      
    </div>
  );
};

const Child1 = ({ counter }) => <h1>{counter}</h1>;
const Child2 = ({ setCounter }) => (
  <button onClick={() => setCounter((prev) => prev + 1)}>Increment</button>

 

);


export default Parent