import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [google_status, set_google_status] = useState()
  const [amazon_status, set_amazon_status] = useState()
  const [status, setStatus] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/v1/all-status')
    .then(response => {
      setStatus(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  })

  return (
    <div>
      <ul>
        {status.map(item => (
          <li>
            <strong>URL:</strong> {item.url}<br/>
            <strong>Status Code:</strong> {item.statusCode}<br/>
            <strong>Duration:</strong> {item.duration} ms<br/>
            <strong>Date:</strong> {item.date}<br/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
