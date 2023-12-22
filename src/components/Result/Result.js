import React, {useState,useEffect} from 'react'
import '../Result/Result.css'
import Table from '../Table/Table'

function Result(props) {
  const {
    score,
    setScore, 
    checkAnswer,
    setCheckAnswer, 
    setShowResult, 
    results, 
    setShowTime, 
    handleHideApp} = props   
  const [input, setInput] = useState('')
  const [savedData, setSavedData] = useState([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem('savedData'))
    if (data) {
      setSavedData(data)
    }
  }, [])

  useEffect(()=> {
    if (savedData) {
      localStorage.setItem('savedData', JSON.stringify(savedData))
    }
  }, [savedData])

  const handleTryAgain = ()=> {
    setShowResult(false)
    setScore(0)
    setShowTime(true)
    setCheckAnswer(prev => {
      return {...prev, correct: 0, wrong: 0}
    })
  }

  const handleExit = ()=> {
    handleHideApp()
    setShowResult(false)
    setScore(0)
    setShowTime(true)
    setCheckAnswer(prev => {
      return {...prev, correct: 0, wrong: 0}
    })
  }

  const handleSubmit = (e)=> {
    e.preventDefault()

    if (input !== '') {
      setSavedData(prevData => {
        return [...prevData, {name: input, result: score}]
      })
    }
   
    setInput('')
    setIsSaving(!isSaving)
  }

  const sortSavedData = savedData.sort((a, b) => b.result - a.result).slice(0,3)

  return (
    <div className='result-container'>
      <h3>Session Result</h3>
      <ul>
        <li>Total Questions - {results.length}</li>
        <li>Score - {score}</li>
        <li>Correct Answers - {checkAnswer.correct}</li>
        <li>Wrong Answers - {checkAnswer.wrong}</li>
      </ul>
      {isSaving ? (
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='Enter your name'
            value={input} 
            onChange={(e)=> setInput(e.target.value)} />
            <button 
              className='submit-button' 
              type='submit'
            >
              Save
            </button>
        </form> 
      ) : (
        <button 
          className='result-button'
          onClick={()=> setIsSaving(!isSaving)}
        >
          Save result
        </button>
      )}
      <Table sortSavedData={sortSavedData} />
      <button className='try-button' onClick={handleTryAgain}>Try Again</button>
      <button className='exit-button' onClick={handleExit}>Exit Game</button>
    </div>
  )
}

export default Result