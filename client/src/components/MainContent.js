import React from 'react';

export default function MainContent(props) {
  return (
    <div className='mainContent'>
      {props.children}
    </div>
  )
}