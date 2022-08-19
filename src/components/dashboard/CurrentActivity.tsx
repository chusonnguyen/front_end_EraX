import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { NavLink } from 'react-router-dom';
import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios'

const CurrentActivity = (props) => {
  const token = localStorage.getItem('token')
  const [history,setHistory] = useState([])
  const fetchData = async() => {
    await axios.get('http://127.0.0.1:5000/project/history/1', {
      headers: {
        'x-access-token': `${token}`
      }
    }).then(
      (res) => {
        if(res.status == 200) {
          setHistory(res.data)
        }
      },
        (error) => {
          console.log(error)
        }
      )
      
  }


  useEffect(()=> {
    fetchData()
  },[])
  
  return (
    <div className='flex flex-col gap-2 w-full justify-center items-center'>
      <div className='flex justify-between items-end gap-6 w-full pb-4'>
          <span className="text-2xl font-bold">Activity</span>
          <NavLink to={'history'} className="text-sm text-gray-400">View all</NavLink>
      </div>
      {history.map(data => {
          return (
            <div className='w-full flex flex-col gap-2 justify-center items-center'>
              <div className='border w-full bg-white hover:shadow-md flex justify-start items-center overflow-hidden rounded-lg'>
                <span className='hidden md:flex p-8 bg-yellow-100 text-base justify-center items-center'>{data.username[0] + data.username[1]}</span>
                <div className='w-full flex justify-between items-center px-4 py-2'>
                  <div className='flex flex-col justify-start items-start gap-2'>
                    <span className='text-base lg:text-lg'><span className='font-bold'>{data.username}</span> {data.description}</span>
                    <span className='text-gray-400 truncate text-xs w-3/4'>{data.description}</span>
                  </div>
                  <div className='flex gap-6 justify-center items-center'>
                      <span className='text-xs md:text-sm text-gray-400'>{data.Time}</span>
                  </div>
                </div>
              </div>
            </div>
          )
      })}
  </div>
  )
}

export default CurrentActivity