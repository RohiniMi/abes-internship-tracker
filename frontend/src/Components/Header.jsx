import React from 'react'
import Dashboard from './Dashboard'

const Header = () => {
  return (
    <div>
      <div >
        <h1 style={{ backgroundColor: '#e28743', height: '60px', textAlign: 'center' }}>Student Internship Tracker</h1>
      </div>
      <Dashboard/>
    </div>

  )
}

export default Header