import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface Data {
  id: number,
  zone_id: number,
  crate_label: string,
  tracking: number,
  stacked: string,
  width: number,
  length: number,
  x: number,
  y: number,
  rotation: number
}


const StatisticList = (props:{map_data:Data[]}) => {
  return (
    <div className=' bg-white flex flex-col justify-start items-start w-full gap-4'>
        <span className='font-bold text-2xl'>Statistic</span>  
        <div className='p-4 rounded-lg border w-full flex flex-col gap-2 divide-y overflow-x-auto overflow-y-hidden'>
            <div className='flex flex-col justify-center items-center w-max gap-3'>
                <div className='grid grid-cols-7 w-full gap-3'>
                <span>No.</span>
                <span className='col-span-2'>Create Label</span>
                <span>x (m)</span>
                <span>y (m)</span>
                <span className='col-span-2'>Stack</span>
                </div>  
                <div className='border-b-[1px] w-full my-2'></div>
                <div className='flex flex-col justify-between w-full items-center gap-4 max-h-[500px] overflow-y-auto scrollbar-hide'>
                    {props.map_data.map((data, id) => {
                        return (
                            <div key={id} className='grid grid-cols-7 w-full gap-3'>
                                <span>{data.tracking}</span>
                                <span className='col-span-2'>{data.crate_label}</span>
                                <span>{data.x}</span>
                                <span>{data.y}</span>
                                <span className='col-span-2'>{data.stacked}</span>
                            </div>  
                        )
                    })}
 
                </div>
            </div>
        </div>
    </div>
  )
}

export default StatisticList