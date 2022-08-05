import React, { useEffect, useState }  from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  let navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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

const onChangeUsername = (e: { target: { value: any } }) => {
  setUsername(e.target.value)
  console.log(username)
}

const onChangeEmail = (e: { target: { value: any } }) => {
  setEmail(e.target.value)
  console.log(email)
}

const onChangePassword = (e: { target: { value: any } }) => {
setPassword(e.target.value)
console.log(password)
}

const onChangeConfirmPassword = (e: { target: { value: any } }) => {
setConfirmPassword(e.target.value)
console.log(confirmPassword)
}

const headers = { 
'Content-Type': 'application/json',
}

let data = {
  username: username,
  email: email,
  password:password
}

const handleSubmit = async (e: any) => {
  e.preventDefault()
  if(password != "" && confirmPassword != "" && username != "" && email != "") {
    if(password == confirmPassword) {
      await axios.post('http://127.0.0.1:5000/register', data, {
        headers:headers
      })
        .then((response) => {
          console.log(response);
          navigate('/login')
        }, 
        (error) => {
          console.log(error);
          setError("Fail to create account")
        });
      
    }
    else {
      setError("Invalid password")
      return console.log("invalid password")
    } 
  } else {
    setError("Invalid form")
    return console.log("invalid form")
  }
}

  return (
    <div className='flex flex-col gap-6'>     
      <span className='font-bold text-2xl'>Create new account</span> 
      <span>Already have account? <NavLink to={'/login'} className='text-blue-600 hover:text-blue-800'>Login</NavLink></span>
      <form onSubmit={handleSubmit}>
        <span>{error}</span>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
          <input onChange={onChangeUsername} type="name" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Username" required/>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
          <input onChange={onChangeEmail} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Email" required/>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
          <input onChange={onChangePassword} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Password" required/>
        </div>
        <div className="mb-6">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password</label>
          <input onChange={onChangeConfirmPassword} type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Confirm Password" required/>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
      </form>
  </div>
  )
}

export default Register