import React, {useState, useEffect}from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './persons/graphql-mutations'
import { Button, TextField } from '@mui/material'
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';

  export const PhoneForm = ({notifyError}) => {
    const [name, setName] = useState ('')
    const [phone, setPhone] = useState('')

    const [changeNumber, result] = useMutation(EDIT_NUMBER)

    useEffect(() => {
        if(result.data && result.data.editNumber === null){
            console.log("not found")
            notifyError('Person  found')
        }
    }, [result.data])

    const handleSubmit = e => {
        e.preventDefault()

        changeNumber({variables: { name, phone}})

        setName('')
        setPhone('')
    }

    return(
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '91%', borderRadius:'12px' }}>
                <h2>Edit Phone Number</h2>
                <form onSubmit={handleSubmit}>
                <Box mx="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size="small" placeholder='Name' value={name} onChange={ evt => setName(evt.target.value)} /></Box>
                <Box mx="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Phone' value={phone} onChange={ evt => setPhone(evt.target.value)} /></Box>
                <Box mx="auto"><Button variant="contained" color='primary' size='medium' onClick={handleSubmit}>Change Phone</Button></Box>
                 </form>
            </Box>
        </Container>
    )
  }