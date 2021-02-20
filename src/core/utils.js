const scientificToDecimal = require('scientific-to-decimal');

module.exports = {
  convertTonToNano: (value) => {
    return parseFloat(value) * 1_000_000_000;
  },
  convertNanoToTon: (value) => {
    if (value) {
      const num = parseInt(value, 16);
      return scientificToDecimal(num / 1_000_000_000).toString();
    } else {
      return 0;
    }
  },
  formatAddress: (txId, left = 20, right = 50) => {
    const full = txId;
    const short = txId.slice(0, left) + '...' + txId.slice(right);

    return { short, full };
  },
  formatValue: (value) => {
    const num = parseFloat(value);
    const fixedValue = scientificToDecimal(parseFloat(num));
    if (fixedValue.includes('.')) {
      const dec = fixedValue.split('.')[0];
      const rem = fixedValue.split('.')[1];
      return (
        dec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
        '.' +
        rem.toString()
      );
    } else {
      return fixedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  },
  formatDate: (unixDate) => {
    const date = new Date(unixDate * 1000);
    const dateString =
      ('0' + date.getDate()).slice(-2) +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      date.getFullYear();

    const timeString =
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2);
    const secondsString =
      date.getSeconds().toString().length === 1
        ? '0' + date.getSeconds()
        : date.getSeconds();

    return { dateString, timeString, secondsString, unixDate };
  },
};
