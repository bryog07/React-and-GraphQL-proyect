import React, { useState } from 'react'
import './App.css' 
import { Persons} from './Persons'
import { PersonForm } from './PersonForm'
import { usePersons } from  './persons/custom-hooks'
import { Notify } from './Notify'
import { PhoneForm } from './PhoneForm'
import { Grid } from '@mui/material'


function App() {
  const {data, loading, error} = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)

  if(error) return <span style='color: red'>{error}</span>

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  return (
      <header className='App'> 
      <PersonForm notifyError={notifyError} />
      
      
      {loading 
        ? <p>Loading...</p>
        : <Persons persons={data?.allPersons} /> 
        }
       <Notify errorMessage={errorMessage} />
 
       </header>
  )
}

export default App
 