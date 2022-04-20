import React from 'react'
import About from './About'
import Home from './Home'
import Navbar from './Navbar'
import Menu from './Menu'
import Book from './Book'
import Service from './Service'

function Main() {
    return (
        <div>
            <Navbar/>
            <Home/>
            <About/>
            <Service/>
            <Menu/>
            <Book/>
            
        </div>
    )
}

export default Main
