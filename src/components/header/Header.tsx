import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Header = () => {
  let navigate = useNavigate()

  const [openDropdown, setOpenDropdown] = useState()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [projectData, setProjectData] = useState([])

  const token=localStorage.getItem('token')

  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  const fetchUser = async () => {
    await axios.get('http://127.0.0.1:5000/a_user', {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then(
      (response) => {
        console.log(response.status)
        if(response.status == 200) {
          console.log(response.data.user.username)
          setUsername(response.data.user.username)
          setEmail(response.data.user.email)
        }
        if(response.status == 401) {
          localStorage.clear()
          navigate('/login')
        }
      }, 
      (error) => {
        console.log(error)
      }
    )
  }

  const logout = async () => {
    await axios.get(`http://127.0.0.1:5000/logout`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then(
      (response) => {
        console.log(response.status)
        if(response.status == 200) {
          localStorage.clear()
          navigate('/login')
        }
        if(response.status == 401) {
        }
      },
      (error) => {
        console.log(error)
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
    fetchProjects()
    fetchUser()
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleSearchInput = (event:any) => {
    setSearchInput(event.target.value)
    console.log(searchInput)
  }

  return (
    <div className='flex justify-center items-center w-full h-24 px-6'>
      <div className='w-full h-full flex justify-between items-center'>
        <div className="flex items-center w-1/2 lg:w-1/4 relative">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input onChange={handleSearchInput} type="text" id="simple-search" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:border- focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            </div>
            { searchInput != "" && <div className='absolute w-full top-14 border left-0 rounded-lg px-5 py-2 bg-white flex flex-col justify-center items-center'>
              <div className='w-full py-3'>
                <span className='font-bold text-xl'>Projects</span>
              </div>
              
              <div className='flex flex-col divide-y w-full'>
                { projectData.filter((project:any) => {
                    if (searchInput == "") {
                      return searchInput
                    } else if (project.project_name.toLowerCase().includes(searchInput.toLowerCase())) {
                      return project
                    }
                  }).map((project,key) => {
                    return (
                      <NavLink key={key} to={`/project/${project.project_id}`} className="w-full bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:bg-slate-50 hover:rounded-lg p-2">
                        <div className="flex w-full flex-col gap-1 py-4">
                          
                          <div className='w-full flex justify-between items-center'>
                            <div className='flex flex-col w-full text-base'>
                              <span className='text-gray-600 font-semibold uppercase text-sm'>Warehouse</span>
                              <span className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{project.project_name}</span>
                            </div>
                            <div className='text-xs'>
                              <p className="font-normal text-gray-700 dark:text-gray-400">Created by</p>
                              <span className='font-bold'>{project.created_by}</span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    )
                  })
                }
              </div>

            </div>}


        </div>
        <div className='flex items-center justify-center gap-4'>
          {/* USER PROFILE */}
          <div className='relative'>
            <button ref={ref} className="flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-blue-300 dark:focus:ring-ring-600" aria-expanded="false" type="button" onClick={() => setOpenDropdown(!openDropdown)}>
              <span className="sr-only">Open user menu</span>
              <img className="w-10 h-10 rounded-full" src="http://localhost:3000/src/assets/images/avatar.png" alt="user photo" />
            </button>
            <div className={`${!openDropdown ? "hidden" : "block"} absolute right-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"`}>
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{email}</span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <NavLink to={'*'} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to={'history'} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">History</NavLink>
                </li>
                <li>
                  <NavLink to={'projects'} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Projects</NavLink>
                </li>
                <li>
                  <div onClick={logout} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header