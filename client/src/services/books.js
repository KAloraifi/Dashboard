import axios from 'axios'

const booksInstace = axios.create({
  baseURL: `https://chartjs-dashboard-api.herokuapp.com/books`,
})

export const getAllBooksLanguages = () => {
  return booksInstace.get('/languages')
    .then(result => {
      return result.data
    })
}

export const getAllBooksSortRating = () => {
  return booksInstace.get('/sort-rating')
    .then(result => {
      console.log(result.data);
      return result.data
    })
}

export const getAllBooksRatingOverTime = () => {
  return booksInstace.get('/rating-over-time')
    .then(result => {
      console.log(result.data);
      return result.data
    })
}

export const getAllReadBooks = () => {
  return booksInstace.get('/read-books')
    .then(result => {
      return result.data
    })
    .catch(error => {
      console.log(error);
    });
}

export const getAllRecentReviews = () => {
  return booksInstace.get('/all-reviews');
}