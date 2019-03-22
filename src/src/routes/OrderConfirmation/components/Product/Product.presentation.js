import React from 'react'

export const ProductPresentation = ({
  title,
  listPrice,
  imgSource
}) => (
  <div>
    <div>
      <img src={imgSource} alt={title} />
    </div>
    <div>
      <div className='productTitle'>{title}</div>
      <p className='productPrice'>£{listPrice}</p>
    </div>
  </div> 
)
