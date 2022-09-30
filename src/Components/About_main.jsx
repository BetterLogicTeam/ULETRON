import React from 'react'
import { Link } from 'react-router-dom'
import About from './About/About'
import Footer from './Footer/Footer'
import Headers from './Header/Header'

function About_main() {
  return (
    <div>
        <Headers/>
        <section class="page-header-section style-1 ">
        <div class="container">
            <div class="page-header-content">
                <div class="page-header-inner">
                    <div class="page-title">
                        <h2 style={{color:'white'}}>About Us </h2>
                    </div>
                    <ol class="breadcrumb">
                        <li><Link to="/" style={{color:'white'}}>Home</Link></li>
                        <li class="active " style={{color:'white'}}>About Us</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <About />
    <Footer />
    </div>
  )
}

export default About_main