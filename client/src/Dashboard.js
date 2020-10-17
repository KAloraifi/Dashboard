import { CircularProgress, Divider, Grid, List, ListItem, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { Bar, HorizontalBar, Line, Radar } from 'react-chartjs-2';
import Emoji from './components/NavigationBar/Emoji';
import { getAllBooksLanguages, getAllBooksRatingOverTime, getAllBooksSortRating, getAllRecentReviews } from './services/books';
import { getAllPokemons } from './services/pokemons';


function random_rgba(index) {
  const colors = [
    {
      main: 'rgba(179, 181, 198, 0.2)',
      secondary: 'rgba(179, 181, 198, 1)'
    },
    {
      main: 'rgba(255, 99, 132, 0.2)',
      secondary: 'rgba(255, 99, 132, 1)'
    },
    {
      main: 'rgba(191, 191, 63, 0.2)',
      secondary: 'rgba(191, 191, 63, 1)'
    },
    {
      main: 'rgba(191, 127, 63, 0.2)',
      secondary: 'rgba(191, 127, 63, 1)'
    }
  ]

  return colors[index];
}

export default function Dashboard() {
  /* Initialize different local states to store data */
  const [pokemons, setPokemons] = useState({});
  const [books, setBooks] = useState({});
  const [booksRating, setBooksRating] = useState({});
  const [booksRatingOverTime, setBooksRatingOverTime] = useState({});
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    /* Call /pokemons endpoint */
    getAllPokemons()
      .then(response => {
        const pokemons = response.data;
        const datasets = []
        let color = random_rgba();
        pokemons.forEach((pokemon, index) => {
          color = random_rgba(index);

          const dataset = {
            label: pokemon.Name,
            backgroundColor: color.main,
            borderColor: color.secondary,
            pointBackgroundColor: color.secondary,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color.secondary,
            data: [pokemon.Attack, pokemon.Defense, pokemon.Sp[' Atk'], pokemon.Sp[' Def'], pokemon.Speed]
          }

          datasets.push(dataset)
        });

        const parsedPokemons = {
          labels: ['Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
          datasets: datasets
        }
        setPokemons(parsedPokemons);
      })

    /* Call /books/sort-rating endpoint */
    getAllBooksSortRating()
      .then(response => {
        const books = response.data;

        const parsedBooks = {
          labels: books.map(book => book.title),
          datasets: [
            {
              label: 'Number of Ratings',
              data: books.map(book => Number(book.ratings_count)),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Rating',
              data: books.map(book => Number(book.average_rating)),
              backgroundColor: 'rgba(191, 127, 63, 0.4)',
              borderColor: 'rgba(191, 127, 63, 1)',
              borderWidth: 1
            }
          ]
        }
        setBooksRating(parsedBooks);
      })

    /* Call /books/rating-over-time endpoint */
    getAllBooksRatingOverTime()
      .then(response => {
        const parsedBooks = {
          labels: Object.keys(response.data),
          datasets: [
            {
              label: 'Average Rating',
              data: Object.values(response.data),
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        }
        setBooksRatingOverTime(parsedBooks);
      })

    /* Call /books/ endpoint */
    getAllBooksLanguages()
      .then(response => {
        const books = response.data;
        const labels = ['eng', 'spa', 'en-US', 'en-GB', 'ger']

        const parsedBooks = {
          labels: labels,
          datasets: [
            {
              label: 'Average Rating',
              data: books.map(book => book.average_rating),
              backgroundColor: 'rgba(191, 191, 63, 0.4)',
              borderColor: 'rgba(191, 191, 63, 1)',
              borderWidth: 1
            }
          ]
        }
        setBooks(parsedBooks);
      })

    getAllRecentReviews()
      .then(response => {
        const reviews = response.data.result.GoodreadsResponse.reviews[0].review;
        setRecentReviews(reviews);
      })
  }, []);

  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Pokemon Data
          </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper>
          <Typography variant='h6'>
            Top Pokemons Comparison
          </Typography>
          <Radar data={pokemons} options={{
            responsive: true,
          }} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">
          Goodreads Data
          </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant='h5'>
            Recent Reviews
          </Typography>
          {recentReviews.length === 0 ?
            <CircularProgress style={{ display: 'felx', justifyContent: 'center' }} />
            :
            <Paper style={{ maxHeight: 420, overflow: 'auto' }}>
              <List>
                {recentReviews.map(review =>
                  <>
                    <ListItem>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            User: {review.user[0].display_name[0]}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            Book: {review.book[0].title[0]}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            Rating: {review.rating[0]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </>
                )}
              </List>
            </Paper>
          }
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant='h6'>
            Average Ratings of Books Across Different Languages
          </Typography>
          <HorizontalBar data={books} options={{
            responsive: true,
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ],
            }
          }} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper>
          <Typography variant='h6'>
            Top 10 Books with the Most Number of Ratings and Highest Rating
          </Typography>
          <Paper>
            <Bar data={booksRating} options={{
              responsive: true,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: false
                    }
                  }
                ]
              }
            }} />
          </Paper>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper>
          <Typography variant='h6'>
            Average Ratings of Books Over Time
          </Typography>
          <Paper>
            <Line data={booksRatingOverTime} options={{
              responsive: true,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: false
                    }
                  }
                ]
              }
            }} />
          </Paper>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography>
          Made with <Emoji symbol="❤️" /> by Khaled
        </Typography>
      </Grid>
    </Grid>
  )
}