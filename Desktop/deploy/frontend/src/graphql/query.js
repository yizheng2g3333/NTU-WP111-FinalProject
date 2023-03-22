import { gql } from '@apollo/client';


export const QUERY = gql
`
query QUERY( $Class1: String) {
  spot( Class1: $Class1){
    Id
    Name
    Class1
    Toldescribe
    Town
    Picture1
    Opentime
    Px
    Py
    }
  }
`;

export const singleQUERY = gql
`
query QUERY( $Id: String) {
  singlespot( Id: $Id){
    Name
    Region
    Class1
    Toldescribe
    Town
    Picture1
    Opentime
    Website
    }
  }
`;

export const MYFAV_QUERY = gql`
  query myFav($Email: String!){
    myFav(Email: $Email){
      Filter{
        nature
        art
        eat
        spa
        play
        sport
      }
      Favourites{
        Id
        Name
        Toldescribe
        Picture1
        Opentime
      }
    }
  }
`

