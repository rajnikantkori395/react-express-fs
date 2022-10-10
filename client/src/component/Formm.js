
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, TextArea } from 'semantic-ui-react'
import App from '../App'

const Formm = () => {
  let navigate = useNavigate()
  const [sno,setSno] = useState(1)
  const [title,setTitle] = useState()
  const [_content,SetContent] = useState()
  const increase = () =>{
    setSno(sno+1)
  }
  
  const handleSubmit = async() => {
   increase()
   navigate('/Home',{state:{sno:sno}})
    try{
     await axios('/',{
      method: "post",
      data: JSON.stringify({title,_content}),
      headers: { "Content-Type": "application/json" }
    })

  }
  catch(err){
    console.log(err)
  }

  
}
  

  return (
     <div className='firstbox'>
    <h1>Notes App- React and Node Js</h1>
    
    <Form>
    <Form.Field>
      <label>Title</label>
      <input placeholder='Title'  name="title" id="t" onChange={(e)=>setTitle(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>Description</label>
      <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} name="_content" id='b' onChange={(e)=>SetContent(e.target.value)}/>
    </Form.Field>
    <Button primary onClick={handleSubmit}>Submit</Button>
  </Form>

    </div>
  )
}

export default Formm
