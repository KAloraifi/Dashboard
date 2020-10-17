var express = require('express');
var router = express.Router();
var _ = require('lodash');
const csv = require('csvtojson');


const pokemonFilePath = './Pokemon.csv';

/* Get pokemon stats. (Using csv file) */
router.get('/', function (req, res, next) {
  csv()
    .fromFile(pokemonFilePath)
    .then(pokemons => {
      const formattedPokemons = _.chain(pokemons)
        .orderBy(['Total'], ['desc'])
        .sampleSize(4);

      return res.json({ data: formattedPokemons })
    })
});

module.exports = router;
