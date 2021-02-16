const fs = require('fs');

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8')),
    
    setProducts: (data) => {
      fs.writeFileSync(`${__dirname}/products.json`, JSON.stringify(data, null, 2), 'utf-8');
    },
  }