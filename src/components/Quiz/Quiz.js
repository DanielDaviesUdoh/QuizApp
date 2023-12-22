import React from 'react'
import '../Quiz/Quiz.css'

function Quiz(props) {
  const {
    qNumber,
    results, 
    question, 
    type, 
    options, 
    pickAnswer, 
    answerIdx, 
    inputAnswer, 
    setInputAnswer} = props
    
  const option =  type === 'multiple' ?
    options.map((option, index) => {   
      return (
        <p 
          className='option' 
          style={{backgroundColor: answerIdx === index? 'white' : null}}
          onClick={()=>pickAnswer(option, index)}
          key={option}
        >
          {option}
        </p> 
      )
    }) : (
      <input 
        className='input-answer'
        placeholder='enter answer here'
        type='text'
        style={{
          margin: '0 2.5em 0 2em',
          padding: '0.2em 0.8em',
          fontSize: '1.2rem',
          width: '76%',
          borderBottom: '1px solid grey',
          borderRadius: '4px'
        }}
        value={inputAnswer}
        onChange={(e)=> setInputAnswer(e.target.value)}
      />   
    )             
                         
  return (
    <>
      <p className='num'>
        <span className='question-num'>{qNumber+1}</span>
        <span className='total-q'>/{results.length}</span>
      </p> 
      <p className='question'>
        {question} {'  '}
        {type === 'boolean' && <span className='boolean'>True/False</span>}
      </p>
      {option}
    </>
  )
}

export default Quiz