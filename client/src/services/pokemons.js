import axios from 'axios'

const pokemonsInstance = axios.create({
  baseURL: `https://chartjs-dashboard-api.herokuapp.com/pokemons`,
})

export const getAllPokemons = () => {
  return pokemonsInstance.get('/')
    .then(result => {
      return result.data
    })
}