import axios from 'axios'

const pokemonsInstance = axios.create({
  baseURL: `http://localhost:3001/pokemons`,
})

export const getAllPokemons = () => {
  return pokemonsInstance.get('/')
    .then(result => {
      return result.data
    })
}