import { gql } from '@apollo/client';

export const CREATE_JOURNEY_MUTATION = gql`
  mutation travel($data: Array) {
    travel(data: $data) {
      steps {
        Id
        Name
        Town
        Class1
        Class2
        Class3
        Toldescribe
        Picture1
        Opentime
        Px
        Py
      }
    }
  }
`;

export const GET_LINESTRING = gql`
  mutation getLineString( $data: String ) {
    getLineString( data: $data ) {
      geojson
    }
  }
`;

export const search_QUERY = gql
  `
mutation search_QUERY( $Name: String, $Town: String) {
  search( Name: $Name, Town: $Town){
    Name
    Id
    Town
    Picture1
    class_result{
      first
      second
      third
    }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($Name: String!, $Email: String!, $Password: String!){
    register(Name: $Name, Email: $Email, Password: $Password){
      Name
      Email
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($Email: String!, $Password: String!){
    login(Email: $Email, Password: $Password){
      Name
      Email
      Token
    }
  }
`

export const AUTHTOKEN_MUTATION = gql`
  mutation authToken($Email: String, $Token: String){
    authToken(Email:$Email, Token: $Token){
      Name
      Email
      Token
    }
  }
`

export const CHANGEPASS_MUTATION = gql`
  mutation changePass($Email: String, $currentPassword: String, $passwordToChange: String){
    changePass(Email: $Email, currentPassword: $currentPassword, passwordToChange:$passwordToChange){
      Email
    }
  }
`

export const ADDFAV_MUTATION = gql`
  mutation addFav($Email: String!, $Name: String!){
    addFav(Email: $Email, Name: $Name){
      Name
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

export const DELFAV_MUTATION = gql`
mutation delFav($Email: String!, $Name: String!){
  delFav(Email: $Email, Name: $Name){
    Name
    Favourites{
      Id
      Name
      Town
      Class1
      Class2
      Class3
      Toldescribe
      Picture1
      Opentime
      Px
      Py
    }
  }
}
`

export const REPORT_MUTATION = gql`
  mutation report($Email: String!, $Report: String!, $Time: String!){
    report(Email: $Email, Report: $Report, Time: $Time){
      Email
      Report
      Time
    }
  }
`
