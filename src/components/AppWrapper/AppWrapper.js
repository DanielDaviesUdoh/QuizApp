import React, {useState} from 'react'
import QuizApp from '../QuizApp/QuizApp'
import HomePage from '../HomePage/HomePage'

function AppWrapper() {
  const [showApp, setShowApp] = useState(false)

  const handleShowApp = ()=> {
    setShowApp(true)
  }

  const handleHideApp = ()=> {
    setShowApp(false)
  }

  return (
    <div>
      { 
        showApp ? 
        <QuizApp handleHideApp={handleHideApp} /> : 
        <HomePage handleShowApp={handleShowApp} /> 
      }
    </div>
  )
}

export default AppWrapper
      