import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
  gql
} from "@apollo/client";

interface movieStructure {
  name: String,
  genre: String,
  year: String
}

function App() {

  const [name, setName] = useState<string>("")
  const [genre, setGenre] = useState<string>("")
  const [year, setyear] = useState<string>("")

  const [refresh, setRefresh] = useState<boolean>(false)


  let data: any = gql`
    {
      movies {
        name
        genre
        year
      }
    }
  `

  // let mutation: any = gql`
  //   mutation addMovie($name: String!, $genre: String!, year: String!) {
  //     post(name: $name, year: $year, genre: $genre) {
  //       name
  //       genre
  //       year
  //     }
  //   }
  // `

  const CREATE_LINK_MUTATION = gql`
  mutation AddMovie($name: String!, $genre: String!, $year: String!) {
    addMovie(name: $name, genre: $genre, year: $year) {
      name
      year
      genre
    }
  }
`;

  const [add] = useMutation(CREATE_LINK_MUTATION);
  const get = useQuery(data);



  data = useQuery(data)
  let movieList = data.data && data.data.movies ? data.data.movies : []
  // console.log(data)
  // setMovie(movieList)

  console.log(movieList)
  return (
    <div>
      <div className="App">
        {
          movieList.map((_movie: movieStructure) => {
            return (
              <div>
                <h2>{_movie.name}</h2>
                <p>{_movie.genre}</p>
                <p>{_movie.year}</p>
              </div>
            )
          })
        }

      </div>

      <div style={{ margin: 20, display: 'column' }}>
        <form onSubmit={ async (e) => {
          e.preventDefault()
          let res = await add(
            {
              variables: {
                name: name,
                year: year,
                genre: genre
              }
            }
          )
          console.log(res)
        }}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          <label>Year</label>
          <input type="text" value={year} onChange={(e) => setyear(e.target.value)} required />

          <button type='submit'>Add a movie</button>

        </form>


      </div>
    </div >
  );
}

export default App;
