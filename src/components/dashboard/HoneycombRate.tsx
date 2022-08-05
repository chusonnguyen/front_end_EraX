import React from 'react'
import HoneycombChart from '../chart/HoneycombChart'

const HoneycombRate = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
        <div className='flex justify-between items-center w-full'>
            <span className='font-bold text-2xl'>Honeycombing Rate</span>
            <select className='px-3 py-2 rounded-lg border'>
                <option value="2022">2022</option>
                <option value="2022">2021</option>
            </select>
        </div>
        <div className='w-full'>
          <HoneycombChart/>
        </div>
    </div>
  )
}

export default HoneycombRate