import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useLocation, useNavigate } from 'react-router-dom'




const Login = () => {
  const [username,setUsername] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()
  let location = useLocation()
 
  const handleSubmit = async(e) => {
    e.preventDefault()
    let result = await fetch("/users/login",{
      method:'post',
      body:JSON.stringify({username,password}),
      headers:{
        'content-type' : 'application/json'
      }
    })
    result = await result.json()
    console.warn(result.uid);
    if(result.uid){
      navigate('/Home')
    }
    
  }

  return (
    <div>
    <Form  >
    <Form.Field>
      <label>UserName</label>
      <input placeholder='UserName' name="username" onChange={(e)=>setUsername(e.target.value)} required />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='password' name="password" onChange={(e)=>setPassword(e.target.value)} type="password" required />
    </Form.Field>
    <Button onClick={handleSubmit}>Show Notes</Button>
  </Form>
    </div>
  )
}

export default Login
