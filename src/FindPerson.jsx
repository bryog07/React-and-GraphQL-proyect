import { gql, useLazyQuery } from "@apollo/client"
import React from "react"

const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!){
    findPerson(name: $nameToSearch) {
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

export const findPerson = () => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
}