import React from 'react'
import Navbar from '../Header/Navbar'

import { Link } from 'react-router-dom'

import './Dashboard.css'
import DashboardTable from './DashboardTable'

const Dashboard = () => {
  return (
    <>
        <Navbar />

        <div className='dashboard-container'>

          <h1 className='dashboard-heading'>Your Codeshares</h1>

          <Link to={'/new'} className='dashboard-button' >New Codeshare</Link>

          <DashboardTable />
        
        </div>

    </>
  )
}

export default Dashboard