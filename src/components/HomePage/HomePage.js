import React from 'react'
import '../HomePage/HomePage.css'
import { Button } from '@mui/material'

function HomePage({handleShowApp}) {
  return (
    <div className='home-page'>
      <div className='welcome'>
        <h3>Welcome!</h3>
        <ul>
          <li>There are six(6) questions to be answered.</li>
          <li>The time allocated to a question is ten(10) seconds.</li>
          <li>
            If the answer to a question is not selected or typed within ten(10) seconds, 
            the player gets 0 marks and the next question pops up.
          </li>
        </ul>
        <h5>Good Luck!</h5>
      </div>
      <Button 
        onClick={handleShowApp}
        variant='contained' 
        color='success'
        size='small'
        sx={{position: 'absolute', right: '1%', bottom: '1%', fontWeight: 'bold'}}
      >
        Start
      </Button>
    </div>
  )
}

export default HomePage