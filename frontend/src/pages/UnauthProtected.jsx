import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDashboardDataFailure, fetchDashboardDataStart, fetchDashboardDataSuccess } from '../redux/slices'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FiLoader } from 'react-icons/fi'
import { fetchUserOfDomainFailure, fetchUsersOfDomainStart, fetchUsersOfDomainSuccess } from '../redux/slices/getDomainUserSlice'
import { fetchEventsStart } from '../redux/slices/eventSlice'

function UnauthProtected({children}) {
  const dispatch = useDispatch()  
  const {data, loading} = useSelector((state) => state.dashboard)
  const [isloading, setLoading] = useState(loading)
  const navigate = useNavigate()
  useEffect(()=>{
  const token = localStorage.getItem('token')
  if(!token){
      navigate('/login')
    }
  })
  useEffect(() => {
    async function fetchData() {
      dispatch(fetchDashboardDataStart())
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/getProfile',{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if(response.status==200){
          dispatch(fetchDashboardDataSuccess(response.data.data))
          setLoading(false)
        }
        else{
          dispatch(fetchDashboardDataFailure(response.message))
        }
      } catch (error) {
        navigate("/login")
        dispatch(fetchDashboardDataFailure(error.message))
      }
    }
    dispatch(fetchEventsStart())
    if(!data||Object.keys(data).length==0)
    fetchData();
    },[dispatch,data])

  useEffect(()=>{
    async function membersOfDomain() {
      dispatch(fetchUsersOfDomainStart())
      try {
        const membersOfDev= await axios.get("http://localhost:8080/api/v1/coordinator/memberOfDomain",{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          params:{
            domain:data.domain_dev
          }
        })
        if(membersOfDev.status===403)
          return dispatch(fetchUserOfDomainFailure(membersOfDev.message))

        const membersOfDsa=await axios.get("http://localhost:8080/api/v1/coordinator/memberOfDomain",{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          params:{
            domain:data.domain_dsa
          }
        })
        dispatch(fetchUsersOfDomainSuccess({
          devMembers:membersOfDev.data.data,
          dsaMembers:membersOfDsa.data.data
        }));
      } catch (error) {
        dispatch(fetchUserOfDomainFailure(error.message))
      }
    }
    if(data.role=="COORDINATOR")
    membersOfDomain()
  
  },[data])
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
