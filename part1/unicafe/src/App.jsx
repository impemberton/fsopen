import { useState } from 'react'

const Button = ({text, action}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

const Stat = ({name, count}) => {
  return (
    <p>{name} {count}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const makeIncrementer = (counter, setter) => () => setter(counter + 1)
  const sum = () => good + bad + neutral
  const average = () => (good - bad) / sum()
  const positive = () => `${(good / sum()) * 100} %`

  return (
    <>
    <h1>give feedback</h1>
    <Button text="good" action={makeIncrementer(good, setGood)}/>
    <Button text="neutral" action={makeIncrementer(neutral, setNeutral)}/>
    <Button text="bad" action={makeIncrementer(bad, setBad)}/>
    <h1>statistics</h1>
    <br />
    <Stat name="good" count={good} />
    <Stat name="neutral" count={neutral} />
    <Stat name="bad" count={bad} />
    <Stat name="all" count={sum()} />
    <Stat name="average" count={average()} />
    <Stat name="positive" count={positive()} />
    </>  
  )
}

export default App
