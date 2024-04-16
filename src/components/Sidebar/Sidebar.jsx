import React from 'react'

export default function Sidebar() {


    const liStyle = 'hover:bg-gray-300 py-2 border-b-4 ho border-green-noQ';
    const liTextStyle = 'px-4';
  return (

    <div className=' shadow-xl w-1/5 h-dvh m-0'>

    <ul className='bg-green '>
        <li className={liStyle}><span className={liTextStyle}>Boka boende</span></li>
        <li className={liStyle}><span className={liTextStyle}>Mina bokningar</span></li>
        <li className={liStyle}><span className={liTextStyle}>Mina Meddelanden</span></li>
    </ul>


    </div>
  )
}
