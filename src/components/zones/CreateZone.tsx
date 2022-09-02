import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PollTwoTone } from '@mui/icons-material';

const CreateZone = () => {
    let {id} = useParams()

    let navigate = useNavigate()

    const [zoneName, setZoneName] = useState("")
    const [zoneType, setZoneType] = useState("")
    const [zoneWidth, setZoneWidth] = useState("")
    const [zoneLength, setZoneLength] = useState("")
    const [totalPoll,setTotalPoll] = useState("")

    const [pollRow,setPollRow] = useState("")
    const [pollX,setPollX] = useState("")
    const [pollY,setPollY] = useState("")
    const [pollW,setPollW] = useState("")
    const [pollL,setPollL] = useState("")
    const [pollGap,setPollGap] = useState("")
    const [pollRowGap,setPollRowGap] = useState("")

    const token = localStorage.getItem("token")
    const [error,setError] = useState("")
  
    const onChangeInputZoneName = (e: { target: { value: any } }) => {
        setZoneName(e.target.value)
    }
  
    const onChangeInputZoneType = (e: { target: { value: any } }) => {
        setZoneType(e.target.value)
    }
    const onChangeInputZoneWidth = (e: { target: { value: any } }) => {
        setZoneWidth(e.target.value)
    }
  
    const onChangeInputZoneLength = (e: { target: { value: any } }) => {
        setZoneLength(e.target.value)
    }

    const onChangeInputTotalPoll = (e: {target:{value:any}}) => {
        setTotalPoll(e.target.value)
    }

    const onChangeInputPollRow = (e: {target:{value:any}}) => {
        setPollRow(e.target.value)
    }

    const onChangeInputPollX = (e: {target:{value:any}}) => {
        setPollX(e.target.value)
    }

    const onChangeInputPollY = (e: {target:{value:any}}) => {
        setPollY(e.target.value)
    }

    const onChangeInputPollL = (e: {target:{value:any}}) => {
        setPollL(e.target.value)
    }

    const onChangeInputPollW = (e: {target:{value:any}}) => {
        setPollW(e.target.value)
    }

    const onChangeInputPollGap = (e: {target:{value:any}}) => {
        setPollGap(e.target.value)
    }

    const onChangeInputPollRowGap = (e: {target:{value:any}}) => {
        setPollRowGap(e.target.value)
    }


    let data = {
        project_id : id,
        zone_name: zoneName,
        zone_type: zoneType,
        width: zoneWidth,
        length: zoneLength,
        totalPoll: totalPoll,
        pollRow: pollRow,
        pollX: pollX,
        pollY: pollY,
        pollW: pollW,
        pollL: pollL,
        pollGap: pollGap,
        pollRowGap: pollRowGap

    }

    const headers = { 
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(zoneName != "" && zoneType != "" && zoneWidth != "" && zoneLength != "") {
            await axios.post('https://intel-backend.herokuapp.com/zones', data, {
            headers:headers
            })
            .then((response) => {
            console.log(response.data);
            console.log(response.status)
            if(response.status == 200) {
                navigate(`/project/${id}`)
            }
            if(response.status == 401) {
                localStorage.clear()
                navigate('/login')
            }
            }, (error) => {
                console.log(error);
                setError("fail to create Zone")
            });
        } else {
            setError("Empty space")
        } 
    }
return (
<div className='w-screen h-screen fixed bg-black bg-opacity-10 top-0 left-0 flex justify-center items-center'>
    <div className='h-[96vh] w-11/12 md:w-3/4 bg-white rounded-lg flex flex-col justify-between items-center p-3 md:p-6'>
        <div className='flex w-full justify-between items-center pb-3 md:pb-6'>
            <span className='font-bold text-2xl p-3 md:p-0'>Create Zone</span>
            <NavLink to={`/project/${id}`}><CloseIcon /></NavLink>
        </div>
        <div className='h-full overflow-y-auto'>
            {/* Zone Information */}
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6 lg:divide-x">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Zone Information</h3>
                            <p className="mt-1 text-sm text-gray-600">Basic information of the zone, select type of layout</p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form >
                            <div className="overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-3">
                                            <label htmlFor="zone-name"
                                                className="block text-sm font-medium text-gray-700">Zone Name</label>
                                            <input onChange={onChangeInputZoneName} type="text" name="zone-name" id="zone-name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Zone Name'/>
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="zone-type"
                                                className="block text-sm font-medium text-gray-700">Zone Type</label>
                                                <input onChange={onChangeInputZoneType} type="text" name="zone-name" id="zone-name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Zone Type'/>
                                            {/* <select id="zone-type" name="zone-type" autoComplete="zone-type"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2">
                                                <option>Existed Layout</option>
                                                <option>New Layout</option>
                                            </select> */}
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="zone-length"
                                                className="block text-sm font-medium text-gray-700">Zone Width</label>
                                            <input onChange={onChangeInputZoneWidth} type="text" name="zone-length" id="zone-length"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Zone Width'/>
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Zone Length</label>
                                            <input onChange={onChangeInputZoneLength} type="text" name="zone-height" id="zone-height"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Zone Length'/>
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="street-address"
                                                className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea name="street-address" id="street-address"
                                                autoComplete="street-address"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" />
                                        </div>
                                    </div>

                                    {/* POLL */}
                                    <div className='my-6 font-bold text-xl'>Pole</div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Total Row</label>
                                            <span className='text-xs text-gray-400 italic'>The total row of pole. For example: 1, 3, 6,...</span>
                                            <input onChange={onChangeInputPollRow} type="text" name="Poll row" id="Poll row"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Total Row'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-width"
                                                className="block text-sm font-medium text-gray-700">Total Pole</label>
                                                <span className='text-xs text-gray-400 italic'>The total pole for each row. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputTotalPoll} type="text" name="Total Poll" id="Total Poll"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Total Pole'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Row X-axis</label>
                                                <span className='text-xs text-gray-400 italic'>X coordinator of the row of pole. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputPollX} type="text" name="Poll X" id="Poll X"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Poll X'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Row Y-axis</label>
                                                <span className='text-xs text-gray-400 italic'>Y coordinator of the row of pole. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputPollY} type="text" name="Poll Y" id="Poll Y"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Poll Y'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Pole Width</label>
                                                <span className='text-xs text-gray-400 italic'>The width of the poles. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputPollW} type="text" name="Poll Width" id="Poll Width"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Poll Width'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Poll Length</label>
                                                <span className='text-xs text-gray-400 italic'>The length of the poles. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputPollL} type="text" name="Poll Length" id="Poll Length"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Poll Length'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Row Gap</label>
                                                <span className='text-xs text-gray-400 italic'>The gap between each row of pole. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputPollRowGap} type="text" name="Poll Row Gap" id="Poll Row Gap"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Poll Row Gap'/>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="zone-height"
                                                className="block text-sm font-medium text-gray-700">Pole Gap</label>
                                                <span className='text-xs text-gray-400 italic'>The gap between each pole on the same row. For example: 1, 4, 5,...</span>
                                            <input onChange={onChangeInputPollGap} type="text" name="Poll Gap" id="Poll Gap"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Poll Gap'/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-end items-center gap-6 pt-4'>
            <NavLink to={`/project/${id}`}>Back</NavLink>
            <button onClick={handleSubmit} className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Create Zone</button>
        </div>
    </div>

</div>
)
}

export default CreateZone