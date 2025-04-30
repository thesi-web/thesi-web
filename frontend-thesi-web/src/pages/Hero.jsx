import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import CanvaSection from '../components/Sections/CanvaSection'
import Pillars from '../components/Sections/Pillars'
import News from '../components/Sections/News'
import Services from '../components/Sections/Services'
import CaseStudies from '../components/Sections/CaseStudies'
import Footer from '../components/Footer/Footer'

const Hero = () => {
  
  return (
    <main>
        <NavBar/>
        <CanvaSection />
        <News />
        <Services />
        <CaseStudies/>
        <Pillars/>
        <Footer/>
    </main>
  )
}

export default Hero