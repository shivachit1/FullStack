import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };

  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h3>Give us Feedback</h3>
      <Button text="Good" sendFeedback={goodFeedback} />
      <Button text="Neutral" sendFeedback={neutralFeedback} />
      <Button text="Bad" sendFeedback={badFeedback} />
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.sendFeedback}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all + "%";

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <div>
      <table width={120}>
      <tbody>
        <tr>
          <td style={{width:'50%'}}>{text}</td>
          <td style={{ textAlign: 'left',width:'50%'}}>{value}</td>
        </tr>
      </tbody>
    </table>
    </div>
    
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
