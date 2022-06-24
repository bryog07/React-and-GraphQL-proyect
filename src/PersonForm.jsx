import React, {useState}from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS } from './persons/graphql-queries'
import { CREATE_PERSON } from './persons/graphql-mutations'
import { Button, TextField, Container } from '@mui/material'
import { Box } from '@mui/material'

  export const PersonForm = ({notifyError}) => {
    const [name, setName] = useState ('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries:[ {query: ALL_PERSONS}],
        onError:(error) =>{
            notifyError(error.graphQLErrors[0].message)
        } 
    })

    const handleSubmit = e => {
        e.preventDefault()

        createPerson({variables: { name, phone, street, city}})

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return(
        <Container fixed maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '400px', borderRadius:'12px' }}>
                <h2>Create New Person</h2>
                  <form onSubmit={handleSubmit}>
                    <Box m="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Name' value={name} onChange={ evt => setName(evt.target.value)} /></Box>
                    <Box m="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Phone' value={phone} onChange={ evt => setPhone(evt.target.value)} /></Box>
                    <Box mx="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Street' value={street} onChange={ evt => setStreet(evt.target.value)} /></Box>
                    <Box mx="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='City' value={city} onChange={ evt => setCity(evt.target.value)} /></Box>
                    <Box mx="auto"><Button variant="contained" color='primary' onClick={handleSubmit}>Add person</Button></Box>
                  </form>
            </Box>
        </Container>
    )
  }