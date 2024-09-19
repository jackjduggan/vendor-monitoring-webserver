import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [status, setStatus] = useState([])

  const fetchStatus = async () => {
    axios.get('http://localhost:5000/v1/all-status')
    .then(response => {
      setStatus(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    fetchStatus(); // initial fetch

    const intervalId = setInterval(fetchStatus, 60000); // fetch every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Vendor Monitoring Screen</h1>
      <ul>
        {status.map(item => (
          <li>
            <h3>{item.url}</h3>
            <strong>Status Code:</strong> {item.statusCode}<br></br>
            <strong>Duration:</strong> {item.duration} ms<br></br>
            <strong>Date:</strong> {item.date}<br></br>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
