import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { NavLink } from 'react-router-dom'
import CurrentActivity from './CurrentActivity';
import Overview from './Overview';
import React,{useState,useEffect} from 'react'

const RightDashboard = (props:any) => {

  return (
    <div className='flex flex-col w-full justify-center items-center gap-10'>
        <Overview usablePercent={props.usablePercent} totalZone={props.totalZone} averageRate={props.averageRate} averageSpace={props.averageSpace} totalAccessed={props.totalAccessed} createdOn={props.createdOn}/>
        <CurrentActivity />
    </div>
  )
}

export default RightDashboard