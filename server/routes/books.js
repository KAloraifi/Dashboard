var express = require('express');
var router = express.Router();
var axios = require('axios');
var xml2js = require('xml2js');
var _ = require('lodash');
const csv = require('csvtojson');


const booksFilePath = './books.csv';

// const { KEY, SECRET, USER_ID, VERSION, PER_PAGE } = require('../utils/config');
const { getYear } = require('./helpers/util');

const booksInstace = axios.create({
  baseURL: `https://www.goodreads.com`,
})

/* Get All books grouped by languages. (Using csv file) */
router.get('/languages', function (req, res, next) {
  csv()
    .fromFile(booksFilePath)
    .then(books => {
      return res.json({ data: books})
    })
});

/* Get All books sorted by highest rating */
router.get('/sort-rating', function (req, res, next) {
  csv()
    .fromFile(booksFilePath)
    .then(books => {

      const formattedBooks = _.chain(books)
        .each(book => _.update(book, 'ratings_count', _.parseInt))
        .orderBy(['ratings_count', 'average_rating'], ['desc', 'desc']);
      return res.json({ data: formattedBooks.slice(0, 10) })
    })
});

/* Get Average Rating of Books Overtime */
router.get('/rating-over-time', function (req, res, next) {
  csv()
    .fromFile(booksFilePath)
    .then(books => {
      const formattedBooks = _.chain(books)
        .filter(book => Number(book.average_rating) && getYear(book))
        .groupBy(book => getYear(book))
        .map((books, year) => [year, _.round(_.meanBy(books, book => Number(book.average_rating)), 2)])
        .fromPairs()
        .value()


      return res.json({ data: formattedBooks })
    })
});

/* GET All read books. */
// router.get('/read-books', function (req, res, next) {
//   console.log(USER_ID, KEY);

//   return booksInstace.get('/review/list', {
//     params: {
//       id: process.env.USER_ID,
//       key: KEY,
//       v: VERSION,
//       shelf: 'read',
//     }
//   })
//     .then(response => {
//       return xml2js.parseStringPromise(response)
//         .then(function (result) {
//           return res.json({ result })
//         })
//         .catch(function (error) {
//           console.log(error);
//           return 'Failed to parse response.'
//         })
//     })
//     .catch(error => {
//       console.log(error.response);
//       throw new Error();
//     })
// });

/* GET All reviews from all members books. */
// router.get('/all-reviews', function (req, res, next) {
//   console.log(USER_ID, KEY);

//   return booksInstace.get('/review/recent_reviews', {
//     params: {
//       key: KEY,
//     }
//   })
//     .then(response => {

//       return xml2js.parseStringPromise(response.data)
//         .then(function (result) {
//           console.log(result);
//           return res.json({ result })
//         })
//         .catch(function (error) {
//           console.log(error);
//           return 'Failed to parse response.'
//         })
//     })
//     .catch(error => {
//       console.log(error.response);
//       throw new Error();
//     })
// });

module.exports = router;
