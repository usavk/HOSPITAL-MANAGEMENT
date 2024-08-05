import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
    <div className='banner'>
       <img src={imageUrl} alt="about Img "/>
    </div>
    <div className='banner'>
      <p>Biography</p>
      <h3>who we are</h3>
      <p>
        Lorem ipsum dotor sit amet,consectetur adipiscing elit. hospital, an institution that is built, staffed, and equipped for 
        the diagnosis of disease; for the treatment, both medical and surgical, of the sick and the injured; and for their housing during this process. 
        The modern hospital also often serves as a centre for investigation and for teaching.
      </p>
      <p>Loerm ipsum hospital, an institution that is built, staffed, and equipped for 
        the diagnosis of disease; for the treatment, both medical and surgical, of the sick and the injured; and for their housing during this process. 
        The modern hospital also often serves as a centre for investigation and for teaching</p>
      <p>Lorem hospital, an institution that is built, staffed, and equipped for 
        the diagnosis of disease; for the treatment, both medical and surgical, of the sick and the injured.</p>
      <p>Loerm ipsum hospital, an institution that is built, staffed, and equipped for 
        the diagnosis of disease</p>
      <p>lorem  45Loerm ipsum hospital, an institution that is built, staffed, and equipped for 
        the diagnosis of disease</p>
    </div>

    </div>
  )
}

export default Biography
