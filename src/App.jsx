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
      <Grid item xs={12} container style={{ background: "white"}} >
      <PersonForm notifyError={notifyError} />
        <PhoneForm notifyError={notifyError} /> 
      </Grid>
      
      
      {loading 
        ? <p>Loading...</p>
        : <Grid item xs={0} style={{ background: "white"}}><Persons persons={data?.allPersons} /> </Grid> 
        }
       <Notify errorMessage={errorMessage} />
 
       </header>
  )
}

export default App
 