import { useState } from 'react'

const Button = ({text, action}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

const StatisticLine = ({name, value}) => {
  return (
    <tr><td>{name}</td><td>{value}</td></tr>
  )
}

const Statistics = (props) => {
  const [good, bad, neutral] = props.counters
  const sum = () => good + bad + neutral
  const average = () => (good - bad) / sum()
  const positive = () => `${(good / sum()) * 100} %`
  
  if (sum() <= 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <table><tbody>
    <StatisticLine name="good" value={good} />
    <StatisticLine name="neutral" value={neutral} />
    <StatisticLine name="bad" value={bad} />
    <StatisticLine name="all" value={sum()} />
    <StatisticLine name="average" value={average()} />
    <StatisticLine name="positive" value={positive()} />
    </tbody></table>
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
    <Statistics counters={[good, bad, neutral]} />
    </>  
  )
}

export default App
