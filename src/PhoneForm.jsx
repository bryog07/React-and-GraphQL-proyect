import React, {useState, useEffect}from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './persons/graphql-mutations'
import { Button, createTheme, Dialog, DialogActions, DialogContent, responsiveFontSizes, TextField, ThemeProvider, Typography } from '@mui/material'
import Box from '@material-ui/core/Box';
import { DialogTitle } from '@material-ui/core';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  dialoTitle:{
      background: "#cfe8fc",
      textAlign: "center"
  }
})


  export const PhoneForm = ({notifyError}) => {
    const [name, setName] = useState ('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [changeData, result] = useMutation(EDIT_NUMBER)

    useEffect(() => {
        if(result.data && result.data.editNumber === null){
            console.log("not found")
            notifyError('Person  found')
        }
    }, [result.data])

    const handleSubmit = e => {
        e.preventDefault()

        changeData({variables: {name, phone, street, city}})

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

    const classes = useStyles()


    return(
        <div>
          <Button variant="contained" color="secondary" size='small' startIcon={<ModeEditIcon/>} onClick={handleOpen} >
            Edit
          </Button>
         <Dialog open={open} onClose={handleClose}>
          <DialogTitle className= {classes.dialoTitle} component="h1" >Edit Person</DialogTitle>
          <DialogContent dividers>
          <ThemeProvider theme={theme}>
          <Typography variant="h5" gutterBottom>
            <Box m="auto"><TextField variant="outlined" margin='normal' size='small' placeholder='Name' helperText="Please enter your name" type="text" value={name} onChange={ evt => setName(evt.target.value)} /></Box>
            </Typography>
            <Typography variant="h5" gutterBottom>
            <Box m="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Phone' helperText="Please enter your phone" value={phone} onChange={ evt => setPhone(evt.target.value)} /></Box>
            </Typography >
            <Typography variant="h5" gutterBottom>
            <Box m="auto"><TextField id="outlined-basic" variant="outlined" margin='normal' size='small' placeholder='Street' helperText="Please enter your street" type="text" value={street} onChange={ evt => setStreet(evt.target.value)} /></Box>
            </Typography>
            <Typography variant="h5" gutterBottom>
            <Box m="auto"><TextField variant="outlined" margin='normal' size='small' placeholder='City' helperText="Please enter your city" type="text" value={city} onChange={ evt => setCity(evt.target.value)} /></Box>
            </Typography>
            </ThemeProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color='primary' onClick={handleSubmit}>save</Button>
            <Button variant="contained" color='primary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
         </Dialog>
        </div>
    )
  }