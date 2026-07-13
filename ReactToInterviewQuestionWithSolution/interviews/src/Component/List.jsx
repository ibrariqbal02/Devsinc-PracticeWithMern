import React from 'react'

function List() {

    const person = [
        // {id:1, name : "Ali"},
        {id:2,name:"Aslam"},
        {id:3,name:"Noor"},
        {id:4,name:"Safi"},
        {id:4,name:"Safi"},
        {id:4,name:"Safi"},
        {id:4,name:"Safi"},

    ]
  return (
   <>
   <p>This is the Example of Map and also informtion </p>

   <ul>
    {
        person.map((person)=>(
            <li key={person.id} > {person.id} Name: {person.name}</li>
        ))
    }
   </ul>
   
   
   
   </>
  )
}

export default List