import { useState } from 'react'
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Statistic = ({allClicks}) => { 
  const goods = allClicks.filter(el => el === 'good');
  const bads = allClicks.filter(el => el === 'bad');
  const neutrals = allClicks.filter(el => el === 'neutral');
  return (
   <table>
      <tr> 
        <td>good</td>
        <td>{goods.length}</td>
      </tr>
      <tr> 
        <td>neutral</td>
        <td>{neutrals.length}</td>
      </tr>
      <tr> 
        <td>bad</td>
        <td>{bads.length}</td>
      </tr>
      <tr> 
        <td>all</td>
        <td>{allClicks.length}</td>
      </tr>
      <tr> 
        <td>average</td>
        <td>{ (goods.length - bads.length)/allClicks.length }</td>
      </tr>
      <tr> 
        <td>positive</td>
        <td>{ 100 * goods.length / allClicks.length }</td>
      </tr>
   </table>)
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const handleNeturalClick = () => { 
    setAll(allClicks.concat('neutral'))
    setNeutral(neutral + 1)
  }
  const handleGoodClick = () => { 
    setAll(allClicks.concat('good'))
    setGood(good + 1)
  }
  const handleBadClick = () => { 
    setAll(allClicks.concat('bad'))
    setBad(bad + 1)
  }
  if (allClicks.length == 0){
    return (
      <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeturalClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <h2>Statistic</h2>
        No Feedback given
    </div>
    )
    }
  
  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeturalClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>Statistic</h2>
      <Statistic allClicks={allClicks}/>
    </div>
  )
}

export default App