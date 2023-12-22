import React, {useState, useEffect, useRef} from 'react'
import '../Time/Time.css'

function Time({onTimeUp, duration}) {
  const [sec, setSec] = useState(0)
  const [prog, setProg] = useState(0)
  const timeRef = useRef(null)

  const styles = {
    width: `${prog}%`,
    backgroundColor: `${prog < 60 ? 'green' : (prog < 80 ? 'orange' : 'red')}`
  }

  useEffect(()=> {
    timeRef.current = setInterval(()=>{
      setSec(s => s + 1)
    }, 100)

    return () => clearInterval(timeRef.current)
  }, [])

  useEffect(()=> {
    setProg((sec/duration) * 100)
    if (sec > duration) {
      onTimeUp()
      clearInterval(timeRef.current)
    }
  }, [sec])

  return (
    <div className='time' style={styles}></div>
  )
}

export default Time
