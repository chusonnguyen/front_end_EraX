import React, {useEffect, useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  let navigate = useNavigate()
  // localStorage.clear()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchToken = async () => {
        const token=localStorage.getItem('token')
        await axios.get(`http://127.0.0.1:5000/verify-token`, {
          headers: {
            'x-access-token': `${token}`
          }
        })
        .then(
          (response) => {
            console.log(response.status)
            if(response.status == 200) {
              navigate('/')
            }
            if(response.status == 401) {
                localStorage.clear()
            }
          },
          (error) => {
            console.log(error)
            localStorage.clear()
          }
        )
      }
    fetchToken()
},[])

const onChangeEmail = (e: { target: { value: any } }) => {
  setEmail(e.target.value)
  console.log(email)
}

const onChangePassword = (e: { target: { value: any } }) => {
  setPassword(e.target.value)
  console.log(password)
}

const handleSubmit = async (e: any) => {
  e.preventDefault()
  if(password != "" && email != "") {
      await axios.get('http://127.0.0.1:5000/login', {
          auth: {
              username: email,
              password: password
          }
      })
      .then(
          (response) => {
              console.log(response.data.token)
              localStorage.setItem("token", response.data.token)
              navigate('/')
          },
          (error) => {
              console.log(error.data)
              setError("Fail to Login")
          }
      )
  } else {
      setError("Empty space")
  }

  
}

  return (
    <div className='flex flex-col gap-6'>
      <span className='font-bold text-2xl'>Create new account</span> 
      <span>Don't have account yet? <NavLink to={'/register'} className='text-blue-600 hover:text-blue-800'>Sign up</NavLink></span>
      <form onSubmit={handleSubmit}>
        <span>{error}</span>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
          <input onChange={onChangeEmail} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
          <input onChange={onChangePassword} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
      </form>
    </div>
  )
}

export default Login