import React from 'react'

export const AdminDashboard = () => {
  return (<>
    <h1 className=' text-primary text-center'>Admin Dashboard</h1>
    <div className='container-fluid rounded-3 border border-primary justify-content-center'>
      <div className="row gap-3 p-3">
        <div className='col-6 bg-light'>
        <h3>Business Analysis</h3>
        </div>
        <div className='col-4 bg-light'>
        <h3>Orders</h3>
        </div>
        <div className='col-4 bg-light align-self-center'>
        <h3>Currently logged in users</h3>
        </div>
      </div>
      
    </div>
  </>
  )
}
