import React from 'react'

const Card = ({text, number, icon, bgcolor}) => {
  return (
    <div className='rounded-xl font-roboto flex items-center gap-4 border border-gray-200 w-[200px] px-3 py-6 '>
      <div className={`p-3 ${bgcolor} rounded-full`}>
        {icon}
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-gray-600'>{text}</p>
        <p className='text-xl font-bold'>{number}</p>

      </div>
    </div>
  )
}

export default Card
