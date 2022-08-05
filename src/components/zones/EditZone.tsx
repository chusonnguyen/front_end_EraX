import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink,useLocation  } from 'react-router-dom'
import axios from 'axios'

const EditZone = () => {
    let navigate = useNavigate()
    const [zoneName, setZoneName] = useState("")
    const [zoneType, setZoneType] = useState("")
    const [error, setError] = useState("")
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const location = useLocation();
    const  projectID  = location.state;
    console.log(projectID);

    const onChangeInputZoneName = (e: { target: { value: any } }) => {
        setZoneName(e.target.value)
    }

    const onChangeInputZoneType = (e: { target: { value: any } }) => {
        setZoneType(e.target.value)
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
    }

    const data = {
        zone_name: zoneName,
        zone_type: zoneType,
    }

    const handleSubmit = (e: any) => {
        console.log("clicked")
        e.preventDefault()
        if (zoneName != "" || zoneType != "") {
            console.log("empty")
            setError("Empty Space")
        }
        if (zoneName != "" && zoneType != "") {
            console.log("Worked")
            axios.put(`http://127.0.0.1:5000/refreshedzone/${id}`, data, {
                headers: headers
            })
                .then((response) => {
                    console.log(response.status);
                    
                    if (response.status == 200) {
                        console.log(response.data)
                        navigate(`/project/${projectID}`)
                    }
                }, (error) => {
                    console.log(error);
                    setError("Fail to create")
                });
        }
    }

    const fetchZone = async () => {
        
        await axios.get(`http://127.0.0.1:5000/refreshedzone/${id}`, {
            headers: headers
        })
            .then((res: any) => {
                console.log(
                    "zone" + res.status
                )
                console.log(res.data)
                if (res.status == 200) {
                    const project = res.data
                    setZoneName(res.data[0].zone_name)
                    setZoneType(res.data[0].zone_type)
                    setIsLoading(false)
                }
                if (res.status == 401) {
                    navigate('/login')
                    localStorage.clear()
                }
            }, (error) => {
                
                console.log(error);
                setError("Fail to create")
            })
    }

    useEffect(() => {
        fetchZone()
    }, [])

    const display = () => {
        if (isLoading == false) {
            
            return (
                <div className='h-full overflow-y-auto'>
                    {/* Zone Information */}
                    <div className="mt-6 md:mt=8 lg:mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6 lg:divide-x">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Zone Information</h3>
                                    <p className="mt-1 text-sm text-gray-600">Basic information of the zone, select type of zone</p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-3">
                                                    <label htmlFor="zone-name"
                                                        className="block text-sm font-medium text-gray-700">Zone Name</label>
                                                    <input defaultValue={zoneName} onChange={onChangeInputZoneName} type="text" name="zone-name" id="zone-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Project Name' />
                                                </div>

                                                <div className="col-span-3">
                                                    <label htmlFor="project-name"
                                                        className="block text-sm font-medium text-gray-700">Zone Type</label>
                                                    <input defaultValue={zoneType} onChange={onChangeInputZoneType} type="text" name="project-name" id="project-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Project Type' />
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
            )
        }
    }

    return (
        <div className='w-screen h-screen fixed bg-black bg-opacity-10 top-0 left-0 flex justify-center items-center'>
            <div className='h-[96vh] w-11/12 md:w-3/4 bg-white rounded-lg flex flex-col justify-between items-center p-3 md:p-6'>
                <div className='flex w-full justify-between items-center pb-3 md:pb-6'>
                    <span className='font-bold text-2xl p-3 md:p-0'>Edit Zone</span>
                    <NavLink to={`/project/${projectID}`}><CloseIcon /></NavLink>
                </div>
                {display()}
                <div className='w-full flex justify-end items-center gap-6 pt-4'>
                    <NavLink to={`/project/${projectID}`}>Back</NavLink>
                    <button onClick={handleSubmit} className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Save Change</button>
                </div>
            </div>

        </div>
    )
}

export default EditZone