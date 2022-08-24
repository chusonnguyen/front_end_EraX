import React from 'react'

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

const RawList = (props:{map_data:Data[]}) => {
  return (
    <div className=' bg-white flex flex-col justify-start items-start w-full gap-4 col-span-4 md:col-span-1'>
        <span className='font-bold text-2xl'>Raw Tool List</span>  
        <div className='p-4 rounded-lg border w-full flex flex-col gap-2 divide-y overflow-x-auto overflow-y-hidden'>
        <div className='flex flex-col justify-center items-center w-max gap-3'>
            <div className='grid grid-cols-7 w-full gap-3'>
            <span>No.</span>
            <span className='col-span-2'>Create Label</span>
            <span>Width</span>
            <span>Length</span>
            <span>Stack</span>
            <span>Lift</span>
            </div>  
            <div className='border-b-[1px] w-full my-2'></div>
            <div className='flex flex-col justify-between w-full items-center gap-4 max-h-[500px] overflow-y-auto scrollbar-hide'>
                {props.map_data.map((data, key) => {
                    return (
                        <div key={key} className='grid grid-cols-7 w-full gap-3'>
                            <span>{data.tracking}</span>
                            <span className='col-span-2'>{data.crate_label}</span>
                            <span>{data.width}</span>
                            <span>{data.length}</span>
                            <span>{data.stacked.toString()}</span>
                            <span>Width</span>
                        </div>  
                    )
                })}  
            </div>

        </div>
        </div>
    </div>
  )
}

export default RawList