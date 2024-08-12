import { useMutation } from '@apollo/client'
import React from 'react'
import { addUser } from './queries.js'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
    const [name,setName] = React.useState('')
    const [p,setP] = React.useState(0)
    const [add] = useMutation(addUser)
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
        await add({variables: {
            name: name.substring(0,10),
            popularity: +p
        }})
        nav(-1)
      }}>Submit</button>
    </div>
  )
}

export default AddUser
