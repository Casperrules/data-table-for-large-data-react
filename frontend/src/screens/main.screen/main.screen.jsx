import React from 'react'
import Navbar from '../../components/navbar.component/navbar.component'
import HomeScreen from '../home.screen/home.screen';
import Sidebar from '../../components/sidebar.component/sidebar.component';
import './main.screen.css'

export default function MainScreen() {
  return (
    <div className='container'>
        <div className='row'>
                <Sidebar/>
            <div className='column'>
                <Navbar/>
                <HomeScreen/>
            </div>
        </div>
    </div>
    
    
  )
}
