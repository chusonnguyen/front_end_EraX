import React, { useEffect, useState } from 'react'
import GlobalVariable from './GlobalVariable'
import Map from './Map'
import Playground from './Playground'
import RawList from './RawList'
import StatisticList from './StatisticList'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

interface Data {
  id: number,
  zone_id: number,
  crate_label: string,
  tracking: number,
  stacked: string,
  width: number,
  length: number,
  x: number,
  y: number,
  rotation: number
}

interface Play {
  id: number,
  zone_id: number,
  crate_label: string,
  tracking: number,
  stacked: string,
  width: number,
  length: number,
  x: number,
  y: number,
  rotation: number
}

interface Pole {
  id: number,
  width: number,
  length: number,
  x: number,
  y: number
}

interface Ailse {
  id: number,
  width: number,
  length: number,
  x: number,
  y: number
}

const Layout = () => {
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingLayout, setIsLoadingLayout] = useState(true)
  const [isLoadingPlayground, setIsLoadingPlayground] = useState(true)
  const [isLoadingPole, setIsLoadingPole] = useState(true)
  const [isLoadingAilse, setIsLoadingAilse] = useState(true)
  const [file, setFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [w, setW] = useState("")
  const [l, setL] = useState("")
  const [dataMap, setDataMap] = useState<Data[]>([])
  const [dataPlay, setDataPlay] = useState<Play[]>([])
  const [dataPole, setDataPole] = useState<Pole[]>([])
  const [dataAilse, setDataAilse] = useState<Ailse[]>([])
  const [width, setWidth] = useState()
  const [length, setLength] = useState()
  const { id } = useParams()

  const token = localStorage.getItem('token')
  const formData = new FormData();

  let navigate = useNavigate()

  const onFileChange = (e: any) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
    setIsFilePicked(true);

  }

  // const onChangeW = (e: any) => {
  //   setW(e.target.value)
  //   console.log(w)
  // }

  // const onChangeL = (e: any) => {
  //   setL(e.target.value)
  //   console.log(l)
  // }


  const handleSubmit = async (e: any) => {
    setIsLoading(true)
    e.preventDefault()
    formData.append('file', file)
    // formData.append('w', w)
    // formData.append('l', l)
    formData.append('zone_id', id)
    await axios.post(`http://127.0.0.1:5000/upload/${id}`, formData, {
      headers: {
        'x-access-token': `${token}`
      }

    }).then(
      (response) => {
        console.log(response.status)
        console.log(response.data)
        if (response.status === 200) {
          setIsLoading(false)
        }
        if (response.data.message === 'File successfully uploaded') {
          window.location.reload();
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const fetchAilse = async () => {
    await axios.get(`http://127.0.0.1:5000/ailse/${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    }).then(
      (res) => {
        console.log(res.status);
        if (res.status === 200) {
          setDataAilse(res.data)
          setIsLoadingAilse(false)

        }
        console.log(dataAilse)
      }
    )
  }

  const fetchLayout = async () => {
    await axios.get(`http://127.0.0.1:5000/layout/zoneid=${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    }).then(
      (res) => {
        console.log(res.status);
        if (res.status === 200) {
          setDataMap(res.data)
          setIsLoadingLayout(false)

        }
        console.log(dataMap)
      }
    )
  }

  const fetchPole = async () => {
    await axios.get(`http://127.0.0.1:5000/pole/${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    }).then(
      (res) => {
        console.log(res.status);
        if (res.status === 200) {
          setDataPole(res.data)
          setIsLoadingPole(false)

        }
        console.log(dataPole)
      }
    )
  }

  //api playground: http://127.0.0.1:5000/playground/zoneid=${id}
  const fetchPLayGround = async () => {
    await axios.get(`http://127.0.0.1:5000/playground/zoneid=${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    }).then(
      (res) => {
        console.log("playground: " + res.status)
        if (res.status === 200) {
          setDataPlay(res.data)
          setIsLoadingPlayground(false)
        }
      }
    )
  }

  const fetchZone = async () => {
    await axios.get(`http://127.0.0.1:5000/refreshedzone/${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
      .then((res: any) => {
        console.log(res.status)
        if (res.status == 200) {

          setWidth(res.data[0].width)
          setLength(res.data[0].length)
        }
        if (res.status == 401) {
          localStorage.clear()
          navigate('/login')
        }

      },
        (error) => {
          console.log(error)
        }
      )
  }


  const ratio = 35
  const map_data = dataMap
  const pole_data = dataPole
  const ailse_data = dataAilse

  const boxes = dataPlay

  const ailse_final = ailse_data.map(ailse => {
    return {
      id: ailse.id,
      width: ailse.width,
      length: ailse.length,
      x: ailse.x,
      y: ailse.y
    }
  })

  const poles_final = pole_data.map(pole => {
    return {
      id: pole.id,
      width: pole.width* ratio,
      length: pole.length* ratio,
      x: pole.x* ratio,
      y: pole.y* ratio
    }
  })

  const boxses_final = boxes.map(box => {
    return {
      id: box.id,
      zone_id: box.zone_id,
      crate_label: box.crate_label,
      tracking: box.tracking,
      stacked: box.stacked,
      width: box.width * ratio,
      length: box.length* ratio,
      x: box.x* ratio,
      y: box.y* ratio,
      rotation: box.rotation
    }
  })

  function renderPlayground() {
    if (isLoadingPlayground == false) {
      return <Playground boxses_final={boxses_final} poles_final={poles_final} ailse_final={ailse_final} width_data={width} length_data={length} />
    } else {
      return <h2>NULL DATA</h2>
    }
  }

  useEffect(() => {
    fetchAilse()
    fetchLayout()
    fetchPLayGround()
    renderPlayground()
    fetchPole()
    fetchZone()
  }, [])

  return (
    <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-6 bg-white overflow-y-auto'>
      <div className='col-span-4 flex justify-between items-center flex-col md:flex-row'>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <NavLink to={'/*'}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                  </path>
                </svg>
                Dashboard
              </NavLink>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <NavLink to={'/projects'}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  Projects</NavLink>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <NavLink to={`/project/${id}`}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  Zones</NavLink>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-400">Layout</span>
              </div>
            </li>
          </ol>
        </nav>
        <button className='mt-6 md:mt-0 px-6 py-3 rounded-lg bg-intel-blue hover:bg-blue-800 text-white' onClick={() =>
          setOpenModal(true)}>Upload layout</button>
      </div>

      <div className='flex flex-col justify-start items-start w-full gap-10 col-span-4 lg:col-span-3'>
        <div className='lg:col-span-3 col-span-4 grid grid-cols-1 md:grid-cols-3 gap-10 w-full'>
          <RawList map_data={map_data} />
          <div className='col-span-4 md:col-span-2'>
            <Map map_data={map_data} ailse_data={dataAilse} pole_data={dataPole} width_data={width} length_data={length} />
          </div>
        </div>

        <div className='w-full'>
          {renderPlayground()}
        </div>
      </div>

      <div className='flex flex-col gap-10 justify-start items-start col-span-4 md:col-span-1'>
        <GlobalVariable />
        <StatisticList map_data={map_data} />
      </div>

      <div className={`${openModal ? "visible" : "hidden"} fixed w-screen h-screen bg-black bg-opacity-30 top-0 left-0
    overflow-hidden flex justify-center items-center`}>
        <div className={` w-screen h-screen fixed bg-black bg-opacity-10 top-0 left-0 justify-center items-center flex`}>
          <div className='h-[96vh] w-3/4 bg-white rounded-lg flex flex-col justify-between items-center p-6'>
            <div className='flex w-full justify-between items-center pb-6'>
              <span className='font-bold text-2xl'>Upload Layout</span>
              <button onClick={() => setOpenModal(!openModal)}>
                <CloseIcon /></button>
            </div>
            <div className='h-full overflow-y-auto'>


              <div className="md:grid md:grid-cols-3 md:gap-6 lg:divide-x">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Zone layout</h3>
                    <p className="mt-1 text-sm text-gray-600">This information will be displayed publicly so be
                      careful what you share.</p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <div className="sm:rounded-md sm:overflow-hidden">
                      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                        <div>
                          <label className="block text-sm font-medium text-gray-700"> Raw tool list </label>
                          <div
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                  <span>Upload a file</span>
                                  <input onChange={onFileChange} id="file-upload" name="file-upload" type="file"
                                    className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">CSV, XLXS</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button onClick={handleSubmit} type="submit" className={`${isLoading ? "animate-pulse" : ""}
                      inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium
                      rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-indigo-500`}>Upload</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout