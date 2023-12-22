import React from 'react'
import '../Buttons/Buttons.css'
import { Box } from '@mui/material'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import GroupIcon from '@mui/icons-material/Group';

function Buttons({lifeLines, handleFifty, handleHints, answerIdx, inputAnswer, handleNext, qNumber, results}) {
  return (
    <div className='buttons-div'>
      {!lifeLines.noFifty ? 
        <button className='fifty' onClick={handleFifty}>
          <Box component='span' aria-label='group-icon' sx={{mr: 0.5}}>
            <GroupIcon fontSize='inherit' color='warning' />
          </Box>
          50/50
        </button> :
        <p style={{color: 'red', fontSize: '0.75rem'}}>
          you have used up this lifeline
        </p>
      } 
      {!lifeLines.noHints ? 
        <button className='hints' onClick={handleHints}>
          <Box component='span' aria-label='lightbulb-icon' sx={{mr: 0.5}}>
            <TipsAndUpdatesIcon fontSize='inherit' color='warning' />
          </Box>
          Hints
        </button> :
        <p style={{color: 'red', fontSize: '0.75rem'}}>
          you have used up this lifeline
        </p>
      } 
      <button 
        className={answerIdx === null && !inputAnswer? 'dis-button' : 'next-button'} 
        disabled={answerIdx === null && !inputAnswer}
        onClick={handleNext}
      >
        {qNumber < results.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  )
}

export default Buttons
          