import axios from 'axios'

const pokemonsInstance = axios.create({
  baseURL: `/pokemons`,
})

export const getAllPokemons = () => {
  return pokemonsInstance.get('/')
    .then(result => {
      return result.data
    })
}