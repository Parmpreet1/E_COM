import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserInfoForm } from '../../components/UserInfoForm'

export const UserProfile = () => {
  const pathname=window.location.pathname
  let taskName;
  useMemo(() => {
    if(pathname=="/user_signup"){
      taskName="Register New User"
    }
    else if(pathname=="/user_profile"){
      console.log(pathname)
      taskName="User Profile"
    }
    else if(pathname=="/update_profile"){
      taskName="Update User Profile"
    }
  }, [pathname])
  
  
  return (
    <div><UserInfoForm taskName={taskName}/></div>
  )
}
