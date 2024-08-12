import { useMutation } from '@apollo/client';
import React from 'react'
import {useParams, useNavigate} from "react-router-dom";
import { updateUser } from './queries.js';
const EditUser = () => {
    const {id} = useParams()
    const [name,setName] = React.useState('')
    const [p,setP] = React.useState(0)
    const [edit] = useMutation(updateUser)
    const nav = useNavigate()
  return (
    <div className='bg-[#80808080] h-[920px] flex flex-col gap-10'>
      <input className='w-[200px]' placeholder='Name...' type='text' onChange={(e) => {
        setName(e.target.value)
      }}/>
      <input className='w-[200px]' placeholder='Popularity' type='number' onChange={(e) => {
        setP(e.target.value)
      }}/>
      <button className='w-[200px]' onClick={async () => {
        await edit({variables: {
            Id: +id,
            name: name,
            popularity: +p
        }})
        nav(-1)
      }}>Submit</button>
    </div>
  )
}


export default EditUser
