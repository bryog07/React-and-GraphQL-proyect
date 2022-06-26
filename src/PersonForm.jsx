import React, {useState}from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS } from './persons/graphql-queries'
import { CREATE_PERSON } from './persons/graphql-mutations'
import { Button, TextField, Container, Typography, Dialog, DialogTitle, DialogContent, ThemeProvider, createTheme, responsiveFontSizes, DialogActions, AppBar, Toolbar } from '@mui/material'
import { Box } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

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

    let theme = createTheme();
      theme = responsiveFontSizes(theme);

        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {setOpen(true)};
        const handleClose = () => {setOpen(false)};
      
       
    return(
      <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#556cd6"}}>
          <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button variant="contained" color="primary" position="rigth" size='small' startIcon={<PersonAddAltIcon/>} onClick={handleOpen} >
            Add Person
          </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle component="h1" style={{backgroundColor:'#cfe8fc', textAlign:"center",}} >Create Person</DialogTitle>
          <DialogContent dividers>
          <ThemeProvider theme={theme}>
            <Typography variant="h5" gutterBottom>
            <Box m="auto"><TextField variant="outlined" margin='normal' size='small' placeholder='Name' helperText="Please enter your name" type="text" value={name} onChange={ evt => setName(evt.target.value)} /></Box>
            </Typography>
            <Typography variant="h5" gutterBottom>
            <Box m="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Phone' value={phone} onChange={ evt => setPhone(evt.target.value)} /></Box>
            </Typography >
            <Typography variant="h5" gutterBottom >
            <Box mx="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Street' value={street} onChange={ evt => setStreet(evt.target.value)} /></Box>
            </Typography>
            <Typography variant="h5" gutterBottom >
            <Box mx="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='City' value={city} onChange={ evt => setCity(evt.target.value)} /></Box>
            </Typography>
            </ThemeProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color='primary' onClick={handleSubmit}>Add</Button>
            <Button variant="contained" color='primary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        </div>
        
    )
}