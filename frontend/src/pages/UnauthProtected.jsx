import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiLoader } from 'react-icons/fi'
import { fetchEventsStart } from '../redux/slices/eventSlice'
import { userProfile } from '../redux/slices/profileSlice'
import { getMembersOfDomain } from '../redux/slices/getDomainUserSlice'

function UnauthProtected({children}) {
  const dispatch = useDispatch()  
  const {data, loading} = useSelector((state) => state.dashboard)
  
  const [isloading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
  const token = localStorage.getItem('token')
  if(!token){
      navigate('/login')
    }
  })

  useEffect(() => {
    async function fetchData() {
      const res= await dispatch(userProfile())

      if(res.meta.requestStatus==="fulfilled")        
        setLoading(false)
    }
    dispatch(fetchEventsStart())
    if(!data||Object.keys(data).length==0)
    fetchData();

    },[dispatch, data])
    

  useEffect(()=>{
    async function membersOfDomain() {
      const res1 = await dispatch(getMembersOfDomain({domain:data.domain_dsa, domainType:"dsaMembers"}))
      const res2 = await dispatch(getMembersOfDomain({domain:data.domain_dev, domainType:"devMembers"}))

      if(res1.meta.requestStatus==="fulfilled"&&res2.meta.requestStatus==="fulfilled")
        setLoading(false)
    }
    if(data && data.role=="COORDINATOR")
    membersOfDomain()
  
  },[data, dispatch])
    if(isloading) {
      return (
          <div className="flex justify-center items-center h-screen bg-gray-950">
              <FiLoader size={40} color='white' className='animate-spin'/>
          </div>
      )
    }else{
      return (
      <>
          {children}
      </>
      )
    }
}

export default UnauthProtected
