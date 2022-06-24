import { Alert } from "@mui/material"

export const Notify = ({errorMessage}) => {
    if(!errorMessage) return null 

    return (
        <div style={{color:'red', position:'fixed', top : 0, alignContent:"center",width:"100%"}}>
            <Alert severity="error">{errorMessage}</Alert>
        </div>
    )
}