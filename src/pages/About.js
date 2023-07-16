import React from 'react'

function About({userData}) {
  const print=()=>{
    console.log(userData);
  }
  return (
    <div>
     <buttom className="print" onClick={print}>Print</buttom>
    </div>
  )
}

export default About