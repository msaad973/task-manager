import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicCard from './components/Card.jsx'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Navbar from './components/Navbar.jsx'
import Tasks from './components/Tasks.jsx'

function App() {

  return (
    <div className="">
      <Navbar />
      <Tasks />
    </div>
  )
}




export default App
