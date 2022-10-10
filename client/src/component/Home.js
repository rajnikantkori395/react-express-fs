import { useState, useEffect } from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import Formm from './Formm';
import { useLocation, useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()
  const [apidata, setapiData] = useState([])
  
  
  
  useEffect(() => {
  
    axios.get("/api")
      .then((res) => setapiData(res.data))
  }, [apidata])

  
    
    
  function del(id) {
    axios.delete(`/${id}`)
  }

  function edit(id) {
    let title = document.getElementById('t').value
    let body = document.getElementById('b').value
    axios.put(`/${id}/${title}/${body}`)
  }

  const handleLogout = async(e) =>{
   let result = await fetch("/logout",{
    method:'post',
    headers:{
      'content-type' : 'application/json'
    }
  })

   result = await result.json()
   if(!result.session){
    navigate('/')
   
   }
  }
  
  return (<div>
      <Button onClick={handleLogout} secondary > Logout</Button>
   
    <Formm />
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Options</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {apidata.map((data,index) => {
          return (
            <Table.Row >
              <Table.Cell>{index+1}</Table.Cell>
              <Table.Cell >{data.title}</Table.Cell>
              <Table.Cell >{data._Content} </Table.Cell>
              <Table.Cell>{data.date} </Table.Cell>
              <Table.Cell><Button negative onClick={() => del(data.id)}>delete</Button>
                <Button positive onClick={() => edit(data.id)}>edit</Button></Table.Cell>
            </Table.Row>

          )
        })}

      </Table.Body>
    </Table>

  </div>

  );
}

export default Home;
