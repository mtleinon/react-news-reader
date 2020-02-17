import React from 'react';

export default function NavBar(props) {
  return (
    <div className='navbar'>
      {props.children}
    </div>
  );
}