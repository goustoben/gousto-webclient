import React from 'react'

const Navbar = ({items, onClick}) => (
  <ul>
    {items.map(item => (
      <li key={item} >
        <button type="button" onClick={onClick}>{item}</button>
      </li>
    ))}
  </ul>
)

export { Navbar }
