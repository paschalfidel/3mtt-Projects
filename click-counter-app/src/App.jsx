import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const increaseCount = () => {
    if (count < 20) {
      setCount(count + 1);
      setMessage(count + 1 === 20 ? 'Maximum limit reached!' : '');
    }
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
      setMessage('');
    }
  };

  return (
    <>
      
        <h1>Click Counter App</h1>
        <div className="card">
        <h2>Count is {count} </h2>
        {message && <p style={{ color: 'red'}}>{message}</p>}

        <div className='card-add'>
        <button onClick={increaseCount}>Increase</button>
        </div>

        <div className="card-remove">
          <button onClick={decreaseCount}>Decrease</button>
        </div>
      </div>
    </>
  )
}

export default App
