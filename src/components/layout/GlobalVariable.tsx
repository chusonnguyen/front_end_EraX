import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const GlobalVariable = () => {
    const [totalSpace, setTotalSpace]=useState("")
    const [totalUsed, setTotalUsed]=useState("")
    const [usable, setUsable]=useState("")
    const [honeySpace, setHoneySpace]=useState("")
    const [honeyRate, setHoneyRate]=useState("")
    const [numberCrates, setNumberCrates] = useState("")
    const [numberDoubleStacks, setNumberDoubleStack] = useState("")
    const [numberSingles, setNumberSingles] = useState("")
    const {id} = useParams()
    const token = localStorage.getItem('token')
    let navigate = useNavigate()

    const fetchStatistic = async () => {
        await axios.get(`http://127.0.0.1:5000/stats/zoneid=${id}`, {
            headers: {
                'x-access-token': `${token}`
              }
        }).then(
            (response) => {
                console.log(response.data)
                if(response.status == 200) {
                    // if(response.data.message = "Null body") {
                    //     console.log("No statistic data")
                    // } 
                    console.log(response.data.statistic[0].total_space)
                    setTotalSpace(response.data.statistic[0].total_space)
                    setTotalUsed(response.data.statistic[0].total_used)
                    setUsable(response.data.statistic[0].usable)
                    setHoneySpace(response.data.statistic[0].honeycomb)
                    setHoneyRate(response.data.statistic[0].honeycomb_rate)
                    setNumberCrates(response.data.statistic[0].number_crates)
                    setNumberDoubleStack(response.data.statistic[0].number_stacks)
                    setNumberSingles(response.data.statistic[0].number_singles)
                }
                if(response.status == 401) {
                    localStorage.clear()
                    navigate('/login')
                }
            },
            (error) => {
                console.log(error)
            }
        )}
    useEffect(() => {
        fetchStatistic()

    },[])


  return (
    <div className=' bg-white flex flex-col justify-start items-start w-full gap-4'>
        <span className='font-bold text-2xl'>Global Variables</span>  
        <div className='rounded-lg px-4 md:px-6 lg:px-8 py-6 flex flex-col justify-start items-center bg-white border w-full gap-8 divide-y'>
            <div className='w-full gap-4 flex flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Total Space</span>
                    <span className='font-semibold text-gray-500'>{totalSpace} m2</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Total Used Space</span>
                    <span className='font-semibold text-gray-500'>{totalUsed} m2</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Usable Space</span>
                    <span className='font-semibold text-gray-500'>{usable} m2</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Honeycomb Space</span>
                    <span className='font-semibold text-gray-500'>{honeySpace} m2</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Honeycomb Rate</span>
                    <span className='font-semibold text-gray-500'>{honeyRate} %</span>
                </div>
            </div>
            <div className='w-full pt-8 gap-4 flex flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Number of Crates</span>
                    <span className='font-semibold text-gray-500'>{numberCrates}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Single-stack</span>
                    <span className='font-semibold text-gray-500'>{numberSingles}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Double-stack</span>
                    <span className='font-semibold text-gray-500'>{numberDoubleStacks}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>2-way Lift</span>
                    <span className='font-semibold text-gray-500'>9</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>4-way Lift</span>
                    <span className='font-semibold text-gray-500'>4 users</span>
                </div>
            </div>
            <div className='w-full pt-8 gap-4 flex flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Created By</span>
                    <span className='font-semibold text-gray-500'>Duc Ho Minh</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-lg'>Last Modified By</span>
                    <div className="flex -space-x-4">
                        <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="http://localhost:3000/src/assets/images/avatar.png" alt=""/>
                        <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="http://localhost:3000/src/assets/images/avatar.png" alt=""/>
                        <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="http://localhost:3000/src/assets/images/avatar.png" alt=""/>
                        <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GlobalVariable