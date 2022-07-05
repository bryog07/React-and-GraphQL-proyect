import React from "react"
import { gql } from "@apollo/client"

export const CREATE_PERSON = gql` 
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String, ){
    addPerson(
      name: $name
      phone: $phone
      street: $street
      city: $city 
    ) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
  `

  export const EDIT_NUMBER = gql`
  mutation editNumber($id: String!, $name: String, $phone: String!, $street: String!, $city: String!){
    editNumber( id: $id, name: $name, phone: $phone, street: $street, city: $city) {
      name
      phone 
      address{
      street
      city
    }
      id
    }
  }
  `