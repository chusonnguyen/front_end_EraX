import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

interface Projects {
  project_id:    number;
  user_id:       string;
  project_name:  string;
  project_type:  string;
  address:       string;
  last_modified: Date;
  created_by:    string;
}

const Projects = () => {

  const [projectData, setProjectData] = useState<Projects[]>([])
  let navigate = useNavigate()
  const token=localStorage.getItem('token')

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
          navigate('/login')
          localStorage.clear()
        }
      },
      (error) => {
        console.log(error)
        navigate('/login')
        localStorage.clear()
      }
    )
  }

  const fetchProjects = async () => {
    await axios.get(`http://127.0.0.1:5000/projects`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then((res: any) => {
      console.log(
        "project" + res.status
      )
      console.log(res.data)
      if(res.status == 200) {
        const project = res.data
        setProjectData(project)
      }
      if(res.status == 401) {
        navigate('/login')
        localStorage.clear()
      }
    })
  }

  useEffect(() => {
    // fetchToken()
    fetchProjects()
  }, [])


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
              <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-400">Projects</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className='flex w-full justify-between items-center py-6'>
        <span className='text-2xl md:text-3xl font-bold'>All Projects</span>
        <NavLink to={'/projects/create-project'} type="button" className="px-6 py-3 rounded-lg bg-intel-blue hover:bg-blue-900 text-white">+ Create Project</NavLink>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-10 mb-16'>
        {projectData.map((project, id) => {
          return (
            <NavLink key={id} to={`/project/${project.project_id}`} className="bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:bg-slate-50">
              <div className="w-full h-44 overflow-hidden bg-[url('../src/assets/images/intel-project.jpg')] bg-no-repeat bg-cover">
              </div>
              <div className="flex w-full flex-col gap-1 p-5">
                <span className='text-gray-600 font-semibold uppercase'>Warehouse</span>
                <div className='w-full flex justify-between items-center'>
                  <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate w-3/4">{project.project_name}</span>
                  <span>ID: {project.project_id}</span>
                </div>
                <div className='w-full flex justify-between mt-2 items-center'>
                  <div>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">Created by</p>
                    <span className='font-bold'>{project.created_by}</span>
                  </div>

                  <NavLink to={`/project/edit/${project.project_id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Edit
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </NavLink>
                </div>
              </div>
            </NavLink>
          )
        })}
      </div>

      
    </div>
  )
}

export default Projects