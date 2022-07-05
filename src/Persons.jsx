import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, createTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core";
import { PhoneForm } from "./PhoneForm";
import { makeStyles } from "@material-ui/core";

const FIND_PERSON = gql`
query findPersonByName($idToSearch: String!){
    findPerson(id: $idToSearch) {
      name
      phone
      id
      address{
        street
        city
      }
    }
  }
`
const useStyles = makeStyles({
  dialoTitle:{
    background:"#cfe8fc",
    textAlign: "center"
  }
})
export const Persons = ({persons}) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = id => {
        getPerson({variables: {idToSearch: id}})
    }

    useEffect(() => {
        if(result.data) {
            setPerson(result.data.findPerson)
        }
    
    },[result])
    const classes = useStyles()
    
    if(person){
      let theme = createTheme();
      theme = responsiveFontSizes(theme);

      
      return (
      <div >
        <Dialog open={Boolean(showPerson)} >
          <DialogTitle 
          className={classes.dialoTitle}
          component="h1" >{person.name}
          </DialogTitle>
          <DialogContent dividers>
          <ThemeProvider theme={theme}>
            <Typography variant="h5" gutterBottom>
               {person.phone}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {person.address.street}
            </Typography >
            <Typography variant="h5" gutterBottom >
                {person.address.city}
            </Typography>
            </ThemeProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color='primary' onClick={() => setPerson()}>Cancel</Button>
          </DialogActions>
        </Dialog>
    </div> 
    )
    }
    if (persons === null) return null
    return (
      
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
       <TableHead>
          <TableRow style={{backgroundColor:'#cfe8fc', color: 'red'}}>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Street</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Actions</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
       </TableHead>
        <TableBody>
          {persons.map((person) => (
            <TableRow key={person.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell align="right">{person.name}</TableCell>
              <TableCell align="right">{person.phone}</TableCell>
              <TableCell align="right">{person.address.street}</TableCell>
              <TableCell align="right">{person.address.city}</TableCell>
              <TableCell align="right"><Button variant="outlined" color='primary'onClick={() => {showPerson(person.id)}}>See Info</Button></TableCell>
              <TableCell><PhoneForm/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
