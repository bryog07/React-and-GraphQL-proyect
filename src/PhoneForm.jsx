import React, {useState, useEffect}from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './persons/graphql-mutations'
import { Button, createTheme, Dialog, DialogActions, DialogContent, responsiveFontSizes, TextField, ThemeProvider, Typography } from '@mui/material'
import Box from '@material-ui/core/Box';
import { DialogTitle } from '@material-ui/core';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


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
    let theme = createTheme();
      theme = responsiveFontSizes(theme);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <div>
          <Button variant="contained" color="secondary" size='small' startIcon={<ModeEditIcon/>} onClick={handleOpen} >
            Edit phone
          </Button>
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