import React from 'react'
import "./style.scss"
import HeroBanner from "./HeroBanner/HeroBanner"
import Trending from './Trending/Trending'

function Home() {
  return (
    <div>
      <HeroBanner/>
      <Trending/>
      <div style={{height:300}}></div>
    </div>
  )
}

export default Home