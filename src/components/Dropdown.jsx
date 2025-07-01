import React from 'react'

const Dropdown = ({}) => {
  return (
    <div className='relative'>
        <ul className='absolute left-[-10px] top-3 border-1 border-gray-500  py-2 px-4'>
            <li>Travel</li>
            <li>Food</li>
            <li>Beauty</li>
        </ul>
    </div>
  )
}

export default Dropdown
