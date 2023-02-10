import React from 'react'

function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className='main'>Copyright ©{currentYear}. All Rights Reserved</div>
  )
}

export default Footer