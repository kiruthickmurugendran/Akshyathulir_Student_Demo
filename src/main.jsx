import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './RegistrationForm.jsx';
import StudentNetworkModule from './studentNetwork';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentNetworkModule/>
  </React.StrictMode>,
)