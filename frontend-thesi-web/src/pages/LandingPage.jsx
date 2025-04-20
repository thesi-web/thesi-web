import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import CanvaSection from '../components/Sections/CanvaSection'
import Pillars from '../components/Sections/Pillars'

const LandingPage = () => {
  return (
    <main>
        <NavBar/>
        <CanvaSection />
        <Pillars/>
    </main>
  )
}

export default LandingPage