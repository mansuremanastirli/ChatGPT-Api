import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const getMessage = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post("http://localhost:5000/completions", { message }).then(res => {
      console.log(res.data)
      setResponse(res.data.choices[0].message.content)
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    })


  }

  useEffect(() => {
    console.log(message)
  })

  return (
    <div>
      <h1>ChatGPT API Example</h1>
      <form onSubmit={getMessage}>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required onChange={e => setMessage(e.target.value)}></textarea>

        <button type="submit">Send</button>
      </form>
     <span id='loading'>{isLoading ? <label id='loading' htmlFor='message'>Response Loading...</label> : null }</span>
      <div className="result">
        <h2>Response:</h2>
        <p id="response">{response}</p>
      </div>

    </div>
  );
}

export default App;
