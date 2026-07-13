import React, { useRef } from 'react'

const UnControl = () => {
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" defaultValue="" ref={inputRef} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default UnControl