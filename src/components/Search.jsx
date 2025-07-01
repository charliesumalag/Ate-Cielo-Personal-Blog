import React, { useState, useEffect, useRef } from 'react'
import { useSearch } from "../context/SearchContext";

const Search = () => {

  const [isInputOpen, setIsInputOpen] = useState(false);
  const {setSearchInput} = useSearch();
   const inputRef = useRef(null);



    useEffect(() => {
    if (isInputOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputOpen]);

  const handleInputOpen = () => {
    setIsInputOpen((prev) => !prev);
  }

  const handleInputValue = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  }
  return (
    <div className='flex items-center mx-1  relative'>
      {isInputOpen && <input ref={inputRef} type="text" placeholder='Search' onChange={handleInputValue}  className={`text-left text-sm px-2 py-1 mr-2
          transition-opacity duration-[3000ms] absolute top-0 right-2  ease-in-out
          ${isInputOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          border border-none focus:outline-none rounded`} />}
      <i className="fa-solid fa-magnifying-glass hover:cursor-pointer text-gray-600 text-sm" onClick={handleInputOpen}></i>
    </div>
  )
}

export default Search
