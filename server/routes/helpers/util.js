const moment = require('moment');

function getYear(item) {
  const item_date = moment(item.publication_date, 'MM/DD/YYYY');
  if (item_date.isValid()) {
    return item_date.format('YYYY');
  }

  return;
}

module.exports = {
  getYear
}
