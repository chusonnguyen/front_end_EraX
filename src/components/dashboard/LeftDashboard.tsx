import React, { useEffect, useState } from 'react'
import HoneycombRate from './HoneycombRate'
import UsableSpace from './UsableSpace'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

interface Card {
    zone_name: string,
    usable_space: number
}
  

const LeftDashboard = (props:{data:Card[]}) => {
  return (
    <div className='w-full grid grid-cols-3 gap-10'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-3'>
            {props.data.map(data => {
                return (
                    <UsableSpace label={data.zone_name} usable_rate={data.usable_space}/>
                )
            })}
        </div>
        <div className='col-span-3 border-y py-8'>
            <HoneycombRate />
        </div>
        
    </div>
  )
}

export default LeftDashboard