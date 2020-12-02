import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const points = [0,0,0,0,0,0];
  const [votes, setVote] = useState(points);
  let maxVote = Math.max(...votes);  // getting first maximum votes i.e maxVote= 0
  const showRandomAnecdotes = () =>{
      const ran = Math.floor(Math.random() * (anecdotes.length - 1))+0;
      setSelected(ran);
      console.log(anecdotes)
  }

  const Vote =() =>{
    let newArr = [...votes]; // copying the old datas array
    newArr[selected] +=1;
    console.log(newArr)
    setVote(newArr);
    maxVote = Math.max(...votes);  // getting maximum votes everytime after voting
  }

  return (
    <div>
      <h3>Anecdotes of the day</h3>
      <p>{props.anecdotes[selected]}</p>
      <p>voted:{votes[selected]} times</p>
      <button onClick={Vote}>Vote</button>
      <button onClick={showRandomAnecdotes}>Show New Anecdotes</button>

      <h3>Anecdotes with most votes</h3>
      
      <p>{anecdotes[votes.indexOf(maxVote)]} has {maxVote} votes.</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)