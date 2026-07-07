import './HomePage.css'
import React from 'react'
import RightSection from './RightSection/RightSection'
import LeftSection from './LeftSection/LeftSection'

const HomePage = () => {
  return (
    <div className="HomePage">
        <section className="section1">
            <RightSection />
        </section>

        <section className="section2">
            <LeftSection />
        </section>
    </div>
  )
}

export default HomePage