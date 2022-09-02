import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

const CreateProject = () => {
    let navigate = useNavigate()
    const [projectName, setProjectName] = useState("")
    const [projectType, setProjectType] = useState("")
    const [projectAddress, setProjectAddress] = useState("")
    const [error, setError] = useState("")
    const token = localStorage.getItem("token")
  
    const onChangeInputProjectName = (e: { target: { value: any } }) => {
      setProjectName(e.target.value)
    }
  
    const onChangeInputProjectType = (e: { target: { value: any } }) => {
      setProjectType(e.target.value)
    }
  
    const onChangeInputProjectAddress = (e: { target: { value: any } }) => {
      setProjectAddress(e.target.value)
    }
  
    let data = {
      project_name: projectName,
      project_type: projectType,
      address: projectAddress
    }
  
    const headers = { 
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    }
  
    const handleSubmit = (e: any) => {
      e.preventDefault()
      if(projectName != "" || projectType != "" || projectAddress != "") {
          setError("Empty Space")
      }
      if(projectName != "" && projectType != "" && projectAddress != "") {
          axios.post('https://intel-backend.herokuapp.com/projects', data, {
      headers:headers
      })
      .then((response) => {
      console.log(response.status);
      console.log(response.data)
      if(response.status == 200) {
          navigate('/projects')
      }
      }, (error) => {
      console.log(error);
      setError("Fail to create")
      });
      }
      
    }
return (
<div className='w-screen h-screen fixed bg-black bg-opacity-10 top-0 left-0 flex justify-center items-center'>
    <div className='h-[96vh] w-11/12 md:w-3/4 bg-white rounded-lg flex flex-col justify-between items-center p-3 md:p-6'>
        <div className='flex w-full justify-between items-center pb-3 md:pb-6'>
            <span className='font-bold text-2xl p-3 md:p-0'>Create Project</span>
            <NavLink to={'/projects'}><CloseIcon /></NavLink>
        </div>
        <div className='h-full overflow-y-auto'>
            {/* Zone Information */}
            <div className="mt-6 md:mt=8 lg:mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6 lg:divide-x">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Project Information</h3>
                            <p className="mt-1 text-sm text-gray-600">Basic information of the project, select type of project</p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-3">
                                            <label htmlFor="zone-name"
                                                className="block text-sm font-medium text-gray-700">Project Name</label>
                                            <input onChange={onChangeInputProjectName} type="text" name="zone-name" id="zone-name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Project Name'/>
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="project-name"
                                                className="block text-sm font-medium text-gray-700">Project Type</label>
                                            <input onChange={onChangeInputProjectType} type="text" name="project-name" id="project-name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" placeholder='Project Type'/>
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="project-name"
                                                className="block text-sm font-medium text-gray-700">Location</label>
                                            <div className='relative'>
                                              <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                                                <LocationOnIcon className='text-gray-400'/>
                                              </div>
                                              <input onChange={onChangeInputProjectAddress} type="text" name="project-name" id="project-name"
                                                  autoComplete="given-name"
                                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 pl-9 py-2" placeholder='Location'/>
                                            </div>
                                            
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="street-address"
                                                className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea name="street-address" id="street-address"
                                                autoComplete="street-address"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none border border-gray-300 focus:border sm:text-sm rounded-md px-3 py-2" />
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
            {/* Upload File */}
            <div className="md:grid md:grid-cols-3 md:gap-6 lg:divide-x">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-600">This information will be displayed publicly so be
                            careful what you share.</p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div className="sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700"> Cover photo </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor"
                                                fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file"
                                                        className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        <div className='w-full flex justify-end items-center gap-6 pt-4'>
            <NavLink to={'/projects'}>Back</NavLink>
            <button onClick={handleSubmit} className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Create Project</button>
        </div>
    </div>

</div>
)
}

export default CreateProject