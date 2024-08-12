import { useMutation } from '@apollo/client'
import React from 'react'
import { createArticle } from './queries.js'
import { useNavigate, useParams } from 'react-router-dom'

const CreateArticle = () => {
    const {id} = useParams()
    const [name,setName] = React.useState('')
    const [create] = useMutation(createArticle)
    const nav = useNavigate()
  return (
    <div className='bg-[#80808080] h-[920px] flex flex-col gap-10'>
      <input className='w-[200px]' placeholder='Link...' type='text' onChange={(e) => {
        setName(e.target.value)
      }}/>
      <button className='w-[200px]' onClick={async () => {
        await create({variables: {
            link: name,
            OwnerId: +id
        }})
        nav(-1)
      }}>Submit</button>
    </div>
  )
}

export default CreateArticle
