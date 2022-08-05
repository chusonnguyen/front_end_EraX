import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { PropaneSharp } from '@mui/icons-material'

const Overview = (props:any) => {
    console.log(props.usablePercent)
  return (
    <div className='w-full flex flex-col justify-center items-center gap-6'>
        <div className='w-full justify-start items-center'>
            <span className='text-2xl font-bold'>Overview</span>
        </div>
        <div className='rounded-lg px-4 md:px-6 lg:px-8 py-6 flex flex-col justify-start items-center bg-white border w-full gap-8 divide-y'>
            <div className='w-full gap-4 flex flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Total Zone</span>
                    <span className='font-semibold text-gray-500'>{props.totalZone}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Average Usable Space</span>
                    <span className='font-semibold text-gray-500'>{props.averageSpace} (m2)</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Usable Percent</span>
                    <span className='font-semibold text-gray-500'>{props.usablePercent} (%)</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Average Honeycomb Rate</span>
                    <span className='font-semibold text-gray-500'>{props.averageRate} (%)</span>
                </div>
            </div>
            <div className='w-full pt-8 gap-4 flex flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Created on</span>
                    <span className='font-semibold text-gray-500'>{props.createdOn}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Total Zone</span>
                    <span className='font-semibold text-gray-500'>{props.totalZone}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Total Accessed</span>
                    <span className='font-semibold text-gray-500'>{props.totalAccessed}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-base lg:text-lg'>Last Modified By</span>
                    <div className="flex -space-x-4">
                        <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="http://localhost:3000/src/assets/images/avatar.png" alt=""/>
                        <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="http://localhost:3000/src/assets/images/avatar.png" alt=""/>
                        <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="http://localhost:3000/src/assets/images/avatar.png" alt=""/>
                        <a className="flex items-center justify-center lg:w-8 lg:h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Overview