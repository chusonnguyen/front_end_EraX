import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

interface History {
  id: number,
  description: string,
  user_id: string,
  Time: string
}

const History = () => {
  const [history, setHistory] = useState<History[]>([])
  let navigate = useNavigate()
  const token=localStorage.getItem('token')

  const fetchHistory = async () => {
    await axios.get(`http://127.0.0.1:5000/history/`, {
      headers: {
        'x-access-token': `${token}`
      }
  })
      .then(res => {
        if(res.status == 200) {
          const history = res.data
          setHistory(history)
        }
        if(res.status == 401) {
          localStorage.clear()
          navigate('/login')
        }
        
      })
  }

  const fetchToken = async () => {
    if(!token) {
      navigate('/login')
    }
    await axios.get(`http://127.0.0.1:5000/verify-token`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then(
      (response) => {
        console.log(response.status)
        if(response.status == 200) {
          
        }
        if(response.status == 401) {
          localStorage.clear()
          navigate('/login')
          
        }
      },
      (error) => {
        console.log(error)
        navigate('/login')
        localStorage.clear()
      }
    )
  }

  useEffect(() => {
    fetchToken()
    fetchHistory()
  },[])

  return (
    <div className="w-full h-full flex flex-col justify-start item-start px-6 overflow-y-auto">
      <nav className="flex pt-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <NavLink to={'/*'} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Dashboard
              </NavLink>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-400">History</span>
              </div>
            </li>
          </ol>
      </nav>
      <div className='flex w-full justify-between items-center py-6'>
        <span className='text-3xl font-bold'>History</span>
      </div>
      <div className='flex flex-col w-full gap-6 mb-16 text-lg'>
        <div className='w-full grid grid-cols-12 items-center border rounded-lg p-4'>
          <div className='hidden md:flex flex-col'>
            <span className='font-bold'>ID</span>
          </div>
          <div className='flex flex-col col-span-6'>
            <span className='font-bold'>Description</span>
          </div>
          <div className='flex flex-col col-span-4'>
            <span className='font-bold'>By</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Time</span>
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          {history.map(h => {
            return (
              <div className='w-full grid grid-cols-12 items-center border rounded-lg p-4 text-sm hover:shadow-lg'>
                <div className='md:flex flex-col hidden'>
                  <span>{h.id}</span>
                </div>
                <div className='flex flex-col col-span-6'>
                  <span>{h.description}</span>
                </div>
                <div className='flex flex-col col-span-4'>
                  <span>{h.user_id}</span>
                </div>
                <div className='flex flex-col text-gray-400'>
                  <span>{h.Time}</span>
                </div>
              </div>
            )
          })}
        </div>
        
      </div>
    </div>
  )
}

export default History