import React from 'react'
import { Button, Container } from 'react-bootstrap'

export default function ShopNow() {
  return (
  <Container  style={{ boxShadow:"inset 0 0 100px #e4ebdd"  }} fluid className='mt-5 p-5'>
<div className='d-flex justify-content-between flex-wrap'>
    <div className='col-md-12 col-lg-6'>
    <h2>Speed laptop</h2>
<p className='text-secondary'>What determines the speed of my laptop computer? If you want an efficient laptop for your needs, you should consider laptop speed as one of the major factors.</p>
<button className='btn btn-success'>Shop Now</button>
    </div>
    <div  className='me-5 mt-2'>
<img className='img-fluid rounded' src={require("../../images/download.png")} />
    </div>
</div>
  </Container>
  )
}
