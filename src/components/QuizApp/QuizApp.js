import React, { useState, useEffect} from 'react'
import '../QuizApp/QuizApp.css'
import Quiz from '../Quiz/Quiz'
import { questions } from '../questions'
import Buttons from '../Buttons/Buttons'
import Result from '../Result/Result'
import Time from '../Time/Time'

function QuizApp({handleHideApp}) {
  const [qNumber, setQNumber] = useState(0)
  const [answerIdx, setAnswerIdx] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [checkAnswer, setCheckAnswer] = useState({
    correct: 0,
    wrong: 0,
  })
  const [showResult, setShowResult] = useState(false)
  const [inputAnswer, setInputAnswer] = useState('')
  const [lifeLines, setLifeLines] = useState({
    fifty: 1, hints: 2, noFifty: false, noHints: false})
  const [showTime, setShowTime] = useState(true)

  useEffect(()=> {
    document.title = 'Quiz App'
  }, [])  
 
  const results = questions.results
  const {question, 
    type, 
    correct_answer, 
    options} = results[qNumber]

    function pickAnswer(option, index) {
      setAnswerIdx(index)
      if (option === correct_answer) {
        setAnswer(true)
      } else {
        setAnswer(false)
      }
    }

    const handleAnswer = (answerChoice)=> {
      if (qNumber < results.length - 1) {
        setQNumber(qN => qN + 1)
      }
       
      if (answerChoice || inputAnswer.toLowerCase() === correct_answer.toLowerCase()) {
        setScore(s => s + 5)
        setCheckAnswer(prev => {
          return {...prev, correct: prev.correct + 1}
        })
      } else {
        setCheckAnswer(prev => {
          return {...prev, wrong: prev.wrong + 1}
        })
      }

      setAnswerIdx(null)
      setAnswer(null)
      setInputAnswer('')
      
      if (qNumber === results.length - 1) {
        setShowResult(true)
        setShowTime(false)
        setQNumber(0)
        setLifeLines(prev => {
          return {...prev, fifty: 1, hints: 2}
        })
      }
    }

    const handleFifty = ()=> {
      if (lifeLines.fifty > 0) {
        setLifeLines(prev=> {
          return {...prev, fifty: prev.fifty - 1}
        })

        const options = document.querySelectorAll('.option')
        let answerIndex
  
        options.forEach((option, index) => {
          if (option.innerHTML.toLowerCase() === correct_answer.toLowerCase()) {
            answerIndex = index
          }
        })
  
          while (true) {
            const random1 = Math.floor(Math.random() * 4)
            const random2 = Math.floor(Math.random() * 4)
  
            if (random1 !== random2) {
              if ((answerIndex !== random1) && (answerIndex !== random2)) {
                options[random1].style.visibility = 'hidden'
                options[random2].style.visibility = 'hidden'
  
                break;
              }
            }
          }
        } else {
            setLifeLines(prev => {
              return {...prev, noFifty: !prev.noFifty}
            })
            setTimeout(()=> {
              setLifeLines(prev => {
                return {...prev, noFifty: !prev.noFifty}
              })
            },1000)
        }
      }

    const handleHints = ()=> {
      if (lifeLines.hints > 0) {
        setLifeLines(prev=> {
          return {...prev, hints: prev.hints - 1}
        })

        const options = document.querySelectorAll('.option')
        let answerIndex

        options.forEach((option, index) => {
          if (option.innerHTML.toLowerCase() === correct_answer.toLowerCase()) {
            answerIndex = index
          }
        })

        while (true) {
          const random = Math.floor(Math.random() * 4)

            if (answerIndex !== random) {
              options[random].style.visibility = 'hidden'

              break;
            }
        }
      }  else {
        setLifeLines(prev => {
          return {...prev, noHints: !prev.noHints}
        })
        setTimeout(()=> {
          setLifeLines(prev => {
            return {...prev, noHints: !prev.noHints}
          })
        },1000)
      }
    }

    const handleNext = ()=> {
      setShowTime(false)
      handleAnswer(answer)
      if (qNumber < results.length - 1) {
        setTimeout(()=> {
          setShowTime(true)
        })     
      }
    }

    const onTimeUp = ()=> {
      setShowTime(false)
      setAnswer(false)
      handleAnswer(answer)
      if (qNumber < results.length - 1) {
        setTimeout(()=> {
          setShowTime(true)
        })     
      }
    }

  return (
    <div className='app-container'>
      {showTime && <Time onTimeUp={onTimeUp} duration={100} />}
      {
        !showResult ? (
          <>
            <Quiz
              qNumber={qNumber}
              results={results}
              question={question}
              type={type}
              options={options}  
              pickAnswer={pickAnswer}
              answerIdx={answerIdx}
              inputAnswer={inputAnswer}
              setInputAnswer={setInputAnswer}
            />
            <Buttons
              lifeLines={lifeLines}
              handleFifty={handleFifty} 
              handleHints={handleHints} 
              answerIdx={answerIdx} 
              inputAnswer={inputAnswer} 
              handleNext={handleNext} 
              qNumber={qNumber}
              results={results}
            />
          </>
        ) : (
          <Result 
            score={score}
            setScore={setScore}
            checkAnswer={checkAnswer}
            setCheckAnswer={setCheckAnswer}
            setShowResult={setShowResult}
            results={results} 
            setShowTime={setShowTime} 
            handleHideApp={handleHideApp}
          />
        )
      }
    </div>
  )
}

export default QuizApp