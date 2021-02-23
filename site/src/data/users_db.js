const fs = require('fs');

module.exports = {
    getUsers: JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8')),
    
    setUsers: (data) => {
      fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(data, null, 2), 'utf-8');
    },
  }